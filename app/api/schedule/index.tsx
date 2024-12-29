import {
  MatchDTO,
  TeamPlayerDTO,
  getMatchesGroupedByStageAndDate,
} from "@/helpers/sanity.helper";

export type MatchDTOForSocial = Pick<MatchDTO, "name"> & {
  playerEast: Pick<
    TeamPlayerDTO,
    | "teamId"
    | "teamName"
    | "teamSecondaryName"
    | "teamThirdName"
    | "teamLogoImageUrl"
    | "color"
  > & {
    playerFullnames: TeamPlayerDTO["playerFullname"][];
  };
  playerSouth: Pick<
    TeamPlayerDTO,
    | "teamId"
    | "teamName"
    | "teamSecondaryName"
    | "teamThirdName"
    | "teamLogoImageUrl"
    | "color"
  > & {
    playerFullnames: TeamPlayerDTO["playerFullname"][];
  };
  playerWest: Pick<
    TeamPlayerDTO,
    | "teamId"
    | "teamName"
    | "teamSecondaryName"
    | "teamThirdName"
    | "teamLogoImageUrl"
    | "color"
  > & {
    playerFullnames: TeamPlayerDTO["playerFullname"][];
  };
  playerNorth: Pick<
    TeamPlayerDTO,
    | "teamId"
    | "teamName"
    | "teamSecondaryName"
    | "teamThirdName"
    | "teamLogoImageUrl"
    | "color"
  > & {
    playerFullnames: TeamPlayerDTO["playerFullname"][];
  };
};

export const getMatchByDateAndIndex = async (date: string, index: string) => {
  if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new Error("date must be in YYYY-MM-DD format");
  }

  const result = await getMatchesGroupedByStageAndDate(
    "regulars",
    `${date}T00:00:00+08:00`,
    `${date}T23:59:59+08:00`,
    { withPlayerDetails: true }
  ).then((value) => value[0]);

  if (!result) {
    throw new Error(`there is no match on ${date}`);
  }

  const distinguishedMatches: MatchDTOForSocial[] = [];

  for (const match of result.matches) {
    let foundIndex = distinguishedMatches.findIndex(
      (oldMatch) =>
        oldMatch.playerEast.teamId === match[match._order[0]].teamId &&
        oldMatch.playerSouth.teamId === match[match._order[1]].teamId &&
        oldMatch.playerWest.teamId === match[match._order[2]].teamId &&
        oldMatch.playerNorth.teamId === match[match._order[3]].teamId
    );

    if (foundIndex === -1) {
      distinguishedMatches.push({
        name: date,
        playerEast: {
          teamId: match[match._order[0]].teamId,
          teamName: match[match._order[0]].teamName,
          teamSecondaryName: match[match._order[0]].teamSecondaryName,
          teamThirdName: match[match._order[0]].teamThirdName,
          teamLogoImageUrl: match[match._order[0]].teamLogoImageUrl,
          color: match[match._order[0]].color,
          playerFullnames: [match[match._order[0]].playerFullname],
        },
        playerSouth: {
          teamId: match[match._order[1]].teamId,
          teamName: match[match._order[1]].teamName,
          teamSecondaryName: match[match._order[1]].teamSecondaryName,
          teamThirdName: match[match._order[1]].teamThirdName,
          teamLogoImageUrl: match[match._order[1]].teamLogoImageUrl,
          color: match[match._order[1]].color,
          playerFullnames: [match[match._order[1]].playerFullname],
        },
        playerWest: {
          teamId: match[match._order[2]].teamId,
          teamName: match[match._order[2]].teamName,
          teamSecondaryName: match[match._order[2]].teamSecondaryName,
          teamThirdName: match[match._order[2]].teamThirdName,
          teamLogoImageUrl: match[match._order[2]].teamLogoImageUrl,
          color: match[match._order[2]].color,
          playerFullnames: [match[match._order[2]].playerFullname],
        },
        playerNorth: {
          teamId: match[match._order[3]].teamId,
          teamName: match[match._order[3]].teamName,
          teamSecondaryName: match[match._order[3]].teamSecondaryName,
          teamThirdName: match[match._order[3]].teamThirdName,
          teamLogoImageUrl: match[match._order[3]].teamLogoImageUrl,
          color: match[match._order[3]].color,
          playerFullnames: [match[match._order[3]].playerFullname],
        },
      });
    } else {
      if (
        distinguishedMatches[foundIndex].playerEast.playerFullnames.indexOf(
          match[match._order[0]].playerFullname
        ) === -1
      ) {
        distinguishedMatches[foundIndex].playerEast.playerFullnames.push(
          match[match._order[0]].playerFullname
        );
      }

      if (
        distinguishedMatches[foundIndex].playerSouth.playerFullnames.indexOf(
          match[match._order[1]].playerFullname
        ) === -1
      ) {
        distinguishedMatches[foundIndex].playerSouth.playerFullnames.push(
          match[match._order[1]].playerFullname
        );
      }

      if (
        distinguishedMatches[foundIndex].playerWest.playerFullnames.indexOf(
          match[match._order[2]].playerFullname
        ) === -1
      ) {
        distinguishedMatches[foundIndex].playerWest.playerFullnames.push(
          match[match._order[2]].playerFullname
        );
      }

      if (
        distinguishedMatches[foundIndex].playerNorth.playerFullnames.indexOf(
          match[match._order[3]].playerFullname
        ) === -1
      ) {
        distinguishedMatches[foundIndex].playerNorth.playerFullnames.push(
          match[match._order[3]].playerFullname
        );
      }
    }
  }

  const match = distinguishedMatches[(parseInt(index) || 1) - 1];

  return match;
};

export const getMatchByWeek = async (week: number) => {
  const startDate = new Date("2025-01-09T00:00:00+08:00");
  startDate.setDate(startDate.getDate() + (week - 1) * 7);

  const endDate = new Date("2025-01-12T23:59:59+08:00");
  endDate.setDate(endDate.getDate() + (week - 1) * 7);

  const result = await getMatchesGroupedByStageAndDate(
    "regulars",
    startDate.toISOString(),
    endDate.toISOString(),
    { withPlayerDetails: true }
  );

  if (!result) {
    throw new Error(`there is no match between ${startDate} and ${endDate}`);
  }

  return result;
};
