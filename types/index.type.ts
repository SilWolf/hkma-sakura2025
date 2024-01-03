export type Match = {
  _id: string;
  name: string;
  startAt: string;
  youtubeUrl?: string | null;
  bilibiliUrl?: string | null;
  playerEastTeam?: Team;
  playerEast?: TeamPlayer;
  playerSouthTeam?: Team;
  playerSouth?: TeamPlayer;
  playerWestTeam?: Team;
  playerWest?: TeamPlayer;
  playerNorthTeam?: Team;
  playerNorth?: TeamPlayer;
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
};

export type MatchResultPlayer = {
  score: number;
  ranking: "1" | "2" | "3" | "4";
  point: number;
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

export type TeamPlayer = {
  team: Team;
  player: Player;
  introduction: string;
  overridedDesignation: string | null;
  overridedName: string | null;
  overridedNickname: string | null;
  overridedColor: string | null;
};

export type Player = {
  _id: string;
  name: string;
  nickname: string;
  designation: string;
};

export type Team = {
  _id: string;
  slug: string;
  name: string;
  squareLogoImage: string | null;
  color: string;
  introduction: string;
};

export type TournamentTeam = {
  _key: string;
  team: Team;
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
