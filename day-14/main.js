const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

rows.forEach((row) => {
  console.log(row);
});

console.log(`Puzzle 1: ${1}`);
console.log(`Puzzle 2: ${2}`);
