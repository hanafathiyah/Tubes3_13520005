import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import axios from 'axios'

async function submit(namapenyakit, filedna) {
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
function Tambah() {
    const [namapenyakit, setnamapenyakit] = useState("");
    const [filedna, setfiledna] = useState(null);
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <h1>Tambahkan Penyakit</h1>
            <TextField id="outlined-basic" label="Nama Penyakit" variant="outlined" value={namapenyakit} onInput = {(e) => setnamapenyakit(e.target.value)} margin="normal"/>
            <br></br>
            <Button
                startIcon={<UploadIcon />}
                variant="contained"
                component="label"
                margin="normal"
                >
                {!filedna?"Upload File":filedna.name}
                <input
                    onChange={(e) => setfiledna(e.target.files[0])}
                    type="file"
                    accept=".txt"
                    hidden
                />
            </Button> <br></br>
            <Button variant="contained" color="primary" onClick={()=>submit(namapenyakit,filedna)} margin="normal">
                Submit
            </Button>
        </div>
    )
}

export default Tambah;