const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

const histories = rows.map((row) => row.split(" ").map((x) => Number(x)));

const historiesWithSequences = [];
histories.forEach((history) => {
  const sequences = [history];
  while (!sequences[sequences.length - 1].every((d) => d === 0)) {
    const lastSequence = sequences[sequences.length - 1];
    const diffs = [];
    for (let i = 0; i < lastSequence.length - 1; i++) {
      diffs.push(lastSequence[i + 1] - lastSequence[i]);
    }
    sequences.push(diffs);
  }
  historiesWithSequences.push(sequences);
});

// Part 1
const nextValues = [];
historiesWithSequences.forEach((historyWithSequences) => {
  historyWithSequences[historyWithSequences.length - 1].push(0);
  for (let i = historyWithSequences.length - 1; i > -1; i--) {
    const curr = historyWithSequences[i];
    const next = historyWithSequences[i - 1];
    let value = undefined;
    if (next) {
      value = [...next].pop() + [...curr].pop();
      next.push(value);
    }
  }
  nextValues.push([...historyWithSequences[0]].pop());
});
console.log(`Puzzle 1: ${nextValues.reduce((a, b) => a + b, 0)}`);

// Part 2
const prevValues = [];
historiesWithSequences.forEach((historyWithSequences) => {
  historyWithSequences[historyWithSequences.length - 1].unshift(0);
  for (let i = historyWithSequences.length - 1; i > -1; i--) {
    const curr = historyWithSequences[i];
    const next = historyWithSequences[i - 1];
    let value = undefined;
    if (next) {
      value = [...next].shift() - [...curr].shift();
      next.unshift(value);
    }
  }
  prevValues.push([...historyWithSequences[0]].shift());
});
console.log(`Puzzle 2: ${prevValues.reduce((a, b) => a + b, 0)}`);
