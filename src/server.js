import express, { json, urlencoded } from "express";
import cors from "cors";
import db from './app/models/index.js';

const app = express();

let corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use(json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DNA Checker Application" });
});

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});