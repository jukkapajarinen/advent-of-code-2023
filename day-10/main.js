const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

const pipeData = rows.map((row) => row.split(""));

console.log(pipeData);

const stepsToFarthestPos = 0;

console.log(`Puzzle 1: ${stepsToFarthestPos}`);
console.log(`Puzzle 2: ${2}`);
