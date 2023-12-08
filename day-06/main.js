const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

const calculateWaysToWin = (times, distances) => {
  const waysToWin = Array(times.length).fill(0);
  for (let i = 0; i < times.length; i++) {
    const timeToUse = times[i];
    const distToBeat = distances[i];

    for (let holdTime = 0; holdTime <= timeToUse; holdTime++) {
      const speed = holdTime;
      const timeLeft = timeToUse - holdTime;
      const dist = timeLeft * speed;

      if (dist > distToBeat) {
        waysToWin[i]++;
      }
    }
  }
  return waysToWin;
};

// part 1
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
const waysToWin = calculateWaysToWin(times, distances);

// part 2
const waysToWin2 = calculateWaysToWin(
  [Number(times.join(""))],
  [Number(distances.join(""))]
);

console.log(`Puzzle 1: ${waysToWin.reduce((a, b) => a * b, 1)}`);
console.log(`Puzzle 2: ${waysToWin2[0]}`);
