import PLAYERS from "@/constants/PLAYERS";
import {
  MatchDTO,
  TeamPlayerDTO,
  getLastDateFinishedMatchesGroupedByDate,
  getLatestComingMatchesGroupedByDate,
  getOldMatches,
  getRegularTeams,
  getTeams,
} from "@/helpers/sanity.helper";
import {
  renderPoint,
  renderRanking,
  renderWeekday,
} from "@/helpers/string.helper";
import { Player, Team } from "@/types/index.type";
import Link from "next/link";

export const revalidate = 900;

const ScheduleTeam = ({
  team,
  player,
  point,
  isLoser,
}: {
  team: Team;
  player: Player;
  point?: number | null;
  isLoser?: boolean;
}) => {
  // const point = match.result?.[playerIndex]?.point;
  // const isLoser = match.result && match.result?.[playerIndex]?.ranking !== "1";

  return (
    <div>
      <img
        src={player.portraitImage + "?w=360&h=500&fit=crop&auto=format"}
        className="w-full"
        alt={team.name}
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

const NEXT_MATCH = {
  date: new Date().toISOString(),
  players: [PLAYERS[0], PLAYERS[1], PLAYERS[2], PLAYERS[3]],
};

export default async function Home() {
  const [
    regularTournamentTeams,
    tournamentTeams,
    lastMatchesGroupedByDate,
    comingMatchesGroupedByDate,
    oldMatches,
  ] = await Promise.all([
    getRegularTeams(),
    getTeams(),
    getLastDateFinishedMatchesGroupedByDate(),
    getLatestComingMatchesGroupedByDate(),
    getOldMatches(),
  ]);

  const teamSorter = (
    { team: a }: { team: Team },
    { team: b }: { team: Team }
  ) => {
    const indexOfA = regularTournamentTeams.findIndex(
      (item) => item.team._id === a._id
    );
    const indexOfB = regularTournamentTeams.findIndex(
      (item) => item.team._id === b._id
    );

    return indexOfB - indexOfA;
  };

  const tournamentTeamsOrderedByRanking = tournamentTeams.sort(
    (a, b) => (a.statistics?.ranking ?? 0) - (b.statistics?.ranking ?? 0)
  );

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

      <section className="py-12">
        <div className="container px-2 mx-auto text-center flex flex-col lg:flex-row gap-8 gap-y-16">
          <div className="flex-1">
            <h2 className="font-semibold text-4xl mb-10">最新賽果</h2>

            <div className="space-y-6">
              {lastMatchesGroupedByDate.map(({ date, weekday, matches }) => (
                <div
                  key={date}
                  className="flex flex-col lg:flex-row gap-4 px-2 py-4 lg:px-4 lg:py-4 rounded-lg"
                >
                  <div className="[&>p]:inline lg:[&>p]:block shrink-0 text-center">
                    <p className="text-2xl font-semibold">{date}</p>
                    <p className="text-2xl font-semibold">
                      ({renderWeekday(weekday)})
                    </p>
                  </div>
                  <div className="flex-1 grid grid-cols-1 xl:grid-cols-1 gap-4">
                    {matches.map((match, index) => (
                      <div key={match._id}>
                        <div className="bg-base-200 py-1 px-4 rounded-full mb-2">
                          <div className="flex">
                            <h6 className="flex-1 text-left font-semibold">
                              第{index + 1}回戰
                            </h6>
                            <div className="shrink-0 text-sm flex items-center gap-x-4 underline">
                              {match.youtubeUrl && (
                                <a href={match.youtubeUrl} target="_blank">
                                  <i className="bi bi-youtube text-lg"></i>
                                </a>
                              )}
                              {match.bilibiliUrl && (
                                <a href={match.bilibiliUrl} target="_blank">
                                  Bilibili
                                </a>
                              )}
                              {match.rounds?.length > 0 && (
                                <Link
                                  className="inline-block"
                                  href={`/matches/${match._id}`}
                                >
                                  詳情
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {match.result &&
                            match.rounds?.length > 0 &&
                            [
                              {
                                team: match.playerEastTeam!,
                                player: match.playerEast!,
                                result: match.result.playerEast,
                              },
                              {
                                team: match.playerSouthTeam!,
                                player: match.playerSouth!,
                                result: match.result.playerSouth,
                              },
                              {
                                team: match.playerWestTeam!,
                                player: match.playerWest!,
                                result: match.result.playerWest,
                              },
                              {
                                team: match.playerNorthTeam!,
                                player: match.playerNorth!,
                                result: match.result.playerNorth,
                              },
                            ].map(({ team, player, result }) => (
                              <ScheduleTeam
                                key={player._id}
                                team={team}
                                player={player}
                                point={result.point}
                                isLoser={result.ranking !== "1"}
                              />
                            ))}
                        </div>
                      </div>
                    ))}
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
              {comingMatchesGroupedByDate.map(({ date, weekday, matches }) => (
                <div
                  key={date}
                  className="flex flex-col lg:flex-row gap-4 px-2 py-4 lg:px-4 lg:py-4 rounded-lg bg-base-100/50"
                >
                  <div className="[&>p]:inline lg:[&>p]:block shrink-0 text-center">
                    <p className="text-2xl font-semibold">{date}</p>
                    <p className="text-2xl font-semibold">
                      ({renderWeekday(weekday)})
                    </p>
                  </div>
                  <div className="flex-1">
                    <div>
                      <div className="match-team-logos-grid grid grid-cols-4 gap-2">
                        {[
                          {
                            team: matches[0].playerEastTeam!,
                            player: matches[0].playerEast,
                          },
                          {
                            team: matches[0].playerSouthTeam!,
                            player: matches[0].playerSouth,
                          },
                          {
                            team: matches[0].playerWestTeam!,
                            player: matches[0].playerWest,
                          },
                          {
                            team: matches[0].playerNorthTeam!,
                            player: matches[0].playerNorth,
                          },
                        ]
                          .sort(teamSorter)
                          .map(({ team, player }) => (
                            <ScheduleTeam
                              key={player?._id}
                              player={player!}
                              team={team}
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
