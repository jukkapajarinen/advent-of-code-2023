const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

const galaxies = rows.map((row) => row.split(""));

console.log(galaxies);

const sumOfLengths = 0;

console.log(`Puzzle 1: ${sumOfLengths}`);
console.log(`Puzzle 2: ${2}`);
