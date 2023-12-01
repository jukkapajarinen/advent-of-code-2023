const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

const getCalibrationValue = (str) => {
  const nums = str.replace(/[^0-9]/g, "");
  const first = nums.length > 0 ? nums.charAt(0) : 0;
  const last = nums.length > 1 ? nums.charAt(nums.length - 1) : first;
  return Number(`${first}${last}`);
};

const fixFirstAndLast = (str) => {
  // Loop the str and generate newStr piece by piece
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    // Firstly loop the digits
    for (const n of ["1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
      if (str.charAt(i) === n) {
        newStr += n;
      }
    }

    const written = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    // Secondly loop the written numbers
    for (let w = 0; w < written.length; w++) {
      if (str.substr(i, written[w].length) === written[w]) {
        newStr += `${w + 1}`;
      }
    }
  }
  return newStr;
};

let [puzzle1, puzzle2] = [0, 0];
rows.forEach((row, idx) => {
  puzzle1 += getCalibrationValue(row);
  const fixed = fixFirstAndLast(row);
  puzzle2 += getCalibrationValue(fixed);
});

console.log(`Puzzle 1: ${puzzle1}`);
console.log(`Puzzle 2: ${puzzle2}`);
