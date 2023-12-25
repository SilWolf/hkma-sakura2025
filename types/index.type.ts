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
};

export type MatchResultPlayer = {
  score: number;
  ranking: "1" | "2" | "3" | "4";
  point: number;
};

export type TeamPlayer = {
  portraitImageUrl: string | null;
  team: Team;
  player: Player;
  overridedDesignation: string | null;
  overridedName: string | null;
  overridedColor: string | null;
  overridedPortraitImage: string | null;
};

export type Player = {
  _id: string;
  name: string;
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
};
