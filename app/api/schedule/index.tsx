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

export const getMatchesByDate = async (date: string) => {
  if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new Error("date must be in YYYY-MM-DD format");
  }

  return getMatchesGroupedByStageAndDate(
    "regulars",
    `${date}T00:00:00+08:00`,
    `${date}T23:59:59+08:00`,
    { withPlayerDetails: true }
  ).then((value) => value[0].matches);
};

export const getMatchByDateAndIndex = async (date: string, index = 1) => {
  if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new Error("date must be in YYYY-MM-DD format");
  }

  return getMatchesGroupedByStageAndDate(
    "regulars",
    `${date}T00:00:00+08:00`,
    `${date}T23:59:59+08:00`,
    { withPlayerDetails: true }
  ).then((value) => value[0].matches[index - 1]);
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
