import React, { useEffect, useState } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import axios from 'axios'

async function submit(namapenyakit, filedna) {
    const formdata = new FormData();
    formdata.append("dnafile", filedna);
    formdata.append("name", namapenyakit);
    try {
        await axios.post("https://dnachecker.herokuapp.com/penyakit", formdata);
        alert("Penyakit telah ditambahkan!");
    } catch (e) {
        alert("Gagal menambahkan data!");
    }
}

function Tambah() {
    const [namapenyakit, setnamapenyakit] = useState("");
    const [filedna, setfiledna] = useState(null);
    const [datapenyakit, setdatapenyakit] = useState([])
    async function fetchData() {
        const data = await axios.get("https://dnachecker.herokuapp.com/penyakit")
        setdatapenyakit(data.data.data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h1>Tambahkan Penyakit</h1>
            <TextField id="outlined-basic" label="Nama Penyakit" variant="outlined" value={namapenyakit} onInput={(e) => setnamapenyakit(e.target.value)} margin="normal" />
            <br></br>
            <Button
                startIcon={<UploadIcon />}
                variant="contained"
                component="label"
                margin="normal"
            >
                {!filedna ? "Upload File" : filedna.name}
                <input
                    onChange={(e) => setfiledna(e.target.files[0])}
                    type="file"
                    accept=".txt"
                    hidden
                />
            </Button> <br></br>
            <Button variant="contained" color="primary" onClick={() => submit(namapenyakit, filedna)} margin="normal">
                Submit
            </Button>
            <br></br>
            <div>
                <div>
                    <TableContainer component={Paper}>
                        <Table aria-label="Data Penyakit">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Nama Penyakit</TableCell>
                                    <TableCell>Rantai</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {datapenyakit.map((dp) => (
                                    <TableRow
                                        key={dp.id_prediksi}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{dp.id}</TableCell>
                                        <TableCell>{dp.nama_penyakit}</TableCell>
                                        <TableCell>{dp.rantai}</TableCell>
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

export default Tambah;