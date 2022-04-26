// main.js

import { createRequire } from 'module';
import { kmpMatch } from './kmp.js';
import { boyermooreMatch } from './boyermoore.js';

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
    predict("Aleksey Romanov", "GTACAGTTCATAGCGTCAAGTGTACA", "hemophilia", "kmp");
});