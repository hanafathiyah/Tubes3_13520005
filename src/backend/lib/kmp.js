export function border(text) {
    const b = []; // array of sizes of the same prefix and suffix
    b[0] = 0;
    let j; // mismatch position
    let k; // position before mismatch
    for (j = 2; j < text.length; j++) {
        k = j - 1;
        
        let suffix = "";
        let size = 0;
        let match = true;
        let n = 1;

        while (match && n <= k) {
            let prefix = "";
            let suffix = "";
            let i = 0;
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
            if (prefix === suffix && n > size) {
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

export function kmpMatch(text, pattern) {
    let match = false;
    let t_length = text.length;
    let p_length = pattern.length;

    let fail = border(pattern);

    let i = 0; // iterator for text
    let j = 0; // iterator for pattern

    while (!match && i < t_length) {
        if (text[i] === pattern[j]) {
            if (j === p_length - 1) {
                match = true;
            }
            else {
                i++;
                j++;
            }
        }
        else {
            if (j === 0) {
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