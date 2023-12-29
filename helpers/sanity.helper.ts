import { createClient } from "@sanity/client";
import { cache } from "react";
import { getYoutubeThumbnailByUrl } from "./youtube.helper";
import {
  Match,
  Player,
  Team,
  TeamPlayer,
  TournamentTeam,
} from "@/types/index.type";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET_ID,
  useCdn: true,
  apiVersion: "2023-05-03",
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
});

export const getTeams = cache(() =>
  client
    .fetch(
      `*[_type == "matchTournament" && _id == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}"]{ teams[]{ _id, ranking, point, matchCount, team->{_id, "slug": slug.current, name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex, description}} }`
    )
    .then((tournaments) => tournaments[0]?.teams as TournamentTeam[])
);

export const getTeamSlugs = cache(() =>
  client
    .fetch(
      `*[_type == "matchTournament" && _id == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}"]{ teams[]{ "slug": team.slug.current } }`
    )
    .then((tournaments) =>
      (tournaments[0]?.teams as Team[]).map((team) => team.slug)
    )
);

export const getTeamDetailBySlug = cache(async (slug: string) => {
  const team = await client
    .fetch(
      `*[_type == "team" && slug.current == "${slug}"]{_id, name, description, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}`
    )
    .then((teams) => teams[0] as Team);

  if (!team) {
    return null;
  }

  const players = await client
    .fetch(
      `*[_type == "teamPlayer" && team._ref == "${team._id}"]{ team->{_id}, player->{_id, name, nickname, designation}, overridedDesignation, overridedName, overridedNickname, "overridedColor": overridedColor.hex}`
    )
    .then((teamPlayers: TeamPlayer[]) =>
      teamPlayers.map((teamPlayer) => ({
        _id: teamPlayer.player._id,
        name: teamPlayer.overridedName ?? teamPlayer.player.name,
        nickname: teamPlayer.overridedNickname ?? teamPlayer.player.nickname,
        designation:
          teamPlayer.overridedDesignation ?? teamPlayer.player.designation,
      }))
    );

  return {
    ...team,
    players,
  };
});

export const getPlayersGroupByTeams = cache(async () => {
  const teamIds = await client
    .fetch(
      `*[_type == "matchTournament" && _id == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}"]{ teams[]{ "teamId": team->_id } }`
    )
    .then(
      (tournaments) =>
        tournaments[0].teams.map(
          (team: { teamId: string }) => team.teamId
        ) as string[]
    );

  const teamPlayers = (await client.fetch(
    `*[_type == "teamPlayer" && team._ref in ${JSON.stringify(
      teamIds
    )}]{ team->{_id}, player->{_id, name, nickname, designation}, overridedDesignation, overridedName, overridedNickname, "overridedColor": overridedColor.hex}`
  )) as TeamPlayer[];

  const result: Record<string, Player[]> = {};

  for (let i = 0; i < teamPlayers.length; i++) {
    const teamPlayer = teamPlayers[i];
    if (!result[teamPlayer.team._id]) {
      result[teamPlayer.team._id] = [];
    }

    result[teamPlayer.team._id].push({
      _id: teamPlayer.player._id,
      name: teamPlayer.overridedName ?? teamPlayer.player.name,
      nickname: teamPlayer.overridedNickname ?? teamPlayer.player.nickname,
      designation:
        teamPlayer.overridedDesignation ?? teamPlayer.player.designation,
    });
  }

  return result;
});

export const getOldMatches = cache(() =>
  client
    .fetch(
      `*[_type == "match" && !(_id in path("drafts.**")) && tournament._ref == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}" && status == "completed"] | order(startAt desc)[0...8]{ _id, name, playerEast->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation}, overridedDesignation, overridedName, "overridedColor": overridedColor.hex}, playerSouth->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation}, overridedDesignation, overridedName, overridedColor}, playerWest->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation}, overridedDesignation, overridedName, overridedColor}, playerNorth->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation}, overridedDesignation, overridedName, overridedColor}, startAt, youtubeUrl, bilibiliUrl}`
    )
    .then((matches: Match[]) =>
      matches.map((match) => ({
        ...match,
        youtubeThumbnailUrl: getYoutubeThumbnailByUrl(match.youtubeUrl),
      }))
    )
);

export const getMatch = cache((matchId: string) =>
  client
    .fetch(
      `*[_type == "match" && _id == "${matchId}"]{ _id, name, playerEast->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation}, overridedDesignation, overridedName, "overridedColor": overridedColor.hex}, playerSouth->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation}, overridedDesignation, overridedName, overridedColor}, playerWest->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation}, overridedDesignation, overridedName, overridedColor}, playerNorth->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation}, overridedDesignation, overridedName, overridedColor}, startAt, youtubeUrl, bilibiliUrl, result, rounds}`
    )
    .then((matches: Match[]) => matches[0])
);

export const getMatchesGroupedByDate = cache(
  async (year: number, month: number) => {
    const playerProjection =
      '{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}}';

    const nextMonth = month === 12 ? 1 : month;
    const nextYear = month === 12 ? year + 1 : year;

    const filterStartDate = `${year}-${month
      .toString()
      .padStart(2, "0")}-01T00:00:00Z`;
    const filterEndDate = `${nextYear}-${nextMonth
      .toString()
      .padStart(2, "0")}-01T00:00:00Z`;

    const scheduledMatches = await client.fetch<Match[]>(
      `*[_type == "match" && !(_id in path("drafts.**")) && tournament._ref == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}" && startAt >= "${filterStartDate}" && startAt < "${filterEndDate}"] | order(startAt asc){ _id, name, playerEast->${playerProjection}, playerSouth->${playerProjection}, playerWest->${playerProjection}, playerNorth->${playerProjection}, startAt, youtubeUrl, bilibiliUrl, result}`
    );

    const matchesGroupedByDate: Record<
      string,
      { weekday: number; matches: Match[] }
    > = {};

    for (const match of scheduledMatches) {
      const dateString = `${match.startAt.substring(
        8,
        10
      )}/${match.startAt.substring(5, 7)}`;

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
