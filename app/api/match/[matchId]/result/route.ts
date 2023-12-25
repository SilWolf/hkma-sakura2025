import { getJsonValidator } from "@/helpers/json.helper";
import matchSchema from "./match.schema.json";
import { client } from "@/helpers/sanity.helper";

export const dynamic = "force-dynamic"; // defaults to auto

export async function PATCH(request: Request) {
  const match = await request.json();
  const jsonValidator = getJsonValidator(matchSchema);

  const validateResult = jsonValidator.validate(match);
  if (!validateResult.isValid) {
    return Response.json(
      {
        success: false,
        errors: validateResult.errors,
      },
      { status: 400 }
    );
  }

  const ref = client.patch(match._id).set(match);
  return ref
    .commit()
    .then(() => Response.json({ success: true }))
    .catch((error) =>
      Response.json({ success: false, errors: error.message }, { status: 400 })
    );
}

export async function OPTIONS() {
  return new Response();
}

type Match = {
  _id: string;
  result: MatchResult;
  rounds: MatchRound[];
};

type MatchResult = {
  playerEast: MatchResultPlayer;
  playerSouth: MatchResultPlayer;
  playerWest: MatchResultPlayer;
  playerNorth: MatchResultPlayer;
};

type MatchResultPlayer = {
  score: number;
  ranking: "1" | "2" | "3" | "4";
  point: number;
};

type MatchRound = {
  _key: string;
  code: string;
  type: "ron" | "tsumo" | "exhausted" | "hotfix";
  playerEast: MatchRoundPlayer;
  playerSouth: MatchRoundPlayer;
  playerWest: MatchRoundPlayer;
  playerNorth: MatchRoundPlayer;
};

type MatchRoundPlayer = {
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
