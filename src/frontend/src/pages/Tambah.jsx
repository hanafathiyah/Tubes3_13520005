import React from "react";
import { TextField, Button } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';

function SubmitTambah() {
    alert("Penyakit telah ditambahkan!");
}

function Tambah() {
    return (
        <div>
            <h1>Tambahkan Penyakit</h1>
            <TextField id="outlined-basic" label="Nama Penyakit" variant="outlined" />
            <Button
                startIcon={<UploadIcon />}
                variant="contained"
                component="label"
                >
                Upload File
                <input
                    type="file"
                    accept=".txt"
                    hidden
                />
            </Button> <br></br>
            <Button variant="contained" color="primary" onClick={SubmitTambah}>
                Submit
            </Button>
        </div>
    )
}

export default Tambah;