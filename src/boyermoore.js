export function boyermooreMatch(text, pattern) {
    let match = true;
    if (bmMatch(text,pattern) === -1) {
        match = false;
    }
    return match;
}

function bmMatch(text, pattern) {
    let last = buildLast(pattern);
    let n = text.length
    let m = pattern.length
    let i = m - 1;
    if (i > n - 1) {
        return -1; // tidak ada kesamaan jika pattern lebih panjang dari text
    }
    let j = m -1;
    do {
        if (pattern[j] === text[i]) {
            if (j === 0) {
                return i; // sama
            } else {
                i --;
                j --;
            }
        } else {
            let lo = last[i];
            i = i + m - Math.min(j, 1 + lo);
            j = m - 1;
        }
    } while (i <= n-1);
    return -1; // no match
}

function buildLast(pattern) {
    let last = [];
    return 0;
}

// belum selesai