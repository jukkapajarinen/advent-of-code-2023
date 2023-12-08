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

const handType = (hand, useJokers) => {
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
  const { J, ...cardCountsNoJokers } = cardCounts;

  fiveOfAKind = Object.values(cardCounts).some((count) => count === 5);
  fourOfAKind = Object.values(cardCounts).some((count) => count === 4);
  fourOfAKindWithJokers =
    cardCounts["J"] === 3 ||
    (cardCounts["J"] === 2 &&
      Object.values(cardCountsNoJokers).some((count) => count === 2)) ||
    (cardCounts["J"] === 1 &&
      Object.values(cardCountsNoJokers).some((count) => count === 3));
  fullHouse = Object.values(cardCounts).some(
    (count) =>
      count === 3 && Object.values(cardCounts).some((count) => count === 2)
  );
  fullHouseWithJokers =
    cardCounts["J"] === 1 &&
    Object.values(cardCountsNoJokers).filter((count) => count === 2).length ===
      2;
  threeOfAKind = Object.values(cardCounts).some(
    (count) =>
      count === 3 && !Object.values(cardCounts).some((count) => count === 2)
  );
  threeOfAKindWithJokers = cardCounts["J"] === 2;
  twoPair =
    Object.values(cardCounts).filter((count) => count === 2).length === 2;
  twoPairWithJokers =
    cardCounts["J"] === 1 &&
    Object.values(cardCountsNoJokers).filter((count) => count === 2).length ===
      1;
  onePair =
    Object.values(cardCounts).filter((count) => count === 2).length === 1;
  onePairWithJokers = cardCounts["J"] === 1;

  if (fiveOfAKind) {
    return 7;
  } else if (fourOfAKind || (useJokers && fourOfAKindWithJokers)) {
    return 6;
  } else if (fullHouse || (useJokers && fullHouse)) {
    return 5;
  } else if (threeOfAKind || (useJokers && threeOfAKindWithJokers)) {
    return 4;
  } else if (twoPair || (useJokers && twoPairWithJokers)) {
    return 3;
  } else if (onePair || (useJokers && onePairWithJokers)) {
    return 2;
  } else {
    return 1;
  }
};

const rankHands = (hands, useJokers) =>
  hands.sort((hand1, hand2) => {
    const hand1Type = handType(hand1.cards, useJokers);
    const hand2Type = handType(hand2.cards, useJokers);

    if (hand1Type === hand2Type) {
      const cardOrder = useJokers
        ? ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"]
        : ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
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

// part 1
let totalWinnings1 = 0;
rankHands(hands, false).forEach((hand, idx) => {
  totalWinnings1 += hand.bid * (idx + 1);
});
console.log(`Puzzle 1: ${totalWinnings1}`);

// part 2
let totalWinnings2 = 0;
rankHands(hands, true).forEach((hand, idx) => {
  totalWinnings2 += hand.bid * (idx + 1);
});
console.log(`Puzzle 2: ${totalWinnings2}`);
