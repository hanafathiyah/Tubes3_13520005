import express, { json, urlencoded } from "express";
import fileUpload from "express-fileupload";
import { createPenyakit } from "./controller/penyakit.controller.js";
const app = express();

app.use(json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
app.use(fileUpload({}))
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DNA Checker Application" });
});

app.post("/penyakit", createPenyakit)
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
