function isAddUp(arr, num) {
    let result = false;
    for (let i = 0; i < arr.length; i++) {
        for (let x = i + 1; x < arr.length; x++) {
            if (arr[i] + arr[x] === num) {
                result = true;
                break;
            }
        }
    }
    return result;
}

console.log(isAddUp([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 15));
console.log(isAddUp([10, 15, 3, 7], 16));
console.log(isAddUp([10, 15, 3, 7], 17));
console.log(isAddUp([2, 3], 5));