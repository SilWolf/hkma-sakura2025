// Generated by ts-to-zod
import { z } from "zod";

export const sanityImagePaletteSwatchSchema = z.object({
  _type: z.literal("sanity.imagePaletteSwatch"),
  background: z.string().optional(),
  foreground: z.string().optional(),
  population: z.number().optional(),
  title: z.string().optional(),
});

export const sanityImagePaletteSchema = z.object({
  _type: z.literal("sanity.imagePalette"),
  darkMuted: sanityImagePaletteSwatchSchema.optional(),
  lightVibrant: sanityImagePaletteSwatchSchema.optional(),
  darkVibrant: sanityImagePaletteSwatchSchema.optional(),
  vibrant: sanityImagePaletteSwatchSchema.optional(),
  dominant: sanityImagePaletteSwatchSchema.optional(),
  lightMuted: sanityImagePaletteSwatchSchema.optional(),
  muted: sanityImagePaletteSwatchSchema.optional(),
});

export const sanityImageDimensionsSchema = z.object({
  _type: z.literal("sanity.imageDimensions"),
  height: z.number().optional(),
  width: z.number().optional(),
  aspectRatio: z.number().optional(),
});

export const sanityAssetSourceDataSchema = z.object({
  _type: z.literal("sanity.assetSourceData"),
  name: z.string().optional(),
  id: z.string().optional(),
  url: z.string().optional(),
});

export const geopointSchema = z.object({
  _type: z.literal("geopoint"),
  lat: z.number().optional(),
  lng: z.number().optional(),
  alt: z.number().optional(),
});

export const matchSchema = z.object({
  _id: z.string(),
  _type: z.literal("match"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  tournament: z
    .object({
      _ref: z.string(),
      _type: z.literal("reference"),
      _weak: z.boolean().optional(),
    })
    .optional(),
  name: z.string().optional(),
  playerEastTeam: z
    .object({
      _ref: z.string(),
      _type: z.literal("reference"),
      _weak: z.boolean().optional(),
    })
    .optional(),
  playerEast: z
    .object({
      _ref: z.string(),
      _type: z.literal("reference"),
      _weak: z.boolean().optional(),
    })
    .optional(),
  playerSouthTeam: z
    .object({
      _ref: z.string(),
      _type: z.literal("reference"),
      _weak: z.boolean().optional(),
    })
    .optional(),
  playerSouth: z
    .object({
      _ref: z.string(),
      _type: z.literal("reference"),
      _weak: z.boolean().optional(),
    })
    .optional(),
  playerWestTeam: z
    .object({
      _ref: z.string(),
      _type: z.literal("reference"),
      _weak: z.boolean().optional(),
    })
    .optional(),
  playerWest: z
    .object({
      _ref: z.string(),
      _type: z.literal("reference"),
      _weak: z.boolean().optional(),
    })
    .optional(),
  playerNorthTeam: z
    .object({
      _ref: z.string(),
      _type: z.literal("reference"),
      _weak: z.boolean().optional(),
    })
    .optional(),
  playerNorth: z
    .object({
      _ref: z.string(),
      _type: z.literal("reference"),
      _weak: z.boolean().optional(),
    })
    .optional(),
  startAt: z.string(),
  status: z
    .union([z.literal("initialized"), z.literal("completed")])
    .optional(),
  youtubeUrl: z.string().optional(),
  bilibiliUrl: z.string().optional(),
  result: z
    .object({
      playerEast: z.object({
        score: z.number(),
        ranking: z.union([
          z.literal("1"),
          z.literal("2"),
          z.literal("3"),
          z.literal("4"),
        ]),
        point: z.number(),
        penalty: z.number().optional(),
        penaltyReason: z.string().optional(),
      }),
      playerSouth: z.object({
        score: z.number(),
        ranking: z.union([
          z.literal("1"),
          z.literal("2"),
          z.literal("3"),
          z.literal("4"),
        ]),
        point: z.number(),
        penalty: z.number().optional(),
        penaltyReason: z.string().optional(),
      }),
      playerWest: z.object({
        score: z.number(),
        ranking: z.union([
          z.literal("1"),
          z.literal("2"),
          z.literal("3"),
          z.literal("4"),
        ]),
        point: z.number(),
        penalty: z.number().optional(),
        penaltyReason: z.string().optional(),
      }),
      playerNorth: z.object({
        score: z.number(),
        ranking: z.union([
          z.literal("1"),
          z.literal("2"),
          z.literal("3"),
          z.literal("4"),
        ]),
        point: z.number(),
        penalty: z.number().optional(),
        penaltyReason: z.string().optional(),
      }),
    })
    .optional(),
  rounds: z
    .array(
      z.object({
        code: z.string(),
        type: z.union([
          z.literal("unknown"),
          z.literal("ron"),
          z.literal("tsumo"),
          z.literal("exhausted"),
          z.literal("hotfix"),
        ]),
        playerEast: z.object({
          position: z
            .union([
              z.literal("east"),
              z.literal("south"),
              z.literal("west"),
              z.literal("north"),
            ])
            .optional(),
          status: z
            .union([
              z.literal("none"),
              z.literal("isRiichied"),
              z.literal("isRevealed"),
            ])
            .optional(),
          isWaited: z.boolean().optional(),
          type: z.union([
            z.literal("none"),
            z.literal("win"),
            z.literal("lose"),
          ]),
          beforeScore: z.number(),
          afterScore: z.number(),
          dora: z.number().optional(),
          redDora: z.number().optional(),
          innerDora: z.number().optional(),
          han: z.number().optional(),
          fu: z.number().optional(),
          pureScore: z.number().optional(),
          yaku: z.string().optional(),
        }),
        playerSouth: z.object({
          position: z
            .union([
              z.literal("east"),
              z.literal("south"),
              z.literal("west"),
              z.literal("north"),
            ])
            .optional(),
          status: z
            .union([
              z.literal("none"),
              z.literal("isRiichied"),
              z.literal("isRevealed"),
            ])
            .optional(),
          isWaited: z.boolean().optional(),
          type: z.union([
            z.literal("none"),
            z.literal("win"),
            z.literal("lose"),
          ]),
          beforeScore: z.number(),
          afterScore: z.number(),
          dora: z.number().optional(),
          redDora: z.number().optional(),
          innerDora: z.number().optional(),
          han: z.number().optional(),
          fu: z.number().optional(),
          pureScore: z.number().optional(),
          yaku: z.string().optional(),
        }),
        playerWest: z.object({
          position: z
            .union([
              z.literal("east"),
              z.literal("south"),
              z.literal("west"),
              z.literal("north"),
            ])
            .optional(),
          status: z
            .union([
              z.literal("none"),
              z.literal("isRiichied"),
              z.literal("isRevealed"),
            ])
            .optional(),
          isWaited: z.boolean().optional(),
          type: z.union([
            z.literal("none"),
            z.literal("win"),
            z.literal("lose"),
          ]),
          beforeScore: z.number(),
          afterScore: z.number(),
          dora: z.number().optional(),
          redDora: z.number().optional(),
          innerDora: z.number().optional(),
          han: z.number().optional(),
          fu: z.number().optional(),
          pureScore: z.number().optional(),
          yaku: z.string().optional(),
        }),
        playerNorth: z.object({
          position: z
            .union([
              z.literal("east"),
              z.literal("south"),
              z.literal("west"),
              z.literal("north"),
            ])
            .optional(),
          status: z
            .union([
              z.literal("none"),
              z.literal("isRiichied"),
              z.literal("isRevealed"),
            ])
            .optional(),
          isWaited: z.boolean().optional(),
          type: z.union([
            z.literal("none"),
            z.literal("win"),
            z.literal("lose"),
          ]),
          beforeScore: z.number(),
          afterScore: z.number(),
          dora: z.number().optional(),
          redDora: z.number().optional(),
          innerDora: z.number().optional(),
          han: z.number().optional(),
          fu: z.number().optional(),
          pureScore: z.number().optional(),
          yaku: z.string().optional(),
        }),
        tenhouReplayUrl: z.string().optional(),
        _key: z.string(),
      })
    )
    .optional(),
});

export const sanityImageHotspotSchema = z.object({
  _type: z.literal("sanity.imageHotspot"),
  x: z.number().optional(),
  y: z.number().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
});

export const sanityImageCropSchema = z.object({
  _type: z.literal("sanity.imageCrop"),
  top: z.number().optional(),
  bottom: z.number().optional(),
  left: z.number().optional(),
  right: z.number().optional(),
});

export const playerSchema = z.object({
  _id: z.string(),
  _type: z.literal("player"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  name: z.string().optional(),
  portraitImage: z
    .object({
      asset: z
        .object({
          _ref: z.string(),
          _type: z.literal("reference"),
          _weak: z.boolean().optional(),
        })
        .optional(),
      hotspot: sanityImageHotspotSchema.optional(),
      crop: sanityImageCropSchema.optional(),
      _type: z.literal("image"),
    })
    .optional(),
  portraitAltImage: z
    .object({
      asset: z
        .object({
          _ref: z.string(),
          _type: z.literal("reference"),
          _weak: z.boolean().optional(),
        })
        .optional(),
      hotspot: sanityImageHotspotSchema.optional(),
      crop: sanityImageCropSchema.optional(),
      _type: z.literal("image"),
    })
    .optional(),
  fullBodyImage: z
    .object({
      asset: z
        .object({
          _ref: z.string(),
          _type: z.literal("reference"),
          _weak: z.boolean().optional(),
        })
        .optional(),
      hotspot: sanityImageHotspotSchema.optional(),
      crop: sanityImageCropSchema.optional(),
      _type: z.literal("image"),
    })
    .optional(),
  fullBodyAltImage: z
    .object({
      asset: z
        .object({
          _ref: z.string(),
          _type: z.literal("reference"),
          _weak: z.boolean().optional(),
        })
        .optional(),
      hotspot: sanityImageHotspotSchema.optional(),
      crop: sanityImageCropSchema.optional(),
      _type: z.literal("image"),
    })
    .optional(),
  riichiImage: z
    .object({
      asset: z
        .object({
          _ref: z.string(),
          _type: z.literal("reference"),
          _weak: z.boolean().optional(),
        })
        .optional(),
      hotspot: sanityImageHotspotSchema.optional(),
      crop: sanityImageCropSchema.optional(),
      _type: z.literal("image"),
    })
    .optional(),
  designation: z.string().optional(),
  nickname: z.string().optional(),
  introduction: z.string().optional(),
  statistics: z
    .array(
      z.object({
        tournament: z
          .object({
            _ref: z.string(),
            _type: z.literal("reference"),
            _weak: z.boolean().optional(),
          })
          .optional(),
        matchCount: z.number().optional(),
        roundCount: z.number().optional(),
        point: z.number().optional(),
        scoreMax: z.number().optional(),
        scoreMin: z.number().optional(),
        firstCount: z.number().optional(),
        secondCount: z.number().optional(),
        thirdCount: z.number().optional(),
        fourthCount: z.number().optional(),
        riichiCount: z.number().optional(),
        riichiCountWhenEast: z.number().optional(),
        riichiCountWhenNonEast: z.number().optional(),
        revealCount: z.number().optional(),
        revealCountWhenEast: z.number().optional(),
        revealCountWhenNonEast: z.number().optional(),
        waitingCount: z.number().optional(),
        ronCount: z.number().optional(),
        ronCountWhenEast: z.number().optional(),
        ronCountWhenNonEast: z.number().optional(),
        waitingWhenExhaustedCount: z.number().optional(),
        ronPureScoreAvg: z.number().optional(),
        ronPureScoreAvgWhenEast: z.number().optional(),
        ronPureScoreAvgWhenNonEast: z.number().optional(),
        ronHighYakuCount: z.number().optional(),
        chuckCount: z.number().optional(),
        chuckCountWhenEast: z.number().optional(),
        chuckCountWhenNonEast: z.number().optional(),
        chuckPureScoreAvg: z.number().optional(),
        chuckPureScoreAvgWhenEast: z.number().optional(),
        chuckPureScoreAvgWhenNonEast: z.number().optional(),
        chuckHighYakuCount: z.number().optional(),
        ronAfterRiichiCount: z.number().optional(),
        ronAfterRiichiPureScoreAvg: z.number().optional(),
        ronAfterRevealCount: z.number().optional(),
        ronAfterRevealPureScoreAvg: z.number().optional(),
        chuckAfterRiichiCount: z.number().optional(),
        chuckAfterRiichiPureScoreAvg: z.number().optional(),
        chuckAfterRevealCount: z.number().optional(),
        chuckAfterRevealPureScoreAvg: z.number().optional(),
        pointRanking: z.number().optional(),
        nonFourthP: z.number().optional(),
        nonFourthPRanking: z.number().optional(),
        firstAndSecondP: z.number().optional(),
        firstAndSecondPRanking: z.number().optional(),
        riichiP: z.number().optional(),
        riichiPRanking: z.number().optional(),
        ronP: z.number().optional(),
        ronPRanking: z.number().optional(),
        chuckP: z.number().optional(),
        chuckPRanking: z.number().optional(),
        revealP: z.number().optional(),
        revealPRanking: z.number().optional(),
        ronPureScoreAvgRanking: z.number().optional(),
        chuckPureScoreAvgRanking: z.number().optional(),
        _key: z.string(),
      })
    )
    .optional(),
});

export const slugSchema = z.object({
  _type: z.literal("slug"),
  current: z.string().optional(),
  source: z.string().optional(),
});

export const sanityImageMetadataSchema = z.object({
  _type: z.literal("sanity.imageMetadata"),
  location: geopointSchema.optional(),
  dimensions: sanityImageDimensionsSchema.optional(),
  palette: sanityImagePaletteSchema.optional(),
  lqip: z.string().optional(),
  blurHash: z.string().optional(),
  hasAlpha: z.boolean().optional(),
  isOpaque: z.boolean().optional(),
});

export const hslaColorSchema = z.object({
  _type: z.literal("hslaColor"),
  h: z.number().optional(),
  s: z.number().optional(),
  l: z.number().optional(),
  a: z.number().optional(),
});

export const hsvaColorSchema = z.object({
  _type: z.literal("hsvaColor"),
  h: z.number().optional(),
  s: z.number().optional(),
  v: z.number().optional(),
  a: z.number().optional(),
});

export const rgbaColorSchema = z.object({
  _type: z.literal("rgbaColor"),
  r: z.number().optional(),
  g: z.number().optional(),
  b: z.number().optional(),
  a: z.number().optional(),
});

export const sanityFileAssetSchema = z.object({
  _id: z.string(),
  _type: z.literal("sanity.fileAsset"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  originalFilename: z.string().optional(),
  label: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  altText: z.string().optional(),
  sha1hash: z.string().optional(),
  extension: z.string().optional(),
  mimeType: z.string().optional(),
  size: z.number().optional(),
  assetId: z.string().optional(),
  uploadId: z.string().optional(),
  path: z.string().optional(),
  url: z.string().optional(),
  source: sanityAssetSourceDataSchema.optional(),
});

export const sanityImageAssetSchema = z.object({
  _id: z.string(),
  _type: z.literal("sanity.imageAsset"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  originalFilename: z.string().optional(),
  label: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  altText: z.string().optional(),
  sha1hash: z.string().optional(),
  extension: z.string().optional(),
  mimeType: z.string().optional(),
  size: z.number().optional(),
  assetId: z.string().optional(),
  uploadId: z.string().optional(),
  path: z.string().optional(),
  url: z.string().optional(),
  metadata: sanityImageMetadataSchema.optional(),
  source: sanityAssetSourceDataSchema.optional(),
});

export const colorSchema = z.object({
  _type: z.literal("color"),
  hex: z.string().optional(),
  alpha: z.number().optional(),
  hsl: hslaColorSchema.optional(),
  hsv: hsvaColorSchema.optional(),
  rgb: rgbaColorSchema.optional(),
});

export const teamPlayerSchema = z.object({
  _id: z.string(),
  _type: z.literal("teamPlayer"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  team: z
    .object({
      _ref: z.string(),
      _type: z.literal("reference"),
      _weak: z.boolean().optional(),
    })
    .optional(),
  player: z
    .object({
      _ref: z.string(),
      _type: z.literal("reference"),
      _weak: z.boolean().optional(),
    })
    .optional(),
  introduction: z.string().optional(),
  overridedDesignation: z.string().optional(),
  overridedName: z.string().optional(),
  overridedColor: colorSchema.optional(),
  overridedPortraitImage: z
    .object({
      asset: z
        .object({
          _ref: z.string(),
          _type: z.literal("reference"),
          _weak: z.boolean().optional(),
        })
        .optional(),
      hotspot: sanityImageHotspotSchema.optional(),
      crop: sanityImageCropSchema.optional(),
      _type: z.literal("image"),
    })
    .optional(),
  overridedNickname: z.string().optional(),
  isHideNickname: z.boolean().optional(),
});

export const matchTournamentSchema = z.object({
  _id: z.string(),
  _type: z.literal("matchTournament"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  name: z.string().optional(),
  logo: z
    .object({
      asset: z
        .object({
          _ref: z.string(),
          _type: z.literal("reference"),
          _weak: z.boolean().optional(),
        })
        .optional(),
      hotspot: sanityImageHotspotSchema.optional(),
      crop: sanityImageCropSchema.optional(),
      _type: z.literal("image"),
    })
    .optional(),
  rulesetId: z.string().optional(),
  themeId: z.string().optional(),
  startingScore: z
    .union([
      z.literal("25000"),
      z.literal("30000"),
      z.literal("35000"),
      z.literal("50000"),
      z.literal("100000"),
    ])
    .optional(),
  isManganRoundUp: z.boolean().optional(),
  yakuMax: z.union([z.literal("12"), z.literal("13")]).optional(),
  yakumanMax: z
    .union([
      z.literal("13"),
      z.literal("26"),
      z.literal("39"),
      z.literal("130"),
    ])
    .optional(),
  teams: z
    .array(
      z.object({
        ref: z
          .object({
            _ref: z.string(),
            _type: z.literal("reference"),
            _weak: z.boolean().optional(),
          })
          .optional(),
        players: z
          .array(
            z.object({
              ref: z
                .object({
                  _ref: z.string(),
                  _type: z.literal("reference"),
                  _weak: z.boolean().optional(),
                })
                .optional(),
              overrided: z
                .object({
                  name: z.string().optional(),
                  portraitImage: z
                    .object({
                      asset: z
                        .object({
                          _ref: z.string(),
                          _type: z.literal("reference"),
                          _weak: z.boolean().optional(),
                        })
                        .optional(),
                      hotspot: sanityImageHotspotSchema.optional(),
                      crop: sanityImageCropSchema.optional(),
                      _type: z.literal("image"),
                    })
                    .optional(),
                  portraitAltImage: z
                    .object({
                      asset: z
                        .object({
                          _ref: z.string(),
                          _type: z.literal("reference"),
                          _weak: z.boolean().optional(),
                        })
                        .optional(),
                      hotspot: sanityImageHotspotSchema.optional(),
                      crop: sanityImageCropSchema.optional(),
                      _type: z.literal("image"),
                    })
                    .optional(),
                  fullBodyImage: z
                    .object({
                      asset: z
                        .object({
                          _ref: z.string(),
                          _type: z.literal("reference"),
                          _weak: z.boolean().optional(),
                        })
                        .optional(),
                      hotspot: sanityImageHotspotSchema.optional(),
                      crop: sanityImageCropSchema.optional(),
                      _type: z.literal("image"),
                    })
                    .optional(),
                  fullBodyAltImage: z
                    .object({
                      asset: z
                        .object({
                          _ref: z.string(),
                          _type: z.literal("reference"),
                          _weak: z.boolean().optional(),
                        })
                        .optional(),
                      hotspot: sanityImageHotspotSchema.optional(),
                      crop: sanityImageCropSchema.optional(),
                      _type: z.literal("image"),
                    })
                    .optional(),
                  riichiImage: z
                    .object({
                      asset: z
                        .object({
                          _ref: z.string(),
                          _type: z.literal("reference"),
                          _weak: z.boolean().optional(),
                        })
                        .optional(),
                      hotspot: sanityImageHotspotSchema.optional(),
                      crop: sanityImageCropSchema.optional(),
                      _type: z.literal("image"),
                    })
                    .optional(),
                  designation: z.string().optional(),
                  nickname: z.string().optional(),
                  introduction: z.string().optional(),
                })
                .optional(),
              _key: z.string(),
            })
          )
          .optional(),
        overrided: z
          .object({
            name: z.string().optional(),
            secondaryName: z.string().optional(),
            thirdName: z.string().optional(),
            preferredName: z.string().optional(),
            symbol: z.string().optional(),
            squareLogoImage: z
              .object({
                asset: z
                  .object({
                    _ref: z.string(),
                    _type: z.literal("reference"),
                    _weak: z.boolean().optional(),
                  })
                  .optional(),
                hotspot: sanityImageHotspotSchema.optional(),
                crop: sanityImageCropSchema.optional(),
                _type: z.literal("image"),
              })
              .optional(),
            color: colorSchema.optional(),
            introduction: z.string().optional(),
            slug: slugSchema.optional(),
          })
          .optional(),
        statistics: z
          .object({
            matchCount: z.number().optional(),
            ranking: z.number().optional(),
            initialPoint: z.number().optional(),
            point: z.number().optional(),
            rankingHistories: z.array(z.number()).optional(),
            pointHistories: z.array(z.number()).optional(),
          })
          .optional(),
        _key: z.string(),
      })
    )
    .optional(),
});

export const teamSchema = z.object({
  _id: z.string(),
  _type: z.literal("team"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  name: z.string().optional(),
  secondaryName: z.string().optional(),
  thirdName: z.string().optional(),
  preferredName: z.string().optional(),
  symbol: z.string().optional(),
  squareLogoImage: z
    .object({
      asset: z
        .object({
          _ref: z.string(),
          _type: z.literal("reference"),
          _weak: z.boolean().optional(),
        })
        .optional(),
      hotspot: sanityImageHotspotSchema.optional(),
      crop: sanityImageCropSchema.optional(),
      _type: z.literal("image"),
    })
    .optional(),
  color: colorSchema.optional(),
  introduction: z.string().optional(),
  slug: slugSchema.optional(),
});

export const allSanitySchemaTypesSchema = z.union([
  sanityImagePaletteSwatchSchema,
  sanityImagePaletteSchema,
  sanityImageDimensionsSchema,
  sanityFileAssetSchema,
  geopointSchema,
  matchSchema,
  teamPlayerSchema,
  playerSchema,
  matchTournamentSchema,
  teamSchema,
  slugSchema,
  sanityImageCropSchema,
  sanityImageHotspotSchema,
  sanityImageAssetSchema,
  sanityAssetSourceDataSchema,
  sanityImageMetadataSchema,
  colorSchema,
  rgbaColorSchema,
  hsvaColorSchema,
  hslaColorSchema,
]);
