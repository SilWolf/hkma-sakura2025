import { createClient } from "@sanity/client";
import { cache } from "react";
import { getYoutubeThumbnailByUrl } from "./youtube.helper";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET_ID,
  useCdn: true,
  apiVersion: "2023-05-03",
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

type Match = {
  _id: string;
  name: string;
  startAt: string | null;
  youtubeUrl: string | null;
  bilibiliUrl: string | null;
  playerEast: Player;
  playerSouth: Player;
  playerWest: Player;
  playerNorth: Player;
};

type Player = {
  name: string;
  portraitImageUrl: string | null;
  team: Team;
  overridedDesignation: string | null;
  overridedName: string | null;
  overridedColor: string | null;
  overridedPortraitImage: string | null;
};

type Team = {
  slug: string;
  name: string;
  squareLogoImage: string | null;
  color: string;
};

export const getTeams = cache(() =>
  client
    .fetch(
      `*[_type == "matchTournament" && _id == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}"]{ teams[]->{"slug": slug.current, name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex} }`
    )
    .then((tournaments) =>
      (tournaments[0]?.teams as Team[]).map((team) => ({
        ...team,
        squareLogoImage: team.squareLogoImage
          ? `${team.squareLogoImage}?width=512&height=512`
          : "/images/empty.png",
      }))
    )
);

export const getOldMatches = cache(() =>
  client
    .fetch(
      `*[_type == "match" && !(_id in path("drafts.**")) && tournament._ref == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}" && status == "completed"] | order(startAt desc)[0...8]{ _id, name, playerEast->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation, "portraitImage": portraitImage.asset->url}, overridedDesignation, overridedName, "overridedColor": overridedColor.hex, "overridedPortraitImage": overridedPortraitImage.asset->url}, playerSouth->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation, "portraitImage": portraitImage.asset->url}, overridedDesignation, overridedName, overridedColor, "overridedPortraitImage": overridedPortraitImage.asset->url}, playerWest->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation, "portraitImage": portraitImage.asset->url}, overridedDesignation, overridedName, overridedColor, "overridedPortraitImage": overridedPortraitImage.asset->url}, playerNorth->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation, "portraitImage": portraitImage.asset->url}, overridedDesignation, overridedName, overridedColor, "overridedPortraitImage": overridedPortraitImage.asset->url}, startAt, youtubeUrl, bilibiliUrl}`
    )
    .then((matches: Match[]) =>
      matches.map((match) => ({
        ...match,
        youtubeThumbnailUrl: getYoutubeThumbnailByUrl(match.youtubeUrl),
      }))
    )
);
