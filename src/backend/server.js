import express, { json, urlencoded } from "express";
import fileUpload from "express-fileupload";
import { createPenyakit, deletePenyakit, readPenyakit } from "./controller/penyakit.controller.js";
import { createPrediksi, deletePrediksi, readPrediksi } from "./controller/prediksi.controller.js";
import cors from 'cors';
const app = express();

app.use(cors());
app.use(json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
app.use(fileUpload({}))
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DNA Checker Application" });
});
app.get("/penyakit", readPenyakit)
app.get("/prediksi", readPrediksi)
app.post("/penyakit", createPenyakit)
app.post("/prediksi", createPrediksi)
app.delete("/penyakit/:id", deletePenyakit)
app.delete("/prediksi/:id", deletePrediksi)
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
