import {
  renderDateToShortForm,
  renderPoint,
  renderWeekdayByISODateString,
} from "@/helpers/string.helper";
import { V2MatchPlayer } from "@/models/V2Match.model";
import { apiQueryMatchesForSchedule } from "@/services/match.service";
import { apiGetTournament } from "@/services/tournament.service";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 600;

const ScheduleTeam = ({
  player,
  point,
  isLoser,
}: {
  player: V2MatchPlayer;
  point?: number | null;
  isLoser?: boolean;
}) => {
  // const point = match.result?.[playerIndex]?.point;
  // const isLoser = match.result && match.result?.[playerIndex]?.ranking !== "1";

  return (
    <div>
      <img
        src={player.image.portrait?.default.url}
        className="w-full"
        alt={player.name.display.primary}
        style={{
          opacity: isLoser ? 0.4 : 1,
        }}
      />
      {typeof point !== "undefined" && (
        <p className="text-center text-sm">{renderPoint(point)}pt</p>
      )}
    </div>
  );
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    year: string;
    month: string;
  }>;
}): Promise<Metadata> {
  const { year, month } = await params;

  return {
    title: "賽程及對局紀錄",
  };
}

export default async function SchedulePage() {
  const { playersMap } = await apiGetTournament();
  const matchesGroupedByDate = await apiQueryMatchesForSchedule();

  return (
    <main>
      <section className="py-10">
        <h2 className="text-center text-4xl laptop:text-5xl font-semibold">
          賽程及對局紀錄
        </h2>
      </section>

      <section className="pb-12">
        <div className="container px-2 mx-auto max-w-screen-lg space-y-6">
          {matchesGroupedByDate.map(({ mergedMatch, matches }) => (
            <div
              key={mergedMatch.data.startAt}
              className="flex flex-col laptop:flex-row gap-8 px-2 py-4 laptop:px-8 laptop:py-8 rounded-lg bg-[rgba(255,255,255,0.1)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold">
                  {renderDateToShortForm(mergedMatch.data.startAt)}(
                  {renderWeekdayByISODateString(mergedMatch.data.startAt)})
                </p>
                {mergedMatch.result && (
                  <Link href={`/matches/${mergedMatch.code}`}>
                    <button className="btn btn-secondary">詳情</button>
                  </Link>
                )}
              </div>
              <div className="flex-1 gap-x-6 gap-y-12">
                <div>
                  <div className="grid grid-cols-4 gap-2">
                    {!mergedMatch.result &&
                      mergedMatch.data.players.map((player) => (
                        <ScheduleTeam
                          key={player.id}
                          player={playersMap[player.id] ?? player}
                        />
                      ))}
                    {mergedMatch.result &&
                      [
                        {
                          player:
                            playersMap[mergedMatch.data.players[0].id] ??
                            mergedMatch.data.players[0],
                          result: mergedMatch.result.playerEast,
                        },
                        {
                          player:
                            playersMap[mergedMatch.data.players[1].id] ??
                            mergedMatch.data.players[1],
                          result: mergedMatch.result.playerSouth,
                        },
                        {
                          player:
                            playersMap[mergedMatch.data.players[2].id] ??
                            mergedMatch.data.players[2],
                          result: mergedMatch.result.playerWest,
                        },
                        {
                          player:
                            playersMap[mergedMatch.data.players[3].id] ??
                            mergedMatch.data.players[3],
                          result: mergedMatch.result.playerNorth,
                        },
                      ].map(({ player, result }) => (
                        <ScheduleTeam
                          key={player.id}
                          player={playersMap[player.id] ?? player}
                          point={result.point}
                          isLoser={result.ranking !== "1"}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
