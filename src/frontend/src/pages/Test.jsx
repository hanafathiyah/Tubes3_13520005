import React, { useEffect, useState } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import axios from 'axios'

async function kmpcheck(namaorang, filedna,idpenyakitchoosen) {
    const formdata = new FormData();
    formdata.append("dnafile",filedna);
    formdata.append("nama_pasien",namaorang);
    formdata.append("algorithm","kmp");
    formdata.append("id_penyakit", idpenyakitchoosen);
    try {
        await axios.post("https://dnachecker.herokuapp.com/prediksi", formdata);
        alert("Prediksi telah ditambahkan!");
    } catch (e) {
        alert("Gagal menambahkan data!");
    }
}

async function boyermoorecheck(namaorang, filedna,idpenyakitchoosen) {
    const formdata = new FormData();
    formdata.append("dnafile",filedna);
    formdata.append("nama_pasien",namaorang);
    formdata.append("algorithm","boyermoore");
    formdata.append("id_penyakit", idpenyakitchoosen);
    try {
        await axios.post("https://dnachecker.herokuapp.com/prediksi", formdata);
        alert("Prediksi telah ditambahkan!");
    } catch (e) {
        alert("Gagal menambahkan data!");
    }
}


function Test() {
    const [namaorang, setnamaorang] = useState("");
    const [filedna, setfiledna] = useState(null);
    const [datapenyakit, setdatapenyakit] = useState([])
    const [idpenyakitchoosen, setidpenyakitchoosen] = useState()
    const [hasilpemeriksaan, sethasilpemeriksaan] = useState([])
    async function fetchData() {
        const data = await axios.get("https://dnachecker.herokuapp.com/penyakit")
        setdatapenyakit(data.data.data)

        const data2 = await axios.get("https://dnachecker.herokuapp.com/prediksi")
        sethasilpemeriksaan(data2.data.data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    //const [prediksipenyakit, setprediksi] = useState("");
    return (
        <div style={{display: "flex", flexDirection: "column", paddingTop:"100px"}}>
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
                    {datapenyakit.map((dp) => (
                    <MenuItem key={dp.id} value={dp.id}>{dp.id+" "+dp.nama_penyakit+" "+dp.rantai}</MenuItem>
                    ))}
                </Select>
            </FormControl> 
            <br></br>
            <Button variant="contained" color="primary" onClick={()=>kmpcheck(namaorang,filedna,idpenyakitchoosen)} margin="normal">
                Submit (use KMP checker)
            </Button>
            <br></br>
            <Button variant="contained" color="primary" onClick={()=>boyermoorecheck(namaorang,filedna,idpenyakitchoosen)} margin="normal">
                Submit (use Boyer-Moore checker)
            </Button>
            <br></br>
            <div>
                    <div>
                        <TableContainer component={Paper}>
                            <Table aria-label="Data Predikzi">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Timestamp</TableCell>
                                        <TableCell>Nama Pasien</TableCell>
                                        <TableCell>Prediksi Penyakit</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Similarity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {hasilpemeriksaan.map((hp) => (
                                    <TableRow
                                        key = {hp.id_prediksi}
                                        sx = {{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell>{hp.id_prediksi}</TableCell>
                                        <TableCell>{hp.timestamp}</TableCell>
                                        <TableCell>{hp.nama_pasien}</TableCell>
                                        <TableCell>{hp.penyakit.nama_penyakit}</TableCell>
                                        <TableCell>{hp.status}</TableCell>
                                        <TableCell>{hp.similarity}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                
            </div>
        </div>
    )
}

export default Test;