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
