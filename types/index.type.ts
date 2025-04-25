export type Match = {
  _id: string;
  name: string;
  startAt: string;
  youtubeUrl?: string | null;
  bilibiliUrl?: string | null;
  playerEastTeam?: Team;
  playerEast?: Player;
  playerSouthTeam?: Team;
  playerSouth?: Player;
  playerWestTeam?: Team;
  playerWest?: Player;
  playerNorthTeam?: Team;
  playerNorth?: Player;
  result?: {
    playerEast: MatchResultPlayer;
    playerSouth: MatchResultPlayer;
    playerWest: MatchResultPlayer;
    playerNorth: MatchResultPlayer;
  };
  rounds: MatchRound[];
};

export type MatchRound = {
  _key: string;
  code: string;
  type: "ron" | "tsumo" | "exhausted" | "hotfix";
  playerEast: MatchRoundPlayer;
  playerSouth: MatchRoundPlayer;
  playerWest: MatchRoundPlayer;
  playerNorth: MatchRoundPlayer;
  tenhouReplayUrl: string | null;
};

export type MatchResultPlayer = {
  score: number;
  ranking: "1" | "2" | "3" | "4";
  point: number;
  penalty?: number;
};

export type MatchRoundPlayer = {
  position: "east" | "south" | "west" | "north";
  type: "none" | "win" | "lose";
  status: "none" | "isRiichied" | "isRevealed";
  isWaited: boolean;
  beforeScore: number;
  afterScore: number;
  dora?: number;
  redDora?: number;
  innerDora?: number;
  han?: number;
  fu?: number;
  pureScore?: number;
  yaku?: string;
};

export type RawMatch = {
  _id: string;
  name: string;
  startAt: string;
  playerEastTeam?: { _ref: string };
  playerEast?: { _ref: string };
  playerSouthTeam?: { _ref: string };
  playerSouth?: { _ref: string };
  playerWestTeam?: { _ref: string };
  playerWest?: { _ref: string };
  playerNorthTeam?: { _ref: string };
  playerNorth?: { _ref: string };
  result?: {
    playerEast: MatchResultPlayer;
    playerSouth: MatchResultPlayer;
    playerWest: MatchResultPlayer;
    playerNorth: MatchResultPlayer;
  };
  rounds: any[];
};

export type RawMatchWithRounds = RawMatch & {
  rounds: MatchRound[];
  youtubeUrl?: string;
};

export type TeamPlayer = {
  team: Team;
  player: Player;
  introduction: string;
  overridedDesignation: string | null;
  overridedName: string | null;
  overridedNickname: string | null;
  overridedColor: string | null;
  overridedPortraitImage: string | null;
};

export type Player = {
  _id: string;
  name: string;
  nickname: string;
  designation: string;
  statistic?: PlayerStatistic;
  portraitImage: string;
  introduction: string;
};

export type PlayerStatistic = {
  matchCount: number;
  roundCount: number;
  point: number;
  scoreMax: number;
  scoreMin: number;
  firstCount: number;
  secondCount: number;
  thirdCount: number;
  fourthCount: number;
  riichiCount: number;
  riichiCountWhenEast: number;
  riichiCountWhenNonEast: number;
  revealCount: number;
  revealCountWhenEast: number;
  revealCountWhenNonEast: number;
  waitingCount: number;
  ronCount: number;
  ronCountWhenEast: number;
  ronCountWhenNonEast: number;
  waitingWhenExhaustedCount: number;
  ronPureScoreAvg: number;
  ronPureScoreAvgWhenEast: number;
  ronPureScoreAvgWhenNonEast: number;
  ronHighYakuCount: number;
  chuckCount: number;
  chuckCountWhenEast: number;
  chuckCountWhenNonEast: number;
  chuckPureScoreAvg: number;
  chuckPureScoreAvgWhenEast: number;
  chuckPureScoreAvgWhenNonEast: number;
  chuckHighYakuCount: number;
  ronAfterRiichiCount: number;
  ronAfterRiichiPureScoreAvg: number;
  ronAfterRevealCount: number;
  ronAfterRevealPureScoreAvg: number;
  chuckAfterRiichiCount: number;
  chuckAfterRiichiPureScoreAvg: number;
  chuckAfterRevealCount: number;
  chuckAfterRevealPureScoreAvg: number;

  pointRanking: number;
  nonFourthP: number;
  nonFourthPRanking: number;
  firstAndSecondP: number;
  firstAndSecondPRanking: number;
  riichiP: number;
  riichiPRanking: number;
  ronP: number;
  ronPRanking: number;
  chuckP: number;
  chuckPRanking: number;
  revealP: number;
  revealPRanking: number;
  ronPureScoreAvgRanking: number;
  chuckPureScoreAvgRanking: number;
};

export type Team = {
  _id: string;
  slug: string;
  name: string;
  secondaryName: string;
  thirdName: string;
  squareLogoImage: string | null;
  color: string;
  introduction: string;
};

export type TournamentTeam = {
  _key: string;
  ref: Team;
  overrided: Team;
  players: {
    _key: string;
    ref: Player;
    overrided: Player;
  }[];

  statistics?: {
    ranking: number;
    point: number;
    matchCount: number;
    firstP: number;
    secondP: number;
    thirdP: number;
    fourthP: number;
    rankingAvg: number;
    pointAvg: number;
    ronP: number;
    chuckP: number;
    riichiP: number;
    revealP: number;
  };
};

export type TournamentTeamWithPlayers = TournamentTeam & {
  players: {
    ref: Player;
    overrided: Player;
  }[];
};
