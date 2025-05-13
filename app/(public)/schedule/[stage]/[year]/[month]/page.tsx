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

export const revalidate = 600;

const PlayerCard = ({
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
        <p className="text-center">{renderPoint(point)}pt</p>
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
              className="flex flex-col laptop:flex-row gap-x-8 gap-y-2 px-2 py-4 laptop:px-8 laptop:py-8 rounded-lg bg-base-100/25"
            >
              <div className="flex justify-start items-center flex-row laptop:flex-col gap-2">
                <div className="flex flex-row laptop:flex-col items-center justify-between laptop:justify-start gap-4">
                  <p className="text-2xl font-semibold">
                    {renderDateToShortForm(mergedMatch.data.startAt)}(
                    {renderWeekdayByISODateString(mergedMatch.data.startAt)})
                  </p>
                </div>
                {mergedMatch.metadata.youtubeUrl && (
                  <div>
                    <a href={mergedMatch.metadata.youtubeUrl} target="_blank">
                      <i className="bi bi-youtube text-2xl laptop:text-4xl"></i>
                    </a>
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col laptop:flex-row gap-x-6 gap-y-12">
                {(mergedMatch.data.result ? matches : [mergedMatch]).map(
                  (match, index) => (
                    <div key={match.code} className="flex-1">
                      {match.data.result && (
                        <div className="border-b border-primary flex justify-between">
                          <div>第{index + 1}回戰</div>
                          <div>
                            <Link href={`/matches/${match.code}`}>
                              詳情 &gt;
                            </Link>
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-4 gap-2">
                        {!match.data.result &&
                          match.data.players.map((player) => (
                            <PlayerCard
                              key={player.id}
                              player={playersMap[player.id] ?? player}
                            />
                          ))}
                        {match.data.result &&
                          [
                            {
                              player:
                                playersMap[match.data.players[0].id] ??
                                match.data.players[0],
                              result: match.data.result.playerEast,
                            },
                            {
                              player:
                                playersMap[match.data.players[1].id] ??
                                match.data.players[1],
                              result: match.data.result.playerSouth,
                            },
                            {
                              player:
                                playersMap[match.data.players[2].id] ??
                                match.data.players[2],
                              result: match.data.result.playerWest,
                            },
                            {
                              player:
                                playersMap[match.data.players[3].id] ??
                                match.data.players[3],
                              result: match.data.result.playerNorth,
                            },
                          ].map(({ player, result }) => (
                            <PlayerCard
                              key={player.id}
                              player={playersMap[player.id] ?? player}
                              point={result.point}
                              isLoser={result.ranking !== "1"}
                            />
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
