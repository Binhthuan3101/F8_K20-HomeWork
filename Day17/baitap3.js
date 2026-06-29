const players = [
  {
    id: 1,
    name: "DragonSlayer",
    scores: [120, 85, 200, 95],
    level: 8,
    badge: "gold",
  },
  { id: 2, name: "NightWolf", scores: [60, 75, 50], level: 5, badge: null },
  {
    id: 3,
    name: "StarQueen",
    scores: [300, 250, 180, 90, 120],
    level: 12,
    badge: "diamond",
  },
  { id: 4, name: "IronFist", scores: [40, 30], level: 2, badge: null },
  {
    id: 5,
    name: "ShadowBlade",
    scores: [150, 200, 175],
    level: 9,
    badge: "silver",
  },
];

function getTotalScore(player) {
  let sumScore = 0;
  for (const score of player.scores) {
    sumScore += score;
  }

  return sumScore;
}

console.log(getTotalScore(players[0]));
console.log(getTotalScore(players[1]));
console.log(getTotalScore(players[2]));

function getRanking(players) {
  const standardList = players.map((player) => {
    return {
      name: player.name,
      totalScore: getTotalScore(player),
      badge: player.badge ?? "none",
    };
  });
  standardList.sort((a, b) => {
    return b.totalScore - a.totalScore;
  });
  const finalRank = standardList.map((player, index) => {
    return {
      rank: index + 1,
      name: player.name,
      totalScore: player.totalScore,
      badge: player.badge,
    };
  });
  return finalRank;
}

console.log(getRanking(players));

function getTopPlayers(players, n) {
  const ranking = getRanking(players);
  const topNPlayers = ranking.slice(0, n);
  const namesOnly = topNPlayers.map((player) => player.name);
  return namesOnly;
}

console.log(getTopPlayers(players, 3));
// ["StarQueen", "ShadowBlade", "DragonSlayer"]
console.log(getTopPlayers(players, 1));
// ["StarQueen"]

function formatPlayerCard(player) {
  let rank =
    player.badge === "diamond"
      ? " | 💎 DIAMOND"
      : player.badge === "gold"
        ? " | 🏅 GOLD"
        : player.badge === "silver"
          ? " | 🥈 SILVER"
                    : "";
    return `${player.name} | lv.${player.level} | ${getTotalScore(player)} điểm${rank}`
}

console.log(formatPlayerCard(players[0]));
console.log(formatPlayerCard(players[1]));
console.log(formatPlayerCard(players[2]));


