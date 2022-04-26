import express from "express";
import { startApp } from './main.js';

// made an object of express
const app = express();
const port = 8080;

app.use(express.json())

// req = request
// rest = result


// get for make http method
app.get('/', (req, res) => {
    res.json({
        message: startApp()
    }); 
})

app.post('/test', (req, res) => {
    const data = req.body
    console.log(data)
    res.json({
        message: "hssssss",
        data: data
    }); 
})

app.post("/data/:hana", (req, res) => {
    const data = req.params

    res.json({
        id_aku: data.hana
    })
});

app.listen(port, () => {
    console.log(`example app ${port}`)
})
