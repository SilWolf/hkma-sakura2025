import { createClient } from "@sanity/client";
import { cache } from "react";
import { getYoutubeThumbnailByUrl } from "./youtube.helper";
import {
  Match,
  Player,
  RawMatch,
  RawMatchWithRounds,
  Team,
  TeamPlayer,
  TournamentTeam,
  TournamentTeamWithPlayers,
} from "@/types/index.type";
import { mergeObject } from "@/utils/object.util";

const STAGES = {
  regulars: {
    tournamentId: process.env.SANITY_DEFAULT_TOURNAMENT_ID,
  },
  semifinals: {
    tournamentId: process.env.SANITY_SEMIFINALS_TOURNAMENT_ID,
  },
  finals: {
    tournamentId: process.env.SANITY_FINALS_TOURNAMENT_ID,
  },
} as const;

const CURRENT_STAGE_TOURNAMENT_ID = STAGES.regulars.tournamentId;

const PLAYER_PROJECTION = `_id, name, nickname, designation, "portraitImage": portraitImage.asset->url, introduction`;
const PLAYER_META_FIELDS = [
  "name",
  "nickname",
  '"portraitImage": portraitImage.asset->url',
  "designation",
  "introduction",
];

const TEAM_PROJECTION = `{_id, "slug": slug.current, name, secondaryName, thirdName, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex, introduction}`;
const TEAM_META_FIELDS = [
  '"slug": slug.current',
  "name",
  "secondaryName",
  "thirdName",
  '"squareLogoImage": squareLogoImage.asset->url',
  '"color": color.hex',
  "introduction",
];
const TEAM_PLAYER_PROJECTION = `{team->${TEAM_PROJECTION}, player->{${PLAYER_PROJECTION}}, overridedDesignation, overridedName, overridedNickname, "overridedColor": overridedColor.hex, "overridedPortraitImage": overridedPortraitImage.asset->url}`;

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET_ID,
  useCdn: true,
  apiVersion: "2023-05-03",
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
});

const publicClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET_ID,
  useCdn: true,
  apiVersion: "2023-05-03",
});

export const getRegularTeams = cache(() =>
  publicClient
    .fetch(
      `*[_type == "matchTournament" && _id == "${
        process.env.SANITY_DEFAULT_TOURNAMENT_ID
      }"]{ teams[]{ _key, ref->{${["_id", ...TEAM_META_FIELDS].join(
        ", "
      )}}, "overrided": overrided{${[...TEAM_META_FIELDS].join(", ")}} } }`
    )
    .then((tournaments) =>
      (tournaments[0]?.teams as TournamentTeam[]).map(
        ({ ref, overrided, ...team }) => ({
          ...team,
          team: mergeObject(ref, overrided),
        })
      )
    )
);

export const getRegularTeamsWithPlayers = cache(() =>
  publicClient
    .fetch(
      `*[_type == "matchTournament" && _id == "${
        process.env.SANITY_DEFAULT_TOURNAMENT_ID
      }"]{ teams[]{ _key, ref->{${["_id", ...TEAM_META_FIELDS].join(
        ", "
      )}}, "overrided": overrided{${[...TEAM_META_FIELDS].join(
        ", "
      )}}, players[]{ref->{${["_id", ...PLAYER_META_FIELDS].join(
        ", "
      )}}, "overrided": overrided{${[...PLAYER_META_FIELDS].join(", ")}} } } }`
    )
    .then((tournaments) => {
      return (tournaments[0]?.teams as TournamentTeamWithPlayers[]).map(
        ({ ref, overrided, ...team }) => ({
          ...team,
          team: mergeObject(ref, overrided),
          players: team.players.map((player) =>
            mergeObject(player.ref, player.overrided)
          ),
        })
      );
    })
);

export const getRegularTeamsWithPlayersWithStatistics = cache(() =>
  publicClient
    .fetch(
      `*[_type == "matchTournament" && _id == "${
        process.env.SANITY_DEFAULT_TOURNAMENT_ID
      }"]{ teams[]{ _key, ref->{${["_id", ...TEAM_META_FIELDS].join(
        ", "
      )}}, "overrided": overrided{${[...TEAM_META_FIELDS].join(
        ", "
      )}}, players[]{ref->{${[
        "_id",
        ...PLAYER_META_FIELDS,
        `"statistic": statistics[_key=="${process.env.SANITY_DEFAULT_TOURNAMENT_ID}"][0]`,
      ].join(", ")}}, "overrided": overrided{${[...PLAYER_META_FIELDS].join(
        ", "
      )}} } } }`
    )
    .then((tournaments) => {
      return (tournaments[0]?.teams as TournamentTeamWithPlayers[]).map(
        ({ ref, overrided, ...team }) => ({
          ...team,
          team: mergeObject(ref, overrided),
          players: team.players.map((player) =>
            mergeObject(player.ref, player.overrided)
          ),
        })
      );
    })
);

export const getTeams = cache(() =>
  publicClient
    .fetch(
      `*[_type == "matchTournament" && _id == "${CURRENT_STAGE_TOURNAMENT_ID}"]{ teams[]{ _key, ref->{${[
        "_id",
        ...TEAM_META_FIELDS,
      ].join(", ")}}, "overrided": overrided{${[...TEAM_META_FIELDS].join(
        ", "
      )}}, statistics } }`
    )
    .then((tournaments) =>
      (tournaments[0]?.teams as TournamentTeam[]).map((team) => ({
        ...team,
        team: mergeObject(team.ref, team.overrided),
      }))
    )
);

export const getTeamSlugs = cache(() =>
  publicClient
    .fetch(
      `*[_type == "matchTournament" && _id == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}"]{ teams[]{ "slug": ref->slug.current } }`
    )
    .then((tournaments) =>
      (tournaments[0]?.teams as Team[]).map((team) => team.slug)
    )
);

export const getTeamDetailBySlug = cache(async (slug: string) => {
  const team = await publicClient
    .fetch(`*[_type == "team" && slug.current == "${slug}"]${TEAM_PROJECTION}`)
    .then((teams) => teams[0] as Team);

  if (!team) {
    return null;
  }

  const players = await publicClient
    .fetch(
      `*[_type == "teamPlayer" && team._ref == "${team._id}"] | order(player->name asc){ team->{_id}, player->{${PLAYER_PROJECTION}, "statistic": statistics[_key=="${process.env.SANITY_DEFAULT_TOURNAMENT_ID}"][0]}, overridedDesignation, overridedName, overridedNickname, "overridedColor": overridedColor.hex, introduction}`
    )
    .then((teamPlayers: TeamPlayer[]) =>
      teamPlayers.map((teamPlayer) => ({
        ...formatTeamPlayerDTO(null, teamPlayer),
        statistic: teamPlayer.player.statistic!,
      }))
    );

  return {
    ...formatTeamPlayerDTO(team),
    players,
  };
});

export const getOldMatches = cache(() =>
  publicClient
    .fetch(
      `*[_type == "match" && !(_id in path("drafts.**")) && tournament._ref == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}" && status == "completed"] | order(startAt desc)[0...8]{ _id, name, playerEast->${TEAM_PLAYER_PROJECTION}, playerSouth->${TEAM_PLAYER_PROJECTION}, playerWest->${TEAM_PLAYER_PROJECTION}, playerNorth->${TEAM_PLAYER_PROJECTION}, playerEastTeam->${TEAM_PROJECTION}, playerSouthTeam->${TEAM_PROJECTION}, playerWestTeam->${TEAM_PROJECTION}, playerNorthTeam->${TEAM_PROJECTION}, startAt, youtubeUrl, bilibiliUrl, result}`
    )
    .then((matches: Match[]) =>
      matches.map(({ ...match }) => ({
        ...match,
        youtubeThumbnailUrl: getYoutubeThumbnailByUrl(match.youtubeUrl),
      }))
    )
);

export const getMatch = cache(async (matchId: string) => {
  const regularTeams = await getRegularTeamsWithPlayers();
  const rawMatch = await publicClient
    .fetch<RawMatchWithRounds[]>(
      `*[_type == "match" && _id == "${matchId}"]{ _id, name, playerEast, playerSouth, playerWest, playerNorth, playerEastTeam, playerSouthTeam, playerWestTeam, playerNorthTeam, startAt, youtubeUrl, bilibiliUrl, result, rounds}`
    )
    .then((rawMatches) => rawMatches[0]);

  const playerEastTeam = regularTeams.find(
    ({ team }) => team._id === rawMatch.playerEastTeam!._ref
  )!;
  const playerEast = playerEastTeam.players.find(
    ({ _id }) => _id === rawMatch.playerEast!._ref
  );

  const playerSouthTeam = regularTeams.find(
    ({ team }) => team._id === rawMatch.playerSouthTeam!._ref
  )!;
  const playerSouth = playerSouthTeam.players.find(
    ({ _id }) => _id === rawMatch.playerSouth!._ref
  );
  const playerWestTeam = regularTeams.find(
    ({ team }) => team._id === rawMatch.playerWestTeam!._ref
  )!;
  const playerWest = playerWestTeam.players.find(
    ({ _id }) => _id === rawMatch.playerWest!._ref
  );
  const playerNorthTeam = regularTeams.find(
    ({ team }) => team._id === rawMatch.playerNorthTeam!._ref
  )!;
  const playerNorth = playerNorthTeam.players.find(
    ({ _id }) => _id === rawMatch.playerNorth!._ref
  );

  return {
    ...rawMatch,
    rounds: rawMatch.rounds ?? [],
    playerEastTeam: playerEastTeam.team,
    playerSouthTeam: playerSouthTeam.team,
    playerWestTeam: playerWestTeam.team,
    playerNorthTeam: playerNorthTeam.team,
    playerEast,
    playerSouth,
    playerWest,
    playerNorth,
  };
});

export const getLastDateFinishedMatchesGroupedByDate = cache(async () => {
  const regularTeams = await getRegularTeamsWithPlayers();
  const players = regularTeams.map(({ players }) => players).flat();
  const scheduledRawMatches = await publicClient.fetch<RawMatch[]>(
    `*[_type == "match" && !(_id in path("drafts.**")) && tournament._ref == "${CURRENT_STAGE_TOURNAMENT_ID}" && defined(result.rounds)] | order(startAt desc)[0...2] { _id, name, playerEast, playerEastTeam, playerSouth, playerSouthTeam, playerWest, playerWestTeam, playerNorth, playerNorthTeam, startAt, youtubeUrl, bilibiliUrl, result}`
  );

  const matchesGroupedByDate: Record<
    string,
    {
      weekday: number;
      matches: Match[];
    }
  > = {};

  for (const rawMatch of scheduledRawMatches) {
    const dateString = `${rawMatch.startAt.substring(
      8,
      10
    )}/${rawMatch.startAt.substring(5, 7)}`;

    if (!matchesGroupedByDate[dateString]) {
      const date = new Date(rawMatch.startAt);
      const weekday = date.getDay();

      matchesGroupedByDate[dateString] = {
        weekday,
        matches: [],
      };
    }

    matchesGroupedByDate[dateString].matches.unshift({
      ...rawMatch,
      playerEast: players.find(({ _id }) => _id === rawMatch.playerEast!._ref)!,
      playerEastTeam: regularTeams.find(
        ({ team }) => team._id === rawMatch.playerEastTeam!._ref
      )!.team,
      playerSouth: players.find(
        ({ _id }) => _id === rawMatch.playerSouth!._ref
      )!,
      playerSouthTeam: regularTeams.find(
        ({ team }) => team._id === rawMatch.playerSouthTeam!._ref
      )!.team,
      playerWest: players.find(({ _id }) => _id === rawMatch.playerWest!._ref)!,
      playerWestTeam: regularTeams.find(
        ({ team }) => team._id === rawMatch.playerWestTeam!._ref
      )!.team,
      playerNorth: players.find(
        ({ _id }) => _id === rawMatch.playerNorth!._ref
      )!,
      playerNorthTeam: regularTeams.find(
        ({ team }) => team._id === rawMatch.playerNorthTeam!._ref
      )!.team,
    });
  }

  const result = Object.entries(matchesGroupedByDate).map(([key, value]) => ({
    date: key,
    ...value,
  }));

  if (!result[0]) {
    return [];
  }

  return [result[0]];
});

export const getLatestComingMatchesGroupedByDate = cache(async () => {
  const regularTeams = await getRegularTeamsWithPlayers();
  const players = regularTeams.map(({ players }) => players).flat();
  const scheduledMatches = await publicClient.fetch<RawMatch[]>(
    `*[_type == "match" && !(_id in path("drafts.**")) && tournament._ref == "${CURRENT_STAGE_TOURNAMENT_ID}" && !defined(result.rounds)] | order(startAt asc)[0...4] { _id, name, playerEast, playerEastTeam, playerSouth, playerSouthTeam, playerWest, playerWestTeam, playerNorth, playerNorthTeam, startAt, youtubeUrl, bilibiliUrl}`
  );

  const matchesGroupedByDate: Record<
    string,
    {
      weekday: number;
      matches: Omit<Match, "rounds">[];
    }
  > = {};

  for (const rawMatch of scheduledMatches) {
    const dateString = `${rawMatch.startAt.substring(
      8,
      10
    )}/${rawMatch.startAt.substring(5, 7)}`;

    if (!matchesGroupedByDate[dateString]) {
      const date = new Date(rawMatch.startAt);
      const weekday = date.getDay();

      matchesGroupedByDate[dateString] = {
        weekday,
        matches: [],
      };
    }

    matchesGroupedByDate[dateString].matches.push({
      ...rawMatch,
      playerEast: players.find(({ _id }) => _id === rawMatch.playerEast!._ref)!,
      playerEastTeam: regularTeams.find(
        ({ team }) => team._id === rawMatch.playerEastTeam!._ref
      )!.team,
      playerSouth: players.find(
        ({ _id }) => _id === rawMatch.playerSouth!._ref
      )!,
      playerSouthTeam: regularTeams.find(
        ({ team }) => team._id === rawMatch.playerSouthTeam!._ref
      )!.team,
      playerWest: players.find(({ _id }) => _id === rawMatch.playerWest!._ref)!,
      playerWestTeam: regularTeams.find(
        ({ team }) => team._id === rawMatch.playerWestTeam!._ref
      )!.team,
      playerNorth: players.find(
        ({ _id }) => _id === rawMatch.playerNorth!._ref
      )!,
      playerNorthTeam: regularTeams.find(
        ({ team }) => team._id === rawMatch.playerNorthTeam!._ref
      )!.team,
    });
  }

  const result = Object.entries(matchesGroupedByDate).map(([key, value]) => ({
    date: key,
    ...value,
  }));

  return result;
});

/**
 * @deprecated since story/semifinal. Use getMatchesGroupedByStageAndDate instead.
 */
export const getMatchesGroupedByDate = cache(
  async (
    startDate: string,
    endDate: string,
    options?: { withPlayerDetails?: boolean }
  ) => {
    const teamPlayerProjection = options?.withPlayerDetails
      ? `..., team->${TEAM_PROJECTION}, player->{${PLAYER_PROJECTION}}`
      : 'team->{_id, name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}';
    const teamProjection = TEAM_PROJECTION;

    const scheduledMatches = await publicClient.fetch<Match[]>(
      `*[_type == "match" && !(_id in path("drafts.**")) && tournament._ref == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}" && startAt >= "${startDate}" && startAt < "${endDate}"] | order(startAt asc){ _id, name, playerEast->{${teamPlayerProjection}}, playerSouth->{${teamPlayerProjection}}, playerWest->{${teamPlayerProjection}}, playerNorth->{${teamPlayerProjection}}, playerEastTeam->${teamProjection}, playerSouthTeam->${teamProjection}, playerWestTeam->${teamProjection}, playerNorthTeam->${teamProjection}, startAt, youtubeUrl, bilibiliUrl, result}`
    );

    const matchesGroupedByDate: Record<
      string,
      { weekday: number; matches: Match[] }
    > = {};

    for (const match of scheduledMatches) {
      const dateString = match.startAt.substring(0, 10);

      if (!matchesGroupedByDate[dateString]) {
        const date = new Date(match.startAt);
        const weekday = date.getDay();

        matchesGroupedByDate[dateString] = {
          weekday,
          matches: [],
        };
      }

      matchesGroupedByDate[dateString].matches.push(match);
    }

    const result = Object.entries(matchesGroupedByDate).map(([key, value]) => ({
      date: key,
      ...value,
    }));

    return result;
  }
);

export const getMatchesGroupedByStageAndDate = cache(
  async (
    stage: keyof typeof STAGES,
    startDate: string,
    endDate: string,
    options?: { withPlayerDetails?: boolean }
  ) => {
    const regularTeams = await getRegularTeamsWithPlayers();

    const activeStage = STAGES[stage];
    const scheduledMatches = await publicClient.fetch<RawMatch[]>(
      `*[_type == "match" && !(_id in path("drafts.**")) && tournament._ref == "${activeStage.tournamentId}" && startAt >= "${startDate}" && startAt < "${endDate}"] | order(startAt asc){ _id, name, playerEast, playerSouth, playerWest, playerNorth, playerEastTeam, playerSouthTeam, playerWestTeam, playerNorthTeam, startAt, youtubeUrl, bilibiliUrl, result}`
    );

    const matchesGroupedByDate: Record<
      string,
      { weekday: number; matches: Match[] }
    > = {};

    for (const rawMatch of scheduledMatches) {
      const dateString = rawMatch.startAt.substring(0, 10);

      if (!matchesGroupedByDate[dateString]) {
        const date = new Date(rawMatch.startAt);
        const weekday = date.getDay();

        matchesGroupedByDate[dateString] = {
          weekday,
          matches: [],
        };
      }

      const teamEast = regularTeams.find(
        ({ team }) => rawMatch.playerEastTeam?._ref === team._id
      );
      const playerEast = teamEast?.players.find(
        ({ _id }) => _id === rawMatch.playerEast?._ref
      );
      const teamSouth = regularTeams.find(
        ({ team }) => rawMatch.playerSouthTeam?._ref === team._id
      );
      const playerSouth = teamSouth?.players.find(
        ({ _id }) => _id === rawMatch.playerSouth?._ref
      );
      const teamWest = regularTeams.find(
        ({ team }) => rawMatch.playerWestTeam?._ref === team._id
      );
      const playerWest = teamWest?.players.find(
        ({ _id }) => _id === rawMatch.playerWest?._ref
      );
      const teamNorth = regularTeams.find(
        ({ team }) => rawMatch.playerNorthTeam?._ref === team._id
      );
      const playerNorth = teamNorth?.players.find(
        ({ _id }) => _id === rawMatch.playerNorth?._ref
      );

      const match: Match = {
        ...rawMatch,
        playerEast,
        playerSouth,
        playerWest,
        playerNorth,
        playerEastTeam: teamEast?.team,
        playerSouthTeam: teamSouth?.team,
        playerWestTeam: teamWest?.team,
        playerNorthTeam: teamNorth?.team,
        rounds: [],
      };

      matchesGroupedByDate[dateString].matches.push(match);
    }

    const result = Object.entries(matchesGroupedByDate).map(([key, value]) => ({
      date: key,
      ...value,
    }));

    return result;
  }
);

export type TeamPlayerDTO = {
  playerId: string;
  playerName: string;
  playerNickname: string;
  playerDesignation: string;
  playerPortraitImageUrl: string;
  playerIntroduction: string;
  playerFullname: string;
  teamId: string;
  teamName: string;
  teamSecondaryName: string;
  teamThirdName: string;
  teamFullname: string;
  color: string;
  teamLogoImageUrl: string;
  teamSlug: string;
  teamIntroduction: string;
};

export type MatchDTO = Omit<
  Match,
  | "playerEast"
  | "playerSouth"
  | "playerWest"
  | "playerNorth"
  | "playerEastTeam"
  | "playerSouthTeam"
  | "playerWestTeam"
  | "playerNorthTeam"
> & {
  playerEast: TeamPlayerDTO;
  playerSouth: TeamPlayerDTO;
  playerWest: TeamPlayerDTO;
  playerNorth: TeamPlayerDTO;
  _order: ("playerEast" | "playerSouth" | "playerWest" | "playerNorth")[];
};

export const formatTeamPlayerDTO = (
  placeholderTeam: Team | null | undefined,
  teamPlayer?: TeamPlayer | null | undefined
): TeamPlayerDTO => {
  const newTeamPlayerDTO: TeamPlayerDTO = {
    playerId: "",
    playerName: "",
    playerNickname: "",
    playerDesignation: "",
    playerPortraitImageUrl:
      "https://hkleague2025.hkmahjong.org/images/empty.png",
    playerIntroduction: "",
    playerFullname: "",
    teamId: "",
    teamName: "",
    teamSecondaryName: "",
    teamThirdName: "",
    teamFullname: "",
    color: "#000000",
    teamLogoImageUrl: "https://hkleague2025.hkmahjong.org/images/empty.png",
    teamSlug: "",
    teamIntroduction: "",
  };

  if (teamPlayer) {
    if (teamPlayer.player) {
      newTeamPlayerDTO.playerName = teamPlayer.player.name;
      newTeamPlayerDTO.playerNickname = teamPlayer.player.nickname;
      newTeamPlayerDTO.playerDesignation = teamPlayer.player.name;
      newTeamPlayerDTO.playerPortraitImageUrl = teamPlayer.player.portraitImage;
      newTeamPlayerDTO.playerIntroduction = teamPlayer.introduction;
    }

    if (teamPlayer.team) {
      newTeamPlayerDTO.teamId = teamPlayer.team._id;
      newTeamPlayerDTO.teamName = teamPlayer.team.name;
      newTeamPlayerDTO.teamSecondaryName = teamPlayer.team.secondaryName;
      newTeamPlayerDTO.teamThirdName = teamPlayer.team.thirdName;
      newTeamPlayerDTO.color = teamPlayer.team.color;
      if (teamPlayer.team.squareLogoImage) {
        newTeamPlayerDTO.teamLogoImageUrl = teamPlayer.team.squareLogoImage;
      }
      newTeamPlayerDTO.teamSlug = teamPlayer.team.slug;
      newTeamPlayerDTO.teamIntroduction = teamPlayer.team.introduction;
    }

    if (teamPlayer.overridedDesignation) {
      newTeamPlayerDTO.playerDesignation = teamPlayer.overridedDesignation;
    }
    if (teamPlayer.overridedName) {
      newTeamPlayerDTO.playerName = teamPlayer.overridedName;
    }
    if (teamPlayer.overridedNickname) {
      newTeamPlayerDTO.playerNickname = teamPlayer.overridedNickname;
    }
    if (teamPlayer.overridedColor) {
      newTeamPlayerDTO.color = teamPlayer.overridedColor;
    }
    if (teamPlayer.overridedPortraitImage) {
      newTeamPlayerDTO.playerPortraitImageUrl =
        teamPlayer.overridedPortraitImage;
    }
  } else if (placeholderTeam) {
    newTeamPlayerDTO.teamId = placeholderTeam._id;
    newTeamPlayerDTO.teamName = placeholderTeam.name;
    newTeamPlayerDTO.teamSecondaryName = placeholderTeam.secondaryName;
    newTeamPlayerDTO.teamThirdName = placeholderTeam.thirdName;
    newTeamPlayerDTO.color = placeholderTeam.color;
    if (placeholderTeam.squareLogoImage) {
      newTeamPlayerDTO.teamLogoImageUrl = placeholderTeam.squareLogoImage;
    }
    newTeamPlayerDTO.teamSlug = placeholderTeam.slug;
    newTeamPlayerDTO.teamIntroduction = placeholderTeam.introduction;
  }

  newTeamPlayerDTO.playerFullname =
    newTeamPlayerDTO.playerName +
    (newTeamPlayerDTO.playerNickname
      ? ` (${newTeamPlayerDTO.playerNickname})`
      : "");
  newTeamPlayerDTO.teamFullname = [
    newTeamPlayerDTO.teamName,
    newTeamPlayerDTO.teamSecondaryName,
    newTeamPlayerDTO.teamThirdName,
  ]
    .filter((item) => !!item)
    .join(" ");

  return newTeamPlayerDTO;
};
