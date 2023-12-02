const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

let possibleGameIdSum = 0;
let sumOfPowerOfSets = 0;

rows.forEach((row) => {
  // parse id and game sets, game by game
  const gameId = Number(row.split(":")[0].replace(/[^0-9]/g, ""));
  const gameSets = row
    .split(":")[1]
    .split(";")
    .map((set) => {
      let [red, blue, green] = [0, 0, 0];
      set.split(",").map((cubes) => {
        const split = cubes.trim().toLowerCase().split(" ");
        if (split[1] === "red") {
          red = Number(split[0]);
        }
        if (split[1] === "blue") {
          blue = Number(split[0]);
        }
        if (split[1] === "green") {
          green = Number(split[0]);
        }
      });
      return {
        red: red,
        blue: blue,
        green: green,
      };
    });

  // part 1
  const possible = gameSets.every(
    (set) => set.red <= 12 && set.blue <= 14 && set.green <= 13
  );
  if (possible) {
    possibleGameIdSum += gameId;
  }

  // part 2
  const minReds = Math.max(...gameSets.map((set) => set.red));
  const minBlues = Math.max(...gameSets.map((set) => set.blue));
  const minGreens = Math.max(...gameSets.map((set) => set.green));
  const powerOfSet = minReds * minBlues * minGreens;

  sumOfPowerOfSets += powerOfSet;
});

console.log(`Puzzle 1: ${possibleGameIdSum}`);
console.log(`Puzzle 2: ${sumOfPowerOfSets}`);
