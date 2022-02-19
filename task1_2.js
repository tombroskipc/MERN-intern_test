function decodeString(str) {
    if (str.length === 0 || str.length === 1)
        return str;
    let arr = str.split('');
    let result = '';
    let count = 1;
    let currentChar = arr[0];
    for (let i = 0; i < arr.length; i++) {
        currentChar = arr[i];
        // console.log(`i: ${i}, currentChar: ${currentChar}, count: ${count}`);
        if (arr[i] == arr[i+1]){
            count++;
        }
        else {
            let pushData = ((count == 1) ? '' : count.toString()) + currentChar;
            // console.log(`pushData: ${pushData}`);
            result += pushData;
            count = 1;
        }
    }
    return result;
}

console.log(decodeString('AABBBCCCCCAADDDD') === '2A3B5C2A4D' );
console.log(decodeString('PPPQRRRSTTQQS') === '3PQ3RS2T2QS');
console.log(decodeString('XYZ') === 'XYZ');