import React from "react";
import { TextField, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Cari() {
    return (
        <div>
            <h1>Cari Penyakit</h1>
            <TextField id="outlined-basic" label="Masukkan Query" variant="outlined" />
            <Button variant="contained" startIcon={<SearchIcon />} color="primary">
                Cari
            </Button>
        </div>
    )
}

export default Cari;