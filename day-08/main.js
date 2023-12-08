const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

const lrs = rows[0].split("");
const nodes = rows.slice(2).map((row) => {
  const node = row.split(" = ")[0].trim();
  const left = row.split(" = ")[1].split(", ")[0].replace("(", "").trim();
  const right = row.split(" = ")[1].split(", ")[1].replace(")", "").trim();
  return [node, left, right];
});

console.log(lrs);
console.log(nodes);

console.log(`Puzzle 1: ${1}`);
console.log(`Puzzle 2: ${2}`);
