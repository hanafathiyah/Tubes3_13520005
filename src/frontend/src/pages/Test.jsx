import React, { useEffect, useState } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import axios from 'axios'

async function kmpcheck(namaorang, filedna) {
    const formdata = new FormData();
    formdata.append("dnafile",filedna);
    formdata.append("nama_pasien",namaorang);
    formdata.append("algorithm","kmp");
    try {
        await axios.post("http://localhost:8080/penyakit", formdata);
        alert("Penyakit telah ditambahkan!");
    } catch (e) {
        alert("Gagal menambahkan data!");
    }
}

async function boyermoorecheck(namaorang, filedna) {
    const formdata = new FormData();
    formdata.append("dnafile",filedna);
    formdata.append("name",namapenyakit);
    try {
        await axios.post("http://localhost:8080/penyakit", formdata);
        alert("Penyakit telah ditambahkan!");
    } catch (e) {
        alert("Gagal menambahkan data!");
    }
}


function Test() {
    const [namaorang, setnamaorang] = useState("");
    const [filedna, setfiledna] = useState(null);
    const [datapenyakit, setdatapenyakit] = useState([])
    const [idpenyakitchoosen, setidpenyakitchoosen] = useState()
    async function fetchData() {
        const data = await axios.get("http://localhost:8080/penyakit")
        setdatapenyakit(data.data.data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    //const [prediksipenyakit, setprediksi] = useState("");
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <h1>Tes DNA</h1>
            <TextField id="outlined-basic" label="Nama Pengguna" variant="outlined" value={namaorang} onInput = {(e) => setnamaorang(e.target.value)} margin="normal"/>
            <br></br>
            <Button
                startIcon={<UploadIcon />}
                variant="contained"
                component="label"
                >
                {!filedna?"Upload File":filedna.name}
                <input
                    onChange={(e) => setfiledna(e.target.files[0])}
                    type="file"
                    accept=".txt"
                    hidden
                />
            </Button>
            <br></br>
            <FormControl>
                <InputLabel>
                    Prediksi Penyakit
                </InputLabel>
                <Select
                    value={idpenyakitchoosen}
                    label="Prediksi Penyakit"
                    onChange={(e) => setidpenyakitchoosen(e.target.value)}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl> 
            <br></br>
            <Button variant="contained" color="primary" onClick={()=>kmpcheck(namaorang,filedna)} margin="normal">
                Submit (use KMP checker)
            </Button>
            <br></br>
            <Button variant="contained" color="primary" onClick={()=>boyermoorecheck(namaorang,filedna)} margin="normal">
                Submit (use Boyer-Moore checker)
            </Button>
        </div>
    )
}

export default Test;