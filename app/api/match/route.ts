import { client } from "@/helpers/sanity.helper";
import { getYoutubeThumbnailByUrl } from "@/helpers/youtube.helper";
import { Match } from "@/types/index.type";

export async function GET() {
  const oldMatches = await client
    .fetch(
      `*[_type == "match" && !(_id in path("drafts.**")) && tournament._ref == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}" && defined(result.playerEast.score)] | order(startAt desc){ _id, name, playerEast->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation, "portraitImage": portraitImage.asset->url}, overridedDesignation, overridedName, "overridedColor": overridedColor.hex, "overridedPortraitImage": overridedPortraitImage.asset->url}, playerSouth->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation, "portraitImage": portraitImage.asset->url}, overridedDesignation, overridedName, overridedColor, "overridedPortraitImage": overridedPortraitImage.asset->url}, playerWest->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation, "portraitImage": portraitImage.asset->url}, overridedDesignation, overridedName, overridedColor, "overridedPortraitImage": overridedPortraitImage.asset->url}, playerNorth->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation, "portraitImage": portraitImage.asset->url}, overridedDesignation, overridedName, overridedColor, "overridedPortraitImage": overridedPortraitImage.asset->url}, startAt, youtubeUrl, bilibiliUrl, result}`
    )
    .then((matches: Match[]) =>
      matches.map((match) => ({
        ...match,
        youtubeThumbnailUrl: getYoutubeThumbnailByUrl(match.youtubeUrl),
      }))
    );

  return Response.json(oldMatches);
}
