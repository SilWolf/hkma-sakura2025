import { MatchTournament, Player } from "@/adapters/sanity/sanity.types";
import { apiQueryMatchesForRecalulation } from "@/services/match.service";
import { apiPatchPlayerStatistics } from "@/services/player.service";
import {
  apiGetTournamentById,
  apiPatchTeamsStatistics,
} from "@/services/tournament.service";
import { revalidatePath } from "next/cache";

type RequiredPlayerStatistics = Required<
  NonNullable<NonNullable<Player["statistics"]>[number]>
>;
const generateDefaultPlayerStatistics = () => {
  return {
    tournament: {
      _ref: "",
      _type: "reference",
    },
    _key: "",
    matchCount: 0,
    roundCount: 0,
    point: 0.0,
    scoreMax: -10000000,
    scoreMin: 10000000,
    firstCount: 0,
    secondCount: 0,
    thirdCount: 0,
    fourthCount: 0,
    riichiCount: 0,
    riichiCountWhenEast: 0,
    riichiCountWhenNonEast: 0,
    revealCount: 0,
    revealCountWhenEast: 0,
    revealCountWhenNonEast: 0,
    waitingCount: 0,
    ronCount: 0,
    ronCountWhenEast: 0,
    ronCountWhenNonEast: 0,
    waitingWhenExhaustedCount: 0,
    ronPureScoreAvg: 0.0,
    ronPureScoreAvgWhenEast: 0.0,
    ronPureScoreAvgWhenNonEast: 0.0,
    ronHighYakuCount: 0,
    chuckCount: 0,
    chuckCountWhenEast: 0,
    chuckCountWhenNonEast: 0,
    chuckPureScoreAvg: 0.0,
    chuckPureScoreAvgWhenEast: 0.0,
    chuckPureScoreAvgWhenNonEast: 0.0,
    chuckHighYakuCount: 0,
    ronAfterRiichiCount: 0,
    ronAfterRiichiPureScoreAvg: 0.0,
    ronAfterRevealCount: 0,
    ronAfterRevealPureScoreAvg: 0.0,
    chuckAfterRiichiCount: 0,
    chuckAfterRiichiPureScoreAvg: 0.0,
    chuckAfterRevealCount: 0,
    chuckAfterRevealPureScoreAvg: 0.0,
    pointRanking: 0,
    nonFourthP: 0.0,
    nonFourthPRanking: 0,
    firstAndSecondP: 0.0,
    firstAndSecondPRanking: 0,
    riichiP: 0.0,
    riichiPRanking: 0,
    ronP: 0.0,
    ronPRanking: 0,
    chuckP: 0.0,
    chuckPRanking: 0,
    revealP: 0.0,
    revealPRanking: 0,
    ronPureScoreAvgRanking: 0,
    chuckPureScoreAvgRanking: 0,
  } as RequiredPlayerStatistics;
};

const generateDefaultPlayerTemp = () => ({
  ronPureScoreTotal: 0,
  ronPureScoreTotalWhenEast: 0,
  ronPureScoreTotalWhenNonEast: 0,
  chuckPureScoreTotal: 0,
  chuckPureScoreTotalWhenEast: 0,
  chuckPureScoreTotalWhenNonEast: 0,
  ronAfterRiichiPureScoreTotal: 0,
  ronAfterRevealPureScoreTotal: 0,
  chuckAfterRiichiPureScoreTotal: 0,
  chuckAfterRevealPureScoreTotal: 0,
});

const generateDefaultTeamStatistics = () =>
  ({
    matchCount: 0,
    ranking: 0,
    initialPoint: 0.0,
    point: 0.0,
    rankingHistories: [],
    pointHistories: [],
  }) as Required<
    NonNullable<NonNullable<MatchTournament["teams"]>[number]["statistics"]>
  >;

const playerKeys = [
  "playerEast",
  "playerSouth",
  "playerWest",
  "playerNorth",
] as const;

export const recalculateStatisticsByTournamentId = async (
  tournamentId: string
) => {
  // 1. 獲取聯賽資料、玩家資料、隊伍資料
  console.log("[Recalculate] Fetching Data");
  const { tournament, playersMap, teamsMap } =
    await apiGetTournamentById(tournamentId);

  // 2.1 設定 player statistics
  console.log("[Recalculate] Setup Player Statistics");
  const playerStatisticMap = Object.keys(playersMap).reduce(
    (prev, playerId) => {
      prev[playerId] = {
        statistics: {
          ...generateDefaultPlayerStatistics(),
          tournament: {
            _ref: tournament._id,
            _type: "reference",
          },
          _key: tournament._id,
        },
        _temp: generateDefaultPlayerTemp(),
      };
      return prev;
    },
    {} as Record<
      string,
      {
        statistics: ReturnType<typeof generateDefaultPlayerStatistics>;
        _temp: ReturnType<typeof generateDefaultPlayerTemp>;
      }
    >
  );

  // 2.2 設定 team statistics
  console.log("[Recalculate] Setup Team Statistics");
  const teamStatisticMap = Object.keys(teamsMap).reduce(
    (prev, teamId) => {
      prev[teamId] = {
        statistics: {
          ...generateDefaultTeamStatistics(),
        },
        _temp: generateDefaultPlayerTemp(),
      };
      return prev;
    },
    {} as Record<
      string,
      {
        statistics: ReturnType<typeof generateDefaultTeamStatistics>;
        _temp: ReturnType<typeof generateDefaultPlayerTemp>;
      }
    >
  );

  // 3. 獲取全部對局資料
  console.log("[Recalculate] Fetch all matches");
  let page = 0;
  let matches: Awaited<ReturnType<typeof apiQueryMatchesForRecalulation>> = [];

  while (matches.length === page * 100) {
    matches.push(
      ...(await apiQueryMatchesForRecalulation(tournament._id, page * 100, 100))
    );
    page += 1;
  }

  // 3. 計算
  console.log("[Recalculate] Calculations...");
  for (const match of matches) {
    for (const playerKey of playerKeys) {
      const playerResult = match.result?.[playerKey];
      if (!playerResult) {
        continue;
      }

      const team = teamStatisticMap[match[`${playerKey}Team`]?._ref ?? ""];
      const player = playerStatisticMap[match[playerKey]?._ref ?? ""];

      // 3.1. 堆疊 team 成績
      if (team) {
        team.statistics.pointHistories.push(
          (team.statistics.pointHistories.at(-1) ?? 0) +
            playerResult.point +
            (playerResult.penalty ?? 0)
        );
      }

      // 3.2. 堆疊 player 成績
      if (player) {
        player.statistics.matchCount += 1;
        player.statistics.point +=
          playerResult.point + (playerResult.penalty ?? 0);

        if (playerResult.ranking === "1") {
          player.statistics.firstCount += 1;
        } else if (playerResult.ranking === "2") {
          player.statistics.secondCount += 1;
        } else if (playerResult.ranking === "3") {
          player.statistics.thirdCount += 1;
        } else if (playerResult.ranking === "4") {
          player.statistics.fourthCount += 1;
        }

        if (
          player.statistics.scoreMax === null ||
          player.statistics.scoreMax! < playerResult.score
        ) {
          player.statistics.scoreMax = playerResult.score;
        }

        if (
          player.statistics.scoreMin === null ||
          player.statistics.scoreMin! > playerResult.score
        ) {
          player.statistics.scoreMin = playerResult.score;
        }
      }
    }

    // 3.3. 處理 rounds
    if (match.rounds) {
      for (const round of match.rounds) {
        let pureScore = 0;
        const [, extendedRoundCount] = round.code
          .split(".")
          .map((value) => parseInt(value) || 0);

        if (round.type === "ron" || round.type === "tsumo") {
          const losers = [
            round.playerEast,
            round.playerSouth,
            round.playerWest,
            round.playerNorth,
          ].filter(({ type }) => type === "lose");

          pureScore = losers.reduce(
            (prev, loser) =>
              prev +
              loser.beforeScore -
              loser.afterScore +
              (loser.status === "isRiichied" ? 1000 : 0),
            0
          );
          pureScore -= extendedRoundCount * 300;
        }

        for (const playerKey of playerKeys) {
          const player = playerStatisticMap[match[playerKey]?._ref ?? ""];
          if (!player) {
            continue;
          }

          player.statistics.roundCount += 1;

          if (round[playerKey].status === "isRiichied") {
            player.statistics.riichiCount += 1;
            if (round[playerKey].position === "east") {
              player.statistics.riichiCountWhenEast += 1;
            } else {
              player.statistics.riichiCountWhenNonEast += 1;
            }
          } else if (round[playerKey].status === "isRevealed") {
            player.statistics.revealCount += 1;
            if (round[playerKey].position === "east") {
              player.statistics.revealCountWhenEast += 1;
            } else {
              player.statistics.revealCountWhenNonEast += 1;
            }
          }

          if (round[playerKey].isWaited) {
            player.statistics.waitingCount += 1;
          }

          if (
            round[playerKey].type === "win" &&
            (round.type === "ron" || round.type === "tsumo")
          ) {
            player.statistics.ronCount += 1;
            player._temp.ronPureScoreTotal += pureScore;

            if (round[playerKey].han)
              if (round[playerKey].position === "east") {
                player.statistics.ronCountWhenEast += 1;
                player._temp.ronPureScoreTotalWhenEast += pureScore;
              } else {
                player.statistics.ronCountWhenNonEast += 1;
                player._temp.ronPureScoreTotalWhenNonEast += pureScore;
              }

            if (round[playerKey].status === "isRiichied") {
              player.statistics.ronAfterRiichiCount += 1;
              player._temp.ronAfterRiichiPureScoreTotal += pureScore;
            } else if (round[playerKey].status === "isRevealed") {
              player.statistics.ronAfterRevealCount += 1;
              player._temp.ronAfterRevealPureScoreTotal += pureScore;
            }
          } else if (round[playerKey].type === "lose" && round.type === "ron") {
            player.statistics.chuckCount += 1;
            player._temp.chuckPureScoreTotal += pureScore;

            if (round[playerKey].position === "east") {
              player.statistics.chuckCountWhenEast += 1;
              player._temp.chuckPureScoreTotalWhenEast += pureScore;
            } else {
              player.statistics.chuckCountWhenNonEast += 1;
              player._temp.chuckPureScoreTotalWhenNonEast += pureScore;
            }

            if (round[playerKey].status === "isRiichied") {
              player.statistics.chuckAfterRiichiCount += 1;
              player._temp.chuckAfterRiichiPureScoreTotal += pureScore;
            } else if (round[playerKey].status === "isRevealed") {
              player.statistics.chuckAfterRevealCount += 1;
              player._temp.chuckAfterRevealPureScoreTotal += pureScore;
            }
          } else if (
            round[playerKey].type === "win" &&
            round.type === "exhausted"
          ) {
            player.statistics.waitingWhenExhaustedCount += 1;
          }
        }
      }
    }
  }

  // 4. 計算 team 排名
  Object.entries(teamStatisticMap)
    .sort(
      (a, b) =>
        (b[1].statistics.pointHistories.at(-1) ?? 0) -
        (a[1].statistics.pointHistories.at(-1) ?? 0)
    )
    .forEach(([teamId], index) => {
      teamStatisticMap[teamId].statistics.ranking = index + 1;
      teamStatisticMap[teamId].statistics.point =
        teamStatisticMap[teamId].statistics.pointHistories.at(-1) ?? 0;
      teamStatisticMap[teamId].statistics.matchCount =
        teamStatisticMap[teamId].statistics.pointHistories.length;
    });

  console.log("[Recalculate] Update teams statistics...");
  await apiPatchTeamsStatistics(tournament._id, teamStatisticMap);
  console.log("[Recalculate] Update teams statistics... DONE");

  // 5. 計算玩家成績及排名
  const assignRankingToEachPlayer = (
    arr: { playerId: string; statistics: RequiredPlayerStatistics }[],
    field: keyof RequiredPlayerStatistics,
    direction: "asc" | "desc",
    rankingField: keyof RequiredPlayerStatistics,
    requiredField: keyof RequiredPlayerStatistics
  ) => {
    const rankings = arr
      .filter((player) => (player.statistics[requiredField] as number) > 0)
      .map((player) => ({
        _playerId: player.playerId,
        value: player.statistics[field] as number,
      }))
      .sort((a, b) => (a.value - b.value) * (direction === "asc" ? 1 : -1));

    const playerRankingMap: Record<string, number> = {};
    let prevValue =
      direction === "asc"
        ? Number.NEGATIVE_INFINITY.toFixed(3)
        : Number.POSITIVE_INFINITY.toFixed(3);
    let prevRanking = 0;

    for (let i = 0; i < rankings.length; i++) {
      const player = rankings[i];
      if (player.value.toFixed(3) !== prevValue) {
        playerRankingMap[player._playerId] = prevRanking + 1;
        prevRanking = i + 1;
        prevValue = player.value.toFixed(3);
      } else {
        playerRankingMap[player._playerId] = prevRanking;
      }
    }

    for (let i = 0; i < arr.length; i++) {
      (arr[i].statistics[rankingField] as number) =
        playerRankingMap[arr[i].playerId];
    }
  };

  const playerStatistics = Object.entries(playerStatisticMap).map(
    ([playerId, { statistics, _temp }]) => ({
      playerId,
      statistics: {
        ...statistics,
        scoreMin: statistics.scoreMin === null ? 0 : statistics.scoreMin,
        scoreMax: statistics.scoreMax === null ? 0 : statistics.scoreMax,
        ronPureScoreAvg:
          statistics.ronCount > 0
            ? _temp.ronPureScoreTotal / statistics.ronCount
            : 0.0,
        ronPureScoreAvgWhenEast:
          statistics.ronCountWhenEast > 0
            ? _temp.ronPureScoreTotalWhenEast / statistics.ronCountWhenEast
            : 0.0,
        ronPureScoreAvgWhenNonEast:
          statistics.ronCountWhenNonEast > 0
            ? _temp.ronPureScoreTotalWhenNonEast /
              statistics.ronCountWhenNonEast
            : 0.0,
        chuckPureScoreAvg:
          statistics.chuckCount > 0
            ? _temp.chuckPureScoreTotal / statistics.chuckCount
            : 0.0,
        chuckPureScoreAvgWhenEast:
          statistics.chuckCountWhenEast > 0
            ? _temp.chuckPureScoreTotalWhenEast / statistics.chuckCountWhenEast
            : 0.0,
        chuckPureScoreAvgWhenNonEast:
          statistics.chuckCountWhenNonEast > 0
            ? _temp.chuckPureScoreTotalWhenNonEast /
              statistics.chuckCountWhenNonEast
            : 0.0,
        ronAfterRiichiPureScoreAvg:
          statistics.ronAfterRiichiCount > 0
            ? _temp.ronAfterRiichiPureScoreTotal /
              statistics.ronAfterRiichiCount
            : 0.0,
        ronAfterRevealPureScoreAvg:
          statistics.ronAfterRevealCount > 0
            ? _temp.ronAfterRevealPureScoreTotal /
              statistics.ronAfterRevealCount
            : 0.0,
        chuckAfterRiichiPureScoreAvg:
          statistics.chuckAfterRiichiCount > 0
            ? _temp.chuckAfterRiichiPureScoreTotal /
              statistics.chuckAfterRiichiCount
            : 0.0,
        chuckAfterRevealPureScoreAvg:
          statistics.chuckAfterRevealCount > 0
            ? _temp.chuckAfterRevealPureScoreTotal /
              statistics.chuckAfterRevealCount
            : 0.0,

        nonFourthP:
          statistics.matchCount > 0
            ? 1 - statistics.fourthCount / statistics.matchCount
            : 0.0,
        firstAndSecondP:
          statistics.matchCount > 0
            ? (statistics.firstCount + statistics.secondCount) /
              statistics.matchCount
            : 0.0,
        riichiP:
          statistics.roundCount > 0
            ? statistics.riichiCount / statistics.roundCount
            : 0.0,
        ronP:
          statistics.roundCount > 0
            ? statistics.ronCount / statistics.roundCount
            : 0.0,
        chuckP:
          statistics.roundCount > 0
            ? statistics.chuckCount / statistics.roundCount
            : 0.0,
        revealP:
          statistics.roundCount > 0
            ? statistics.revealCount / statistics.roundCount
            : 0.0,
      },
    })
  );

  assignRankingToEachPlayer(
    playerStatistics,
    "point",
    "desc",
    "pointRanking",
    "matchCount"
  );
  assignRankingToEachPlayer(
    playerStatistics,
    "nonFourthP",
    "desc",
    "nonFourthPRanking",
    "matchCount"
  );
  assignRankingToEachPlayer(
    playerStatistics,
    "firstAndSecondP",
    "desc",
    "firstAndSecondPRanking",
    "matchCount"
  );
  assignRankingToEachPlayer(
    playerStatistics,
    "riichiP",
    "desc",
    "riichiPRanking",
    "roundCount"
  );
  assignRankingToEachPlayer(
    playerStatistics,
    "ronP",
    "desc",
    "ronPRanking",
    "roundCount"
  );
  assignRankingToEachPlayer(
    playerStatistics,
    "chuckP",
    "asc",
    "chuckPRanking",
    "roundCount"
  );
  assignRankingToEachPlayer(
    playerStatistics,
    "revealP",
    "desc",
    "revealPRanking",
    "roundCount"
  );
  assignRankingToEachPlayer(
    playerStatistics,
    "ronPureScoreAvg",
    "desc",
    "ronPureScoreAvgRanking",
    "roundCount"
  );
  assignRankingToEachPlayer(
    playerStatistics,
    "chuckPureScoreAvg",
    "asc",
    "chuckPureScoreAvgRanking",
    "roundCount"
  );

  console.log("[Recalculate] Update players statistics...");
  for (const playerStatistic of playerStatistics) {
    await apiPatchPlayerStatistics(
      playerStatistic.playerId,
      tournament._id,
      playerStatistic.statistics,
      { needInitialize: !playersMap[playerStatistic.playerId].statistics }
    );
    console.log(`[Recalculate] Update player ${playerStatistic.playerId} DONE`);
  }
  console.log("[Recalculate] Update players statistics... DONE");

  revalidatePath("/(public)", "layout");
};
