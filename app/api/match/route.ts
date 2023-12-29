import { client } from "@/helpers/sanity.helper";
import { getYoutubeThumbnailByUrl } from "@/helpers/youtube.helper";
import { Match } from "@/types/index.type";

export async function GET() {
  const oldMatches = await client
    .fetch(
      `*[_type == "match" && !(_id in path("drafts.**")) && tournament._ref == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}" && defined(result.playerEast.score)] | order(startAt desc){ _id, name, playerEast->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation}, overridedDesignation, overridedName, "overridedColor": overridedColor.hex}, playerSouth->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation}, overridedDesignation, overridedName, overridedColor}, playerWest->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation}, overridedDesignation, overridedName, overridedColor}, playerNorth->{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}, player->{name, designation}, overridedDesignation, overridedName, overridedColor}, startAt, youtubeUrl, bilibiliUrl, result}`
    )
    .then((matches: Match[]) =>
      matches.map((match) => ({
        ...match,
        youtubeThumbnailUrl: getYoutubeThumbnailByUrl(match.youtubeUrl),
      }))
    );

  return Response.json(oldMatches);
}
