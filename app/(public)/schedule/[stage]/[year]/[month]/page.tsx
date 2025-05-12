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
          {matchesGroupedByDate.map((match) => (
            <div
              key={match.data.startAt}
              className="flex flex-col laptop:flex-row gap-8 px-2 py-4 laptop:px-8 laptop:py-8 rounded-lg bg-[rgba(255,255,255,0.1)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold">
                  {renderDateToShortForm(match.data.startAt)}(
                  {renderWeekdayByISODateString(match.data.startAt)})
                </p>
                {match.result && (
                  <Link href={`/matches/${match.code}`}>
                    <button className="btn btn-secondary">詳情</button>
                  </Link>
                )}
              </div>
              <div className="flex-1 gap-x-6 gap-y-12">
                <div>
                  <div className="grid grid-cols-4 gap-2">
                    {!match.result &&
                      match.data.players.map((player) => (
                        <ScheduleTeam
                          key={player.id}
                          player={playersMap[player.id] ?? player}
                        />
                      ))}
                    {match.result &&
                      [
                        {
                          player:
                            playersMap[match.data.players[0].id] ??
                            match.data.players[0],
                          result: match.result.playerEast,
                        },
                        {
                          player:
                            playersMap[match.data.players[1].id] ??
                            match.data.players[1],
                          result: match.result.playerSouth,
                        },
                        {
                          player:
                            playersMap[match.data.players[2].id] ??
                            match.data.players[2],
                          result: match.result.playerWest,
                        },
                        {
                          player:
                            playersMap[match.data.players[3].id] ??
                            match.data.players[3],
                          result: match.result.playerNorth,
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
