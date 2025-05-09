import { playerSchema } from "@/adapters/sanity/sanity.zod";
import * as zod from "zod";

const v2MatchResultOfPlayer = zod.object({
  ranking: zod.string(),
  point: zod.number(),
  score: zod.number(),
  penalty: zod.number().optional(),
  penaltyReason: zod.string().optional(),
});

export const v2MatchPlayerSchema = zod.object({
  id: zod.string(),
  teamId: zod.string().optional(),
  name: zod.object({
    official: zod.object({
      primary: zod.string(),
      secondary: zod.string().optional(),
      third: zod.string().optional(),
    }),
    display: zod.object({
      primary: zod.string(),
      secondary: zod.string().optional(),
      third: zod.string().optional(),
    }),
  }),
  color: zod.object({
    primary: zod.string().regex(/^#[0-9A-F]{6}$/i, "顏色必須是 #ABCDEF 格式。"),
    secondary: zod
      .string()
      .regex(/^#[0-9A-F]{6}$/i, "顏色必須是 #ABCDEF 格式。"),
  }),
  image: zod.object({
    portrait: zod
      .object({
        default: zod.object({ url: zod.string().url("玩家圖片必須是URL。") }),
      })
      .optional(),
    portraitAlt: zod
      .object({
        default: zod.object({ url: zod.string().url("玩家圖片必須是URL。") }),
      })
      .optional(),
    fullBody: zod
      .object({
        default: zod.object({ url: zod.string().url("玩家圖片必須是URL。") }),
      })
      .optional(),
    fullBodyAlt: zod
      .object({
        default: zod.object({ url: zod.string().url("玩家圖片必須是URL。") }),
      })
      .optional(),
    riichi: zod
      .object({
        default: zod.object({ url: zod.string().url("玩家圖片必須是URL。") }),
      })
      .optional(),
    logo: zod
      .object({
        default: zod.object({ url: zod.string().url("玩家圖片必須是URL。") }),
      })
      .optional(),
  }),
  statistics: playerSchema.shape.statistics.unwrap().element.nullish(),
});

export const v2MatchSchema = zod.object({
  schemaVersion: zod.string(),
  code: zod.string(),
  data: zod.object({
    name: zod.string({ required_error: "對局必須有名稱" }),
    startAt: zod.string(),
    remark: zod.string().optional(),
    players: zod.array(v2MatchPlayerSchema),
    rulesetRef: zod.string(),
  }),
  metadata: zod.object({
    createdAt: zod.string().datetime(),
    updatedAt: zod.string().datetime(),
    databaseId: zod.string().optional(),
  }),
  result: zod
    .object({
      playerEast: v2MatchResultOfPlayer,
      playerSouth: v2MatchResultOfPlayer,
      playerWest: v2MatchResultOfPlayer,
      playerNorth: v2MatchResultOfPlayer,
    })
    .nullish(),
});

export type V2MatchPlayer = zod.infer<typeof v2MatchPlayerSchema>;
export type V2Match = zod.infer<typeof v2MatchSchema>;
