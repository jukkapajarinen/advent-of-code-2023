const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

let seeds = [];
let seedToSoil = {};
let soilToFertilizer = {};
let fertilizerToWater = {};
let waterToLight = {};
let lightToTemperature = {};
let temperatureToHumidity = {};
let humidityToLocation = {};

const appendMap = (mapObj, mapRow) => {
  const [destStart, srcStart, rangeLength] = mapRow
    .trim()
    .split(" ")
    .map((x) => Number(x));
  for (let i = 0; i < rangeLength; i++) {
    mapObj[`${srcStart + i}`] = destStart + i;
  }
};

let mapIdx = -1;
rows
  .filter((row) => row !== "")
  .forEach((line, idx) => {
    if (idx === 0) {
      seeds = line
        .split(":")[1]
        .trim()
        .split(" ")
        .map((seed) => Number(seed));
    }
    if (line.includes(" map:")) {
      mapIdx++;
    } else if (mapIdx === 0) {
      appendMap(seedToSoil, line);
    } else if (mapIdx === 1) {
      appendMap(soilToFertilizer, line);
    } else if (mapIdx === 2) {
      appendMap(fertilizerToWater, line);
    } else if (mapIdx === 3) {
      appendMap(waterToLight, line);
    } else if (mapIdx === 4) {
      appendMap(lightToTemperature, line);
    } else if (mapIdx === 5) {
      appendMap(temperatureToHumidity, line);
    } else if (mapIdx === 6) {
      appendMap(humidityToLocation, line);
    }
  });

let lowestLocationNumber = Infinity;
seeds.forEach((seed) => {
  const soil = Number(
    Object.keys(seedToSoil).includes(`${seed}`) ? seedToSoil[`${seed}`] : seed
  );
  const fertilizer = Number(
    Object.keys(soilToFertilizer).includes(`${soil}`)
      ? soilToFertilizer[`${soil}`]
      : soil
  );
  const water = Number(
    Object.keys(fertilizerToWater).includes(`${fertilizer}`)
      ? fertilizerToWater[`${fertilizer}`]
      : fertilizer
  );
  const light = Number(
    Object.keys(waterToLight).includes(`${water}`)
      ? waterToLight[`${water}`]
      : water
  );
  const temperature = Number(
    Object.keys(lightToTemperature).includes(`${light}`)
      ? lightToTemperature[`${light}`]
      : light
  );
  const humidity = Number(
    Object.keys(temperatureToHumidity).includes(`${temperature}`)
      ? temperatureToHumidity[`${temperature}`]
      : temperature
  );
  const location = Number(
    Object.keys(humidityToLocation).includes(`${humidity}`)
      ? humidityToLocation[`${humidity}`]
      : humidity
  );
  if (location < lowestLocationNumber) {
    lowestLocationNumber = location;
  }
});

console.log(`Puzzle 1: ${lowestLocationNumber}`);
console.log(`Puzzle 2: ${2}`);
