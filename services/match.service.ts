import { q, runQuery, urlFor } from "../adapters/sanity";
import * as z from "zod";
import { V2Match } from "../models/V2Match.model";
import { apiGetTournament } from "./tournament.service";

const TOURNAMENT_ID = process.env.SANITY_DEFAULT_TOURNAMENT_ID;

const playerProject = q.fragmentForType<"player">().project((playerRef) => ({
  _id: z.string(),
  name: z.string().nullish(),
  nickname: z.string().nullish(),
  designation: z.string().nullish(),
  introduction: z.string().nullish(),
  portraitImage: playerRef.field("portraitImage.asset").field(
    "_ref",
    z
      .string()
      .nullish()
      .transform((assetId) =>
        urlFor(assetId, { mode: "cover", width: 720, height: 1000 })
      )
  ),
  portraitAltImage: playerRef.field("portraitAltImage.asset").field(
    "_ref",
    z
      .string()
      .nullish()
      .transform((assetId) =>
        urlFor(assetId, { mode: "cover", width: 720, height: 1000 })
      )
  ),
  fullBodyImage: playerRef.field("fullBodyImage.asset").field(
    "_ref",
    z
      .string()
      .nullish()
      .transform((assetId) =>
        urlFor(assetId, { mode: "contain", height: 1200 })
      )
  ),
  fullBodyAltImage: playerRef.field("fullBodyAltImage.asset").field(
    "_ref",
    z
      .string()
      .nullish()
      .transform((assetId) =>
        urlFor(assetId, { mode: "contain", height: 1200 })
      )
  ),
  riichiImage: playerRef.field("riichiImage.asset").field(
    "_ref",
    z
      .string()
      .nullish()
      .transform((assetId) =>
        urlFor(assetId, { mode: "cover", width: 800, height: 800 })
      )
  ),
}));

const playerProjectWithStatistics = q
  .fragmentForType<"player">()
  .project((playerRef) => ({
    ...playerProject,
    statistics: playerRef.raw<unknown>(
      `statistics[_key=="${TOURNAMENT_ID}"][0]`
    ),
  }));

const teamProject = q.fragmentForType<"team">().project((teamRef) => ({
  _id: z.string(),
  name: z.string().nullish(),
  secondaryName: z.string().nullish(),
  thirdName: z.string().nullish(),
  preferredName: z.string().nullish(),
  squareLogoImage: teamRef.field("squareLogoImage.asset").field(
    "_ref",
    z
      .string()
      .nullish()
      .transform((assetId) => urlFor(assetId, { width: 1000, height: 1000 }))
  ),
  color: teamRef.field("color.hex", z.string().nullish()),
  introduction: z.string().nullish(),
}));

export const apiQueryMatches = async () => {
  const query = q.star
    .filterByType("match")
    .filterRaw(`tournament._ref == "${TOURNAMENT_ID}"`)
    .order("startAt asc")
    .slice(0, 10)
    .project((sub) => ({
      _id: z.string(),
      name: z.string().nullish(),
      startAt: z.string(),
      playerEast: sub.field("playerEast").deref().project(playerProject),
      playerSouth: sub.field("playerSouth").deref().project(playerProject),
      playerWest: sub.field("playerWest").deref().project(playerProject),
      playerNorth: sub.field("playerNorth").deref().project(playerProject),
      playerEastTeam: sub.field("playerEastTeam").deref().project(teamProject),
      playerSouthTeam: sub
        .field("playerSouthTeam")
        .deref()
        .project(teamProject),
      playerWestTeam: sub.field("playerWestTeam").deref().project(teamProject),
      playerNorthTeam: sub
        .field("playerNorthTeam")
        .deref()
        .project(teamProject),
      _createdAt: true,
      _updatedAt: true,
    }));

  return runQuery(query).then((matches) => {
    const formatPlayer = (
      player: (typeof matches)[number]["playerEast"],
      team: (typeof matches)[number]["playerEastTeam"]
    ) => ({
      id: player?._id ?? "",
      teamId: team?._id ?? "",
      color: {
        primary: team?.color ?? "#FFFF00",
        secondary: team?.color ?? "#FFFF00",
      },
      name: {
        official: {
          primary: player?.name ?? "",
          secondary: player?.designation ?? "",
          third: player?.nickname ?? "",
        },
        display: {
          primary: player?.name ?? "",
          secondary: team?.preferredName ?? "",
          third: player?.nickname ?? "",
        },
      },
      image: {
        portrait: player?.portraitImage
          ? {
              default: {
                url: player?.portraitImage,
              },
            }
          : undefined,
        portraitAlt: player?.portraitAltImage
          ? {
              default: {
                url: player?.portraitAltImage,
              },
            }
          : undefined,
        fullBody: player?.fullBodyImage
          ? {
              default: {
                url: player?.fullBodyImage,
              },
            }
          : undefined,
        fullBodyAlt: player?.fullBodyAltImage
          ? {
              default: {
                url: player?.fullBodyAltImage,
              },
            }
          : undefined,
        riichi: player?.riichiImage
          ? {
              default: {
                url: player?.riichiImage,
              },
            }
          : undefined,
        logo: {
          default: {
            url: team?.squareLogoImage ?? "",
          },
        },
      },
    });

    return matches.map((match) => {
      return {
        schemaVersion: "2",
        code: match._id,
        data: {
          name: match.name ?? "",
          startAt: match.startAt,
          players: [
            formatPlayer(match.playerEast, match.playerEastTeam),
            formatPlayer(match.playerSouth, match.playerSouthTeam),
            formatPlayer(match.playerWest, match.playerWestTeam),
            formatPlayer(match.playerNorth, match.playerNorthTeam),
          ],
          rulesetRef: "hkleague-4p",
        },
        metadata: {
          createdAt: match._createdAt,
          updatedAt: match._updatedAt,
        },
      } satisfies V2Match;
    });
  });
};

export const apiGetMatchById = async (matchId: string) => {
  const { playersMap } = await apiGetTournament();

  const query = q.star
    .filterByType("match")
    .filterRaw(`_id == "${matchId}"`)
    .slice(0)
    .project((sub) => ({
      _id: z.string(),
      name: z.string().nullish(),
      startAt: z.string(),
      playerEastId: sub.field("playerEast").field("_ref"),
      playerSouthId: sub.field("playerSouth").field("_ref"),
      playerWestId: sub.field("playerWest").field("_ref"),
      playerNorthId: sub.field("playerNorth").field("_ref"),
      result: true,
      rounds: true,
      youtubeUrl: true,
      _createdAt: true,
      _updatedAt: true,
    }));

  return runQuery(query).then((match) => {
    if (!match) {
      throw new Error("找不到賽事");
    }

    return {
      schemaVersion: "2",
      code: match._id,
      data: {
        name: match.name ?? "",
        startAt: match.startAt,
        players: [
          playersMap[match.playerEastId!],
          playersMap[match.playerSouthId!],
          playersMap[match.playerWestId!],
          playersMap[match.playerNorthId!],
        ],
        rulesetRef: "hkleague-4p",
        result: match.result,
        rounds: match.rounds,
      },
      metadata: {
        createdAt: match._createdAt,
        updatedAt: match._updatedAt,
        youtubeUrl: match.youtubeUrl,
      },
    } satisfies V2Match;
  });
};

export const apiQueryMatchesForSchedule = async (options?: {
  hasResult?: boolean;
  direction?: "asc" | "desc";
  count?: number;
}) => {
  const { playersMap } = await apiGetTournament();

  let filter = `tournament._ref == "${TOURNAMENT_ID}"`;
  if (typeof options?.hasResult !== "undefined") {
    filter += ` && ${
      options.hasResult === true ? "" : "!"
    }defined(resultUploadedAt)`;
  }

  let order =
    options?.direction === "desc"
      ? ("startAt desc" as const)
      : ("startAt asc" as const);

  const query = q.star
    .filterByType("match")
    .filterRaw(filter)
    .order(order)
    .slice(0, options?.count ?? 1000)
    .project((sub) => ({
      _id: z.string(),
      name: z.string().nullish(),
      startAt: z.string(),
      playerEastId: sub.field("playerEast").field("_ref"),
      playerSouthId: sub.field("playerSouth").field("_ref"),
      playerWestId: sub.field("playerWest").field("_ref"),
      playerNorthId: sub.field("playerNorth").field("_ref"),
      result: sub.field("result"),
      rounds: true,
      _createdAt: true,
      _updatedAt: true,
      youtubeUrl: true,
    }));

  return runQuery(query).then((matches) => {
    return Object.entries(
      Object.groupBy(matches, ({ startAt }) => startAt.substring(0, 10))
    ).map(([date, matches = []]) => {
      const newMatch: V2Match = {
        schemaVersion: "2",
        code: matches[0]._id,
        data: {
          name: matches[0].name ?? "",
          startAt: matches[0].startAt,
          players: [
            playersMap[matches[0].playerEastId!],
            playersMap[matches[0].playerSouthId!],
            playersMap[matches[0].playerWestId!],
            playersMap[matches[0].playerNorthId!],
          ],
          rulesetRef: "hkleague-4p",
        },
        metadata: {
          createdAt: matches[0]._createdAt,
          updatedAt: matches[0]._updatedAt,
          youtubeUrl: matches[0].youtubeUrl,
        },
      };

      const players = newMatch.data.players;
      const pointsByPlayers = [0.0, 0.0, 0.0, 0.0];

      let hasResult = false;

      for (const match of matches) {
        if (match.result) {
          hasResult = true;

          pointsByPlayers[
            players.findIndex((player) => player.id === match.playerEastId)
          ] += match.result.playerEast.point;
          pointsByPlayers[
            players.findIndex((player) => player.id === match.playerSouthId)
          ] += match.result.playerSouth.point;
          pointsByPlayers[
            players.findIndex((player) => player.id === match.playerWestId)
          ] += match.result.playerWest.point;
          pointsByPlayers[
            players.findIndex((player) => player.id === match.playerNorthId)
          ] += match.result.playerNorth.point;
        }
      }

      if (hasResult) {
        const sortedScores = [
          { key: "playerEast", point: pointsByPlayers[0] },
          { key: "playerSouth", point: pointsByPlayers[1] },
          { key: "playerWest", point: pointsByPlayers[2] },
          { key: "playerNorth", point: pointsByPlayers[3] },
        ].sort((a, b) => b.point - a.point);

        newMatch.data.result = {
          playerEast: {
            point: pointsByPlayers[0],
            ranking: (
              sortedScores.findIndex(({ key }) => key === "playerEast") + 1
            ).toString() as "1" | "2" | "3" | "4",
            score: 0,
          },
          playerSouth: {
            point: pointsByPlayers[1],
            ranking: (
              sortedScores.findIndex(({ key }) => key === "playerSouth") + 1
            ).toString() as "1" | "2" | "3" | "4",
            score: 0,
          },
          playerWest: {
            point: pointsByPlayers[2],
            ranking: (
              sortedScores.findIndex(({ key }) => key === "playerWest") + 1
            ).toString() as "1" | "2" | "3" | "4",
            score: 0,
          },
          playerNorth: {
            point: pointsByPlayers[3],
            ranking: (
              sortedScores.findIndex(({ key }) => key === "playerNorth") + 1
            ).toString() as "1" | "2" | "3" | "4",
            score: 0,
          },
        };
      }

      return {
        mergedMatch: newMatch,
        matches: matches.map((match) => {
          return {
            schemaVersion: "2",
            code: match._id,
            data: {
              name: match.name ?? "",
              startAt: match.startAt,
              players: [
                playersMap[match.playerEastId!],
                playersMap[match.playerSouthId!],
                playersMap[match.playerWestId!],
                playersMap[match.playerNorthId!],
              ],
              rulesetRef: "hkleague-4p",
              result: match.result,
              rounds: match.rounds,
            },
            metadata: {
              createdAt: match._createdAt,
              updatedAt: match._updatedAt,
            },
          } satisfies V2Match;
        }),
      };
    });
  });
};

export const apiQueryMatchesForRecalulation = async (
  tournamentId: string,
  offset: number = 0,
  size: number = 50
) => {
  const query = q.star
    .filterByType("match")
    .filterRaw(
      `tournament._ref == "${tournamentId}" && defined(resultUploadedAt)`
    )
    .order("startAt asc")
    .slice(offset, size)
    .project((sub) => ({
      playerEast: sub.field("playerEast"),
      playerSouth: sub.field("playerSouth"),
      playerWest: sub.field("playerWest"),
      playerNorth: sub.field("playerNorth"),
      playerEastTeam: sub.field("playerEastTeam"),
      playerSouthTeam: sub.field("playerSouthTeam"),
      playerWestTeam: sub.field("playerWestTeam"),
      playerNorthTeam: sub.field("playerNorthTeam"),
      result: sub.field("result"),
      rounds: sub.field("rounds[]"),
    }));

  return runQuery(query);
};

export const apiGetLatestComingMatches = () =>
  apiQueryMatchesForSchedule({
    count: 4,
    direction: "asc",
    hasResult: false,
  });

export const apiGetLatestCompletedMatches = () =>
  apiQueryMatchesForSchedule({
    count: 2,
    direction: "desc",
    hasResult: true,
  });
