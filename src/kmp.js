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
    var count = 0;

    while (!match && i < t_length) {
        count++;
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
    return count;
}