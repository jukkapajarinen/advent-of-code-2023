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

// Part1
let steps = 0;
let currentNode = nodes.filter((n) => n[0] === "AAA")[0];
let currentInstructionIdx = 0;
while (currentNode[0] !== "ZZZ") {
  const code =
    lrs[currentInstructionIdx] === "L" ? currentNode[1] : currentNode[2];
  currentNode = nodes.filter((n) => n[0] === code)[0];

  currentInstructionIdx =
    currentInstructionIdx < lrs.length - 1 ? currentInstructionIdx + 1 : 0;
  steps++;
}
console.log(`Puzzle 1: ${steps}`);

// Part 2
let steps2 = 0;
let currentNodes2 = nodes.filter((n) => n[0].charAt(2) === "A");
let currentInstructionIdx2 = 0;
while (
  currentNodes2.filter((n) => n[0].charAt(2) === "Z").length !==
  currentNodes2.length
) {
  currentNodes2 = currentNodes2.map((node) => {
    const code = lrs[currentInstructionIdx2] === "L" ? node[1] : node[2];
    return nodes.filter((n) => n[0] === code)[0];
  });

  currentInstructionIdx2 =
    currentInstructionIdx2 < lrs.length - 1 ? currentInstructionIdx2 + 1 : 0;
  steps2++;
}
console.log(`Puzzle 2: ${steps2}`);
