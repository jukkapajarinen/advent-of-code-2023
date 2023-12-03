const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

let sumOfPartNumbers = 0;
const possibleSets = [];
rows.forEach((row, rowIdx) => {
  const numbers = row.match(/\d+/g);
  let subRow = row;
  numbers?.forEach((number) => {
    const start = subRow.indexOf(`${number}`);
    const end = start + `${number}`.length - 1;
    const prevRow = rows[rowIdx - 1] || undefined;
    const currRow = rows[rowIdx];
    const nextRow = rows[rowIdx + 1] || undefined;
    let possiblesChars = [];

    if (start > 0) {
      possiblesChars.push({
        char: currRow.charAt(start - 1),
        row: rowIdx,
        col: start - 1,
        str: "left of number",
      });
    }
    if (end < subRow.length - 1) {
      possiblesChars.push({
        char: currRow.charAt(end + 1),
        row: rowIdx,
        col: end + 1,
        str: "right of number",
      });
    }
    if (!!prevRow) {
      if (start > 0) {
        possiblesChars.push({
          char: prevRow.charAt(start - 1),
          row: rowIdx - 1,
          col: start - 1,
          str: "top left of number",
        });
      }
      Array.from({ length: end - start + 1 }, (v, i) => i + start).map((x) => {
        possiblesChars.push({
          char: prevRow.charAt(x),
          row: rowIdx - 1,
          col: x,
          str: "top of number",
        });
      });
      if (end < prevRow.length - 1) {
        possiblesChars.push({
          char: prevRow.charAt(end + 1),
          row: rowIdx - 1,
          col: end + 1,
          str: "top right of number",
        });
      }
    }
    if (!!nextRow) {
      if (start > 0) {
        possiblesChars.push({
          char: nextRow.charAt(start - 1),
          row: rowIdx + 1,
          col: start - 1,
          str: "bottom left of number",
        });
      }
      Array.from({ length: end - start + 1 }, (v, i) => i + start).map((x) => {
        possiblesChars.push({
          char: nextRow.charAt(x),
          row: rowIdx + 1,
          col: x,
          str: "bottom of number",
        });
      });
      if (end < nextRow.length - 1) {
        possiblesChars.push({
          char: nextRow.charAt(end + 1),
          row: rowIdx + 1,
          col: end + 1,
          str: "bottom right of number",
        });
      }
    }

    possibleSets.push({
      number: `${number}`,
      row: row,
      subRow: subRow,
      start: start,
      end: end,
      rowIdx: rowIdx,
      surroundings: possiblesChars,
    });

    subRow = subRow.replace(
      `${number}`,
      `${number}`
        .split("")
        .map((l) => ".")
        .join("")
    );
  });
});

const filteredSets = possibleSets.filter(
  (s) => !s.surroundings.every((c) => c.char.match(/\d|\./g))
);

console.log(
  util.inspect(filteredSets, {
    depth: null,
    colors: true,
    maxArrayLength: Infinity,
  })
);

sumOfPartNumbers = filteredSets
  .map((x) => Number(x.number))
  .reduce((a, b) => a + b, 0);

console.log(`Puzzle 1: ${sumOfPartNumbers}`);
console.log(`Puzzle 2: ${2}`);
