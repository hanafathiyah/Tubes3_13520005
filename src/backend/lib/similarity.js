import { buildLast } from "./boyermoore.js";
import { border } from "./kmp.js";

export function similarityBmMatch(text, pattern) {
    let last = buildLast(pattern);
    let n = text.length
    let m = pattern.length
    let i = m - 1;
    if (i > n - 1) {
        return -1; // tidak ada kesamaan jika pattern lebih panjang dari text
    }
    let j = m -1;
    let maxMatch = 0;
    do {
        if (pattern.charAt(j)=== text.charAt(i)) {
            if (j === 0) {
                return 1; // sama
            } else {
                i --;
                j --;
            }
        } else {
            let lo = last[text.charAt(i)];
            maxMatch = Math.max(maxMatch, (m - j)/m);
            i = i + m - Math.min(j, 1 + lo);
            j = m - 1;
        }
    } while (i <= n-1);
    return maxMatch; // no match
}

export function similarityKmpMatch(text, pattern) {
    let match = false;
    let t_length = text.length;
    let p_length = pattern.length;

    let fail = border(pattern);

    let i = 0; // iterator for text
    let j = 0; // iterator for pattern

    let maxMatch = 0;
    while (!match && i < t_length) {
        if (text[i]===pattern[j]) {
            if (j===p_length - 1) {
                match = true;
                return 1;
            }
            else {
                i++;
                j++;
            }
        }
        else {
            maxMatch = Math.max(maxMatch, j/p_length);
            if (j===0) {
                i++;
                j = 0;
            }
            else {
                j = fail[j-1];
            }
        }
    }
    return maxMatch;
}

export function levenshtein(stra, strb) {
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