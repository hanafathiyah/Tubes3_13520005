// main.js

import { createRequire } from 'module';
import { kmpMatch } from './lib/kmp.js';
import { boyermooreMatch } from './lib/boyermoore.js';

const require = createRequire(import.meta.url);

function levenshtein(stra, strb) {
    let length_a = stra.length;
    let length_b = strb.length;

    let tail_a = stra.slice(1, length_a);
    let tail_b = strb.slice(1, length_b);

    if (length_b == 0) {
        return length_a;
    }
    else if (length_a == 0) {
        return length_b;
    }
    else if (stra[0] == strb[0]) {
        return levenshtein(tail_a, tail_b);
    }
    else {
        return 1 + Math.min(levenshtein(tail_a, strb), levenshtein(stra, tail_b), levenshtein(tail_a, tail_b));
    }
}

function predict(name, dna_sequence, disease, method_string_match) {
    let select_query = "SELECT rantai FROM penyakit WHERE nama_penyakit = \'" + disease + "\'";
    let insert_query = "INSERT INTO prediksi (tanggal, nama_pasien, penyakit, status) VALUES (\'";
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    insert_query += year + "-" + month + "-" + day + "\',\'";
    insert_query += name + "\',\'";
    insert_query += disease + "\',\'";
    let pattern;
    let res;

    con.query(select_query, function(err, result) {
        if (err) throw err;
        pattern = result[0].rantai;
        if (method_string_match === "kmp") {
            if (kmpMatch(dna_sequence, pattern)) {
                res = "True";
            }
            else {
                res = "False";
            }
        }
        if (method_string_match === "boyermoore") {
            if (boyermooreMatch(dna_sequence, pattern)) {
                res = "True";
            }
            else {
                res = "False";
            }
        }
        insert_query += res + "\')";
        con.query(insert_query, function(err) {
            if (err) throw err;
            console.log(year + "-" + month + "-" + day + " - " + name + " - " + disease + " - " + res);
        });
    });
}   

function add_disease(name, sequence) {
    const invalid_seq_pattern = new RegExp('[^(AGCT)]+');
    let insert_query = "INSERT INTO penyakit (nama_penyakit, rantai) VALUES (\'";
    if (invalid_seq_pattern.test(sequence)) {
        console.log("invalid sequence");
    }
    else {
        insert_query += name + "\',\'" + sequence + "\')";
        con.query(insert_query, function(err) {
            if (err) throw err;
            console.log("new disease added");
        });
    }
}

function search(input) {
    const valid_pattern1 = /\d\d?\s([Jj]anuari|[Ff]ebruari|[Mm]aret|[Aa]pril|[Mm]ei|[Jj]uni|[Jj]uli|[Aa]gustus|[Ss]eptember|[Oo]ktober|[Nn]ovember|[Dd]esember)\s\d{4}(\s[a-zA-Z1-9-]+)?/g;
    const valid_pattern2 = /(3[0-1]|[0-2]?[1-9])-(1[0-2]|0?[1-9])-(\d{4})(\s[a-zA-Z1-9-]+)?/g; // DD-MM-YYYY
    const valid_pattern3 = /(3[0-1]|[0-2]?[1-9])\/(1[0-2]|0?[1-9])\/(\d{4})(\s[a-zA-Z1-9-]+)?/g; // DD/MM/YYYY
    const valid_pattern4 = /\d{4}-(1[0-2]|0?[1-9])-(3[0-1]|[0-2]?[1-9])(\s[a-zA-Z1-9-]+)?/g; // YYYY-MM-DD
    const valid_string_only_pattern = /^[a-zA-Z1-9-]+$/g

    let year, month, day, disease;
    let search_query = "SELECT * FROM prediksi WHERE ";
    let valid = true;

    if (valid_pattern1.test(input)) {
        search_query += "tanggal = ";
        const clean = input.match(valid_pattern1)[0];
        const arr = clean.split(" ");
        day = arr[0];
        if (arr[1] == "Januari" || arr[1] == "januari") {
            month = '1';
        }
        else if (arr[1] == "Februari" || arr[1] == "februari") {
            month = '2';
        }
        else if (arr[1] == "Maret" || arr[1] == "maret") {
            month = '3';
        }
        else if (arr[1] == "April" || arr[1] == "april") {
            month = '4';
        }
        else if (arr[1] == "Mei" || arr[1] == "mei") {
            month = '5';
        }
        else if (arr[1] == "Juni" || arr[1] == "juni") {
            month = '6';
        }
        else if (arr[1] == "Juli" || arr[1] == "juli") {
            month = '7';
        }
        else if (arr[1] == "Agustus" || arr[1] == "agustus") {
            month = '8';
        }
        else if (arr[1] == "September" || arr[1] == "september") {
            month = '9';
        }
        else if (arr[1] == "Oktober" || arr[1] == "oktober") {
            month = '10';
        }
        else if (arr[1] == "November" || arr[1] == "november") {
            month = '11';
        }
        else {
            month = '12';
        }
        year = arr[2];
        search_query += '\'' + year + '-' + month + '-' + day + '\'';
        if (arr.length > 3) {
            // ada nama penyakit
            disease = arr[3];
            search_query += " AND penyakit = \'" + disease + '\'';
        }
    }
    else if (valid_pattern2.test(input)) {
        search_query += 'tanggal = ';
        const arr = input.split(" ");
        const arr2 = arr[0].split('-');
        day = arr2[0];
        month = arr2[1];
        year = arr2[2];
        search_query += '\'' + year + '-' + month + '-' + day + '\'';
        if (arr.length > 1) {
            // ada disease
            disease = arr[1];
            search_query += " AND penyakit = \'" + disease + '\'';
        }
    }
    else if (valid_pattern3.test(input)) {
        search_query += "tanggal = ";
        const arr = input.split(" ");
        const arr2 = arr[0].split('/');
        day = arr2[0];
        month = arr2[1];
        year = arr2[2];
        search_query += '\'' + year + '-' + month + '-' + day + '\'';
        if (arr.length > 1) {
            // ada disease
            disease = arr[1];
            search_query += " AND penyakit = \'" + disease + '\'';
        }
    }
    else if (valid_pattern4.test(input)) {
        search_query += "tanggal = ";
        const arr = input.split(" ");
        const arr2 = arr[0].split('-');
        day = arr2[2];
        month = arr2[1];
        year = arr2[0];
        search_query += '\'' + year + '-' + month + '-' + day + '\'';
        if (arr.length > 1) {
            // ada disease
            disease = arr[1];
            search_query += " AND penyakit = \'" + disease + '\'';
        }
    }
    else if (valid_string_only_pattern.test(input)) {
        disease = input;
        search_query += "penyakit = \'" + disease + '\'';
    }
    else {
        valid = false;
        console.log("Format invalid");
    }
    if (valid) {
        con.query(search_query, function(err, result) {
            if (err) throw err;
            console.log(result);
        });
    }
}

let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    database : "tubes3stima",
    user: "root",
    password: "" // ganti password di sini
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //predict("Aleksey Romanov", "GTACAGTTCATAGGGTCAAGTGTACA", "hemophilia", "boyermoore");
}); 

const test = 'hemophilia';
search(test);