const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

const parseMapRow = (mapRow) =>
  mapRow
    .split(" ")
    .map((x) => x.trim())
    .filter((x) => x !== "")
    .map((x) => Number(x));

const seeds = rows[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .map((seed) => Number(seed));
const maps = rows.slice(1).filter((row) => row !== "");

let lowestLocationNumber = Infinity;
seeds.forEach((seed) => {
  let mapIdx = -1;
  let mapMatchFound = false;
  let currentValue = seed;
  maps.forEach((mapRow) => {
    if (mapRow.includes(" map:")) {
      mapIdx++;
      mapMatchFound = false;
      return;
    }

    const [dest, src, range] = parseMapRow(mapRow);
    const destMax = dest + (range - 1);
    const srcMax = src + (range - 1);

    if (!mapMatchFound && currentValue >= src && currentValue <= srcMax) {
      const srcIdx = currentValue - src;
      currentValue = dest + srcIdx;
      mapMatchFound = true;
    }
  });

  if (currentValue < lowestLocationNumber) {
    lowestLocationNumber = currentValue;
  }
});

console.log(`Puzzle 1: ${lowestLocationNumber}`);
console.log(`Puzzle 2: ${2}`);
