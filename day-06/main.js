const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

const times = rows[0]
  .split(":")[1]
  .split(" ")
  .filter((x) => x !== "")
  .map((x) => Number(x));
const distances = rows[1]
  .split(":")[1]
  .split(" ")
  .filter((x) => x !== "")
  .map((x) => Number(x));

console.log(times);
console.log(distances);

console.log(`Puzzle 1: ${1}`);
console.log(`Puzzle 2: ${2}`);
