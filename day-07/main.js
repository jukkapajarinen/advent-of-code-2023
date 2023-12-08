const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

rows.forEach((row) => {
  const hand = row.split(" ")[0].split("");
  const bid = Number(row.split(" ")[1]);
  console.log(hand, bid);
});

console.log(`Puzzle 1: ${1}`);
console.log(`Puzzle 2: ${2}`);
