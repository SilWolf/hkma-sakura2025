import { client } from "@/helpers/sanity.helper";
import { getYoutubeThumbnailByUrl } from "@/helpers/youtube.helper";
import { Match } from "@/types/index.type";
import { NextRequest } from "next/server";

const playerProjection =
  '{team->{name, "squareLogoImage": squareLogoImage.asset->url, "color": color.hex}}';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const month = searchParams.get("month");
  const trueMonth = !!month ? parseInt(month) : new Date().getMonth() + 1;
  const nextMonth = trueMonth === 12 ? 1 : trueMonth;

  const year = searchParams.get("year");
  const trueYear = !!year ? parseInt(year) : 2024;
  const nextYear = trueMonth === 12 ? trueYear + 1 : trueYear;

  const filterStartDate = `${trueYear}-${trueMonth
    .toString()
    .padStart(2, "0")}-01T00:00:00Z`;
  const filterEndDate = `${nextYear}-${nextMonth
    .toString()
    .padStart(2, "0")}-01T00:00:00Z`;

  console.log(
    `*[_type == "match" && !(_id in path("drafts.**")) && tournament._ref == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}" && startAt >= "${filterStartDate}" && startAt < "${filterEndDate}"] | order(startAt asc){ _id, name, playerEast->${playerProjection}, playerSouth->${playerProjection}, playerWest->${playerProjection}, playerNorth->${playerProjection}, startAt, youtubeUrl, bilibiliUrl, result}`
  );

  const scheduledMatches = await client.fetch<Match[]>(
    `*[_type == "match" && !(_id in path("drafts.**")) && tournament._ref == "${process.env.SANITY_DEFAULT_TOURNAMENT_ID}" && startAt >= "${filterStartDate}" && startAt < "${filterEndDate}"] | order(startAt asc){ _id, name, playerEast->${playerProjection}, playerSouth->${playerProjection}, playerWest->${playerProjection}, playerNorth->${playerProjection}, startAt, youtubeUrl, bilibiliUrl, result}`
  );

  const matchesGroupedByDate: Record<string, Match[]> = {};

  for (const match of scheduledMatches) {
    const dateString = match.startAt.substring(0, 10);
    if (!matchesGroupedByDate[dateString]) {
      matchesGroupedByDate[dateString] = [];
    }

    matchesGroupedByDate[dateString].push(match);
  }

  const result = Object.entries(matchesGroupedByDate).map(([key, value]) => ({
    date: key,
    matches: value,
  }));

  return Response.json(result);
}
