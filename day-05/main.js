const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

const getLowestLocationNumber = (seeds, maps) => {
  let lowestLocationNumber = Infinity;
  for (const seed of seeds) {
    for (let i = seed.src; i <= seed.src + (seed.range - 1); i++) {
      let currentValue = i;
      for (const map of maps) {
        for (const ranges of map) {
          if (currentValue >= ranges.src && currentValue <= ranges.srcMax) {
            const srcIdx = currentValue - ranges.src;
            currentValue = ranges.dest + srcIdx;
            break;
          }
        }
      }

      if (currentValue < lowestLocationNumber) {
        lowestLocationNumber = currentValue;
      }
    }
  }
  return lowestLocationNumber;
};

// maps are same for part 1 and 2
const maps = [];
let currentMap = [];
rows
  .slice(2)
  .filter((row) => !row.includes(" map:"))
  .concat([""])
  .forEach((mapRow, idx) => {
    if (mapRow === "") {
      maps.push(currentMap);
      currentMap = [];
    } else {
      const [dest, src, range] = mapRow
        .split(" ")
        .map((x) => x.trim())
        .filter((x) => x !== "")
        .map((x) => Number(x));
      const destMax = dest + (range - 1);
      const srcMax = src + (range - 1);
      currentMap.push({ dest, destMax, src, srcMax, range });
    }
  });

// Part 1
const seeds1 = rows[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .map((seed) => {
    return { src: Number(seed), srcMax: Number(seed), range: 1 };
  });
const location1 = getLowestLocationNumber(seeds1, maps);
console.log(`Puzzle 1: ${location1}`);

// part 2
const seeds2 = [];
const seedsAndRanges = rows[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .map((x) => Number(x));
for (let i = 0; i < seedsAndRanges.length; i += 2) {
  const src = seedsAndRanges[i];
  const range = seedsAndRanges[i + 1];
  const srcMax = src + range - 1;
  seeds2.push({ src: seedsAndRanges[i], srcMax: srcMax, range: range });
}
const location2 = getLowestLocationNumber(seeds2, maps);
console.log(`Puzzle 2: ${location2}`);
