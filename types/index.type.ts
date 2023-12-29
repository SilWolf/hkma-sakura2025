export type Match = {
  _id: string;
  name: string;
  startAt: string | null;
  youtubeUrl: string | null;
  bilibiliUrl: string | null;
  playerEast: TeamPlayer;
  playerSouth: TeamPlayer;
  playerWest: TeamPlayer;
  playerNorth: TeamPlayer;
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
  portraitImageUrl: string | null;
  team: Team;
  player: Player;
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
  portraitImage: string;
};

export type Team = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  squareLogoImage: string | null;
  color: string;
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
