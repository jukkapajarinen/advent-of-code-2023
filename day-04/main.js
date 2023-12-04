const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

let totalPoints = 0;
rows.forEach((row) => {
  const winningNumbers = row
    .split(":")[1]
    .split("|")[0]
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => Number(x));
  const cardNumbers = row
    .split(":")[1]
    .split("|")[1]
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => Number(x));

  const winnings = cardNumbers.filter((n) => winningNumbers.includes(n));
  const points = winnings.length
    ? winnings.reduce((a, b, i) => (i < 1 ? a : a * 2), 1)
    : 0;

  totalPoints += points;
});

console.log(`Puzzle 1: ${totalPoints}`);
console.log(`Puzzle 2: ${2}`);
