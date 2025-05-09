import {
  renderDateToShortForm,
  renderPoint,
  renderWeekdayByISODateString,
} from "@/helpers/string.helper";
import { V2MatchPlayer } from "@/models/V2Match.model";
import {
  apiGetLatestComingMatches,
  apiGetLatestCompletedMatches,
} from "@/services/match.service";
import { apiGetTournament } from "@/services/tournament.service";
import Link from "next/link";
import LargePlayerProtrait from "./_components/LargePlayerPortrait";
import { ParallaxBanner } from "react-scroll-parallax";
import NextMatchSection from "./_widgets/NextMatchSection";

export const revalidate = 900;

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

export default async function Home() {
  const [latestCompletedMatches, latestComingMatches] = await Promise.all([
    apiGetLatestCompletedMatches(),
    apiGetLatestComingMatches(),
  ]);
  const { playersMap } = await apiGetTournament();

  const nextMatch = latestComingMatches[0];

  return (
    <main>
      <section className="w-full text-center relative overflow-hidden">
        <div className="pt-8 md:pt-12 relative z-10 text-center">
          <div className="container px-2 mx-auto flex flex-col sm:flex-row justify-center items-stretch gap-4">
            <div className="text-center flex flex-col justify-between pb-[4px]">
              <img
                src="/images/logo-sakura-long.png"
                className="block mx-auto h-48 xl:h-64"
                alt="Sakura League"
              />
              {/* <h1 className="text-[48px] sm:text-[56px] md:text-[72px] lg:text-[96px] font-serif">
                Sakura 2025
              </h1> */}
              {/* <h2 className="text-[24px] whitespace-pre-wrap sm:whitespace-nowrap sm:text-[32px] leading-[1.2] sm:leading-none">
                香港麻雀協會 香港女子立直麻雀聯賽2025
              </h2> */}
            </div>
          </div>
          <div className="flex justify-center gap-x-4 mx-auto mt-8">
            <a href="https://mahjong-poly.mystrikingly.com/" target="_blank">
              <img
                className="h-10"
                src="/images/logo-poly.webp"
                alt="香港麻雀理工"
              />
            </a>
            <a href="https://www.hkmahjong.org/" target="_blank">
              <img
                className="h-12"
                src="/images/logo-hkma-black.png"
                alt="香港麻雀協會 Hong Kong Mahjong Association"
              />
            </a>
          </div>
        </div>
      </section>

      {nextMatch && <NextMatchSection nextMatch={nextMatch} />}

      <section className="py-12">
        <div className="container px-2 mx-auto text-center flex flex-col lg:flex-row gap-8 gap-y-16">
          <div className="flex-1">
            <h2 className="font-semibold text-4xl mb-10">最新賽果</h2>

            <div className="space-y-6">
              {latestCompletedMatches.map((match) => (
                <div
                  key={match.data.startAt}
                  className="flex flex-col lg:flex-row gap-8 px-2 py-4 lg:px-8 lg:py-8 rounded-lg bg-[rgba(255,255,255,0.1)]"
                >
                  <div className="[&>p]:inline lg:[&>p]:block shrink-0 text-center">
                    <p className="text-2xl font-semibold">
                      {renderDateToShortForm(match.data.startAt)}
                    </p>
                    <p className="text-2xl font-semibold">
                      ({renderWeekdayByISODateString(match.data.startAt)})
                    </p>
                    {match.result && (
                      <Link href={`/matches/${match.code}`}>
                        <button className="btn btn-secondary mt-4">詳情</button>
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
          </div>
          <div className="flex-1">
            {/* <h2 className="font-semibold text-4xl mb-4">排名</h2>
            <table className="w-full">
              <thead>
                <tr className="[&>th]:text-xs sm:[&>th]:text-base sm:[&>th]:px-2">
                  <th scope="col">名次</th>
                  <th scope="col"></th>
                  <th scope="col">隊伍</th>
                  <th scope="col">積分</th>
                  <th scope="col">
                    <span className="hidden sm:inline">與前名</span>差距
                  </th>
                  <th scope="col">
                    半莊<span className="hidden sm:inline">數</span>
                  </th>
                </tr>
              </thead>
              <tbody className="[&_img]:w-10 [&_img]:h-10 [&_td]:py-3">
                {tournamentTeamsOrderedByRanking.map(
                  ({ team, statistics }, i) => (
                    <tr
                      key={team._id}
                      style={{
                        background: `linear-gradient(to right, ${team.color}B0, ${team.color}A0)`,
                      }}
                    >
                      <td scope="row">
                        <span className="hidden sm:inline">
                          {renderRanking(statistics?.ranking)}
                        </span>
                        <span className="sm:hidden">
                          {statistics?.ranking ?? "1"}
                        </span>
                      </td>
                      <td className="w-10 !p-0">
                        <img
                          src={team.squareLogoImage + "?w=128&auto=format"}
                          alt={team.name}
                        />
                      </td>
                      <td>
                        <span className="text-sm sm:text-xl">
                          {team.name} {team.secondaryName}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs sm:text-base">
                          {renderPoint(statistics?.point)}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs sm:text-base">
                          {tournamentTeamsOrderedByRanking[i - 1]
                            ? (
                                (tournamentTeamsOrderedByRanking[i - 1]
                                  .statistics?.point ?? 0) -
                                (statistics?.point ?? 0)
                              ).toFixed(1)
                            : "-"}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs sm:text-base">
                          {statistics?.matchCount ?? 0}
                        </span>
                        <span className="hidden sm:inline sm:text-sm">/60</span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="mt-8 space-x-2">
              <Link
                className="inline-block text-lg rounded-full py-4 px-12 hover:opacity-80 bg-[#1abced]"
                href="/ranking"
              >
                詳細數據
              </Link>
            </div> */}

            <h2 className="font-semibold text-4xl mb-10">賽程</h2>

            <div className="space-y-6">
              {latestComingMatches.map((match) => (
                <div
                  key={match.data.startAt}
                  className="flex flex-col lg:flex-row gap-8 px-2 py-4 lg:px-8 lg:py-8 rounded-lg bg-[rgba(255,255,255,0.1)]"
                >
                  <div className="[&>p]:inline lg:[&>p]:block shrink-0 text-center">
                    <p className="text-2xl font-semibold">
                      {renderDateToShortForm(match.data.startAt)}
                    </p>
                    <p className="text-2xl font-semibold">
                      ({renderWeekdayByISODateString(match.data.startAt)})
                    </p>
                    {match.result && (
                      <Link href={`/matches/${match.code}`}>
                        <button className="btn btn-secondary mt-4">詳情</button>
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
            <div className="container mx-auto text-center mt-8">
              <Link className="btn btn-primary btn-lg" href="/schedule">
                其他賽事
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-x-4">
            {NEXT_MATCH.players.map((player) => (
              <div
                key={player.name.display}
                className="bg-white rounded-[24px]"
              >
                <img
                  src={player.portrait.default.url}
                  alt={player.name.display}
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </main>
  );
}
