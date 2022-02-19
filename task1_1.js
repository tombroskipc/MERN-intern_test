function sortingAlgo(arr) {
    if (arr.length === 0 || arr.length === 1)
        return arr;
    for (let i = 0; i < arr.length; i++) {
        for (let x = 0; x < arr.length - 1 - i; x++) {
            if ((arr[x].toLowerCase()).charCodeAt(0) > (arr[x + 1].toLowerCase()).charCodeAt(0))
                [arr[x], arr[x + 1]] = [arr[x + 1], arr[x]];
        }
    }
    return arr;
}

function arrangeString(str) {
    let arr = str.split('');
    arr = sortingAlgo(arr);
    str = arr.join('');
    return str.trim();
}


console.log(arrangeString('Hello 123world'));