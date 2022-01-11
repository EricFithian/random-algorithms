// Max Sum Path
// You are given two sorted lists, with distinct elements. Find the maximum path sum while traversing through the lists.

// Points to consider for a valid path:

// - A path can start from either list, and can finish in either list.
// - If there is an element which is present in both lists (regardless of its index in the lists), you can choose to change your path to the other list.

// Return only the maximum path sum.

// Examples
// [0, 2, 3, 7, 10, 12]
//    [1, 5, 7, 8]

// Both lists having only 7 as common element, the possible paths would be:

// 0->2->3->7->10->12 => 34
// 0->2->3->7->8      => 20
// 1->5->7->8         => 21
// 1->5->7->10->12    => 35 (maximum path)

// Hence, the output will be 35 in the example above.
// Constraints
// The arrays may contain no common terms.
// The common element should only be counted once.
// Range of possible inputs: 0 <=len(l1), len(l2) <= 125000


//join the two sorted lists. are they sorted?
//then, for loop to find duplicate elements
//go back to given lists, locate the duplicate indexes

let listOne = [0, 2, 3, 7, 10, 12];
let listTwo = [1, 5, 7, 8];

function mergeTwoLists(list1, list2) {
    let list = [];
    let sum = 0;
    if (!list1.length && !list2.length) {
        return sum;
    } else if (!list1.length) {
        list2.forEach(item => {
            sum += item;
        })
    } else if (!list2.length) {
        list1.forEach(item => {
            sum += item;
        })
    }

    let overlapping = [];
    for(let i = 0; i < list1.length; i++) {
        for(let j = 0; j < list2.length; j++) {
            if(list2[j] === list1[i]) overlapping.push([i, j]);
        }
    }
    let newSum = 0
    if(overlapping.length === 0) {
        for(let i = 0; i < list1.length; i++) {
            sum += list1[i]
        }
        for(let i = 0; i < list2.length; i++) {
            newSum += list2[i]
        }
        if(newSum > sum) return newSum;
        else return sum;
    }

    for(let i = 0; i < overlapping.length; i++) {
        list1.forEach(index => {
            sum += index;
        })
        list2.forEach(index => {
            newSum += index;
        })
        if(newSum > sum) sum = newSum;
        newSum = 0;
        for(let j = 0; j < list1.length; j++) {
            if(j === i[0]) {
                for(let k = 0; k < list2.length; k++) {
                    if(list2[k] >= list1[j]) newSum += list2[k];
                    if(k + 1 === list2.length) {
                        if(newSum > sum) sum = newSum;
                        newSum = 0;
                    }
                }
            } else newSum += list1[j];
        }
        newSum = 0;
        for(let j = 0; j < list2.length; j++) {
            if(j === i[0]) {
                for(let k = 0; k < list2.length; k++) {
                    if(list1[k] >= list2[j]) newSum += list1[k];
                    if(k + 1 === list1.length) {
                        if(newSum > sum) sum = newSum;
                        newSum = 0;
                    }
                }
            } else newSum += list2[j];
        }
    }
    return sum;

};


console.log(mergeTwoLists(listOne, listTwo));
