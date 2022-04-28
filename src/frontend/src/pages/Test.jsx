import React from "react";
import { TextField, Button } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';

function SubmitTest() {
    alert("Test DNA telah dikirim!");
}

function Test() {
    return (
        <div>
            <h1>Tes DNA</h1>
            <TextField id="outlined-basic" label="Nama Pengguna" variant="outlined" />
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
            </Button>
            <TextField id="outlined-basic" label="Prediksi Penyakit" variant="outlined" /> <br></br>
            <Button variant="contained" color="primary" onClick={SubmitTest}>
                Submit
            </Button>
        </div>
    )
}

export default Test;