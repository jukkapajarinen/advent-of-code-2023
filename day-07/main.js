const util = require("util");
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

const hands = rows.map((row) => {
  const cards = row.split(" ")[0].split("");
  const bid = Number(row.split(" ")[1]);
  return { cards, bid };
});

const cardOrder = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

const handType = (hand) => {
  const cardCounts = {
    A: hand.filter((c) => c === "A").length,
    K: hand.filter((c) => c === "K").length,
    Q: hand.filter((c) => c === "Q").length,
    J: hand.filter((c) => c === "J").length,
    T: hand.filter((c) => c === "T").length,
    9: hand.filter((c) => c === "9").length,
    8: hand.filter((c) => c === "8").length,
    7: hand.filter((c) => c === "7").length,
    6: hand.filter((c) => c === "6").length,
    5: hand.filter((c) => c === "5").length,
    4: hand.filter((c) => c === "4").length,
    3: hand.filter((c) => c === "3").length,
    2: hand.filter((c) => c === "2").length,
  };

  if (Object.values(cardCounts).some((count) => count === 5)) {
    return 7; // five of a kind
  } else if (Object.values(cardCounts).some((count) => count === 4)) {
    return 6; // four of a kind
  } else if (
    Object.values(cardCounts).some(
      (count) =>
        count === 3 && Object.values(cardCounts).some((count) => count === 2)
    )
  ) {
    return 5; // full house
  } else if (
    Object.values(cardCounts).some(
      (count) =>
        count === 3 && !Object.values(cardCounts).some((count) => count === 2)
    )
  ) {
    return 4; // three of a kind
  } else if (
    Object.values(cardCounts).filter((count) => count === 2).length === 2
  ) {
    return 3; // two pair
  } else if (
    Object.values(cardCounts).filter((count) => count === 2).length === 1
  ) {
    return 2; // one pair
  } else {
    return 1; // high card
  }
};

const rankedHands = hands.sort((hand1, hand2) => {
  const hand1Type = handType(hand1.cards);
  const hand2Type = handType(hand2.cards);

  if (hand1Type === hand2Type) {
    for (let i = 0; i < hand1.cards.length; i++) {
      const card1 = cardOrder.indexOf(hand1.cards[i]);
      const card2 = cardOrder.indexOf(hand2.cards[i]);
      if (card1 === card2) {
        continue;
      } else {
        return card1 - card2;
      }
    }
  } else {
    return hand1Type - hand2Type;
  }
});

let totalWinnings = 0;
rankedHands.forEach((hand, idx) => {
  totalWinnings += hand.bid * (idx + 1);
});

console.log(`Puzzle 1: ${totalWinnings}`);
console.log(`Puzzle 2: ${2}`);
