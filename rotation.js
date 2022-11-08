/***
 * Write a program that takes as input an array of numbers of length N and a number p (positions - p is greater than 0
and less than N) and a number d (direction - either 0 for left or 1 for right). The objective is to return the array
shifted by p positions in d direction.
Example: For an input array [1, 3, 2, 7, 4, 6] with p=3 and d=0
the expected result would be [7, 4, 6, 1, 3, 2] with the array shifted left by 3 positions
 */

/**Getting input from user */

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getinputNumbers = ()=>{
    return new Promise(function(resolve,reject){
        readline.question("Numbers ", (input) => {
            resolve(input)
        });

    })
}
const getinputPosition = () => {
  return new Promise(function (resolve, reject) {
    readline.question("Position ", (Position) => {
      resolve(Position);
    });
  });
};
const getinputRotation = () => {
  return new Promise(function (resolve, reject) {
    readline.question("Rotation ", (Rotation) => {
      resolve(Rotation);
      readline.close()
    });
  });
};

/**Time Complexity
 * O(n) to iterate all the elements in the array and find the correct place
 * Space Complexity O(n)
 */

function rotateArr(numbers,p,d) {
    d = parseInt(d);
    p = parseInt(p);
  if(p > 0 && p < numbers.length){
      let rotated_arr = Array(numbers.length).fill(0);
     console.log(rotated_arr);
      numbers.forEach((value, index) => {
        let jump;
        if (d == 0) {
          /**subtract */
          jump = index - p;
          jump = jump >= 0 ? jump : numbers.length - -jump;
        } else {
          /**Add */
          jump = index + p;
          jump = jump < numbers.length ? jump : jump - (numbers.length - 1) - 1;
        }
        rotated_arr[jump] = value;
        console.log(rotated_arr, jump,"jump",value,"value");
      });
       console.log(rotated_arr, "rotated_arr");
  }
  else{
        console.log("invalid input");
  }

 
}

let arr_numbers;
let p ;
let d ;
(function () {
  getinputNumbers().then((res) => {
     arr_numbers= res.split(",");
     console.log("res", res,arr_numbers)
     getinputPosition().then(res=>{
        p = res;
        getinputRotation().then(res=>{
            d = res;
            rotateArr(arr_numbers, p, d);

        })
     })
  });
})();

/**Test Cases 
rotateArr([1, 3, 2, 7, 4, 6],5,0)
rotateArr([1, 3, 2, 7, 4, 6], 5, 1);
rotateArr([1, 4, 6], 2, 0);
rotateArr([1, 3], 1, 0);
rotateArr([1], 1, 0);
*/
