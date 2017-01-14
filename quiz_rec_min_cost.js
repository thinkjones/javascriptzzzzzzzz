'use strict';

/**
 *
 * Given array on n integers, pluck two elements from array at positions i and j.
 * The cost of the operation is n(i) + n(j) = n(c)
 * Insert n(c) into the array.
 * Array has now decreased in length by 1
 *
 * Write a function that takes an an array n and returns the smallest TOTAL cost of the operations in order to reduce
 * the array down to length 1.
 */

function reductionCost(num) {
    return _reductionCost(num, true);
}

function _reductionCost(num, sort_all) {

    if (num.length <= 1) {
        return num[0];
    }

    // Step 1
    var sorted_num = num;
    if (sort_all === true) {
        sorted_num = num.sort();
    } else {
        // Performance Tweak - only need to sort last element.
        sorted_num = _bubbleSortLastElement(num);
    }

    // Step 2
    var summed_value = sorted_num[0] + sorted_num[1];
    console.log(sorted_num.join(',') + ':' + num[0] + ' ' + num[1] + ' ' + summed_value);
    sorted_num.push(summed_value);
    return _reductionCost(sorted_num.slice(2), false);
}

function _bubbleSortLastElement(num) {
    var value_to_sort = num[num.length -1];
    var new_index = 0;
    for (var i = 0 ;  i <= num.length - 1; i++) {
        if (value_to_sort > num[i]) {
            new_index = i + 1;
        } else {
            break;
        }
    }
    // Insert item into correct position
    return num.slice(0, new_index).concat([value_to_sort]).concat(num.slice(new_index, num.length - 1));
}

var num = [4,3,2,1];
console.log(reductionCost(num));

var num = [1,1,1,1];
console.log(reductionCost(num));
