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