// main.js

function levenshtein(stra, strb) {
    var length_a = stra.length;
    var length_b = strb.length;

    var tail_a = stra.slice(1, length_a);
    var tail_b = strb.slice(1, length_b);

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

// untuk sementara taro sini dulu fungsi border sama kmp, soalnya belum tau cara import di js
function border(text) {
    const b = []; // array of sizes of the same prefix and suffix
    b[0] = 0;
    var j; // mismatch position
    var k; // position before mismatch
    for (j = 2; j < text.length; j++) {
        k = j - 1;
        
        var suffix = "";
        var size = 0;
        var match = true;
        var n = 1;

        while (match && n <= k) {
            var prefix = "";
            var suffix = "";
            var i = 0;
            //console.log(k, n)
            while (i < n) {
                prefix += text[i];
                i++;
            }
            //console.log("prefix :", prefix);
            i = k - n + 1;
            while (i <= k) {
                suffix += text[i];
                i++;
            }
            //console.log("suffix :", suffix);
            if (prefix == suffix && n > size) {
                size = n;
                match = true;
            }
            else {
                n++;
            }
        }
        b[k] = size;
    }
    return b;
}

function kmpMatch(text, pattern) {
    var match = false;
    var t_length = text.length;
    var p_length = pattern.length;

    var fail = border(pattern);

    var i = 0; // iterator for text
    var j = 0; // iterator for pattern

    while (!match && i < t_length) {
        if (text[i] == pattern[j]) {
            if (j == p_length - 1) {
                match = true;
            }
            else {
                i++;
                j++;
            }
        }
        else {
            if (j == 0) {
                i++;
                j = 0;
            }
            else {
                j = fail[j-1];
            }
        }
    }
    return match;
}

function predict(name, dna_sequence, disease) {
    var select_query = "SELECT rantai FROM penyakit WHERE nama_penyakit = \'" + disease + "\'";
    var insert_query = "INSERT INTO prediksi (tanggal, nama_pasien, penyakit, status) VALUES (\'";
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    insert_query += year + "-" + month + "-" + day + "\',\'";
    insert_query += name + "\',\'";
    insert_query += disease + "\',\'";
    var pattern;
    var res;

    con.query(select_query, function(err, result) {
        if (err) throw err;
        pattern = result[0].rantai;
        if (kmpMatch(dna_sequence, pattern)) {
            res = "True";
        }
        else {
            res = "False";
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
    var insert_query = "INSERT INTO penyakit (nama_penyakit, rantai) VALUES (\'";
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

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  database : "tubes3stima",
  user: "root",
  password: "root" // ganti password di sini
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  predict("Aleksey Romanov", "GTACAGTTCATAGCGTCAAGTGTACA", "hemophilia");
  
});