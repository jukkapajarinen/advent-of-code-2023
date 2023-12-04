const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

let totalPoints = 0;
let totalCards = Array(rows.length).fill(1);

rows.forEach((card) => {
  const cardNumber = Number(card.split(":")[0].replace(/[^0-9]/g, ""));
  const winningNumbers = card
    .split(":")[1]
    .split("|")[0]
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => Number(x));
  const cardNumbers = card
    .split(":")[1]
    .split("|")[1]
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => Number(x));
  const wonCards = cardNumbers.filter((n) => winningNumbers.includes(n));

  // part 1
  const points = wonCards.length
    ? wonCards.reduce((a, b, i) => (i < 1 ? a : a * 2), 1)
    : 0;
  totalPoints += points;

  // part 2
  for (let i = 1; i < wonCards.length + 1; i++) {
    totalCards[cardNumber - 1 + i] += totalCards[cardNumber - 1];
  }
});

console.log(
  util.inspect(totalCards, {
    depth: null,
    colors: true,
    maxArrayLength: Infinity,
  })
);

console.log(`Puzzle 1: ${totalPoints}`);
console.log(`Puzzle 2: ${totalCards.reduce((a, b) => a + b, 0)}`);
