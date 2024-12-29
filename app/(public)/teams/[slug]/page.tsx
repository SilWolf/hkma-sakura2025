import { getTeamDetailBySlug, getTeamSlugs } from "@/helpers/sanity.helper";
import {
  renderPercentage,
  renderPercentageWithSign,
  renderPoint,
  renderRankingAvg,
  renderScore,
} from "@/helpers/string.helper";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 1800;

export async function generateStaticParams() {
  return getTeamSlugs().then((slugs) => slugs.map((slug) => ({ slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const team = await getTeamDetailBySlug(slug);

  return {
    title: team?.teamFullname || "隊伍介紹",
    description: team?.teamIntroduction,
  };
}

export default async function TeamDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const team = await getTeamDetailBySlug(slug);
  if (!team) {
    return notFound();
  }

  return (
    <main className="relative pb-12">
      <section className="pt-16 md:pt-8 pb-4">
        <div className="container max-w-screen-md mx-auto px-2 space-x-2 text-sm">
          <Link className="opacity-80" href="/teams">
            聯賽隊伍
          </Link>
          <span>&gt;</span>
          <span>{team.teamFullname}</span>
        </div>
      </section>

      <section
        className="py-12 w-full text-center"
        style={{
          background: `linear-gradient(to bottom, ${team.color}2D, transparent)`,
        }}
      >
        <div className="container mx-auto max-w-screen-md px-2">
          <img
            src={team.teamLogoImageUrl}
            className="w-64 h-64 mx-auto"
            alt=""
          />
          <h2
            className="mt-12 text-[48px] font-bold border-y py-1"
            style={{
              borderColor: team.color,
              backgroundColor: `${team.color}2D`,
            }}
          >
            {team.teamFullname}
          </h2>
          <p className="text-center text-2xl leading-10 mt-12 md:px-8 whitespace-pre-wrap">
            {team.teamIntroduction}
          </p>
        </div>
      </section>

      {/* {team.players.map((player) => (
        <section
          key={player.playerName}
          className="py-12 [&_th]:bg-[--teamColor]"
          style={
            {
              "--teamColor": team.color + "80",
            } as React.CSSProperties
          }
        >
          <div className="container mx-auto max-w-screen-md px-2">
            <div className="flex gap-2 md:gap-12 items-center">
              <div className="flex-1">
                <h3 className="font-bold text-xl">{player.playerFullname}</h3>
                <p className="mt-2 whitespace-pre-wrap">
                  {player.playerIntroduction}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <table className="flex-[3] text-center">
                <thead>
                  <tr className="text-white">
                    <th>半莊數</th>
                    <th>總積分</th>
                    <th>平均順位</th>
                    <th>最大分數</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>{player.statistic.matchCount}</p>
                      <p className="text-xs opacity-80">
                        (局數: {player.statistic.roundCount})
                      </p>
                    </td>
                    <td>
                      <p>{renderPoint(player.statistic.point)}</p>
                      <p className="text-xs text-cyan-400">
                        {player.statistic.pointRanking ?? "-"}名
                      </p>
                      <p className="text-xs opacity-80">
                        (平均:{" "}
                        {renderPoint(
                          player.statistic.point / player.statistic.matchCount
                        )}
                        )
                      </p>
                    </td>
                    <td>{renderRankingAvg(player.statistic)}</td>
                    <td>
                      <p>{player.statistic.scoreMax}</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="flex-[2] text-center">
                <thead>
                  <tr className="bg-neutral-700 text-white">
                    <th>連對率</th>
                    <th>避四率</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>
                        {renderPercentage(player.statistic.firstAndSecondP)}
                      </p>
                      <p className="text-xs text-cyan-400">
                        {player.statistic.firstAndSecondPRanking ?? "-"}名
                      </p>
                    </td>
                    <td>
                      <p>{renderPercentage(player.statistic.nonFourthP)}</p>
                      <p className="text-xs text-cyan-400">
                        {player.statistic.nonFourthPRanking ?? "-"}名
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="flex-[2] text-center">
                <thead>
                  <tr className="bg-neutral-700 text-white">
                    <th>立直率</th>
                    <th>副露率</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>{renderPercentage(player.statistic.riichiP)}</p>
                      <p className="text-xs text-cyan-400">
                        {player.statistic.riichiPRanking ?? "-"}名
                      </p>
                      <p className="text-xs opacity-80">
                        (親:{" "}
                        {renderPercentageWithSign(
                          player.statistic.riichiCountWhenEast /
                            player.statistic.riichiCount
                        )}
                        , 子:{" "}
                        {renderPercentageWithSign(
                          player.statistic.riichiCountWhenNonEast /
                            player.statistic.riichiCount
                        )}
                        )
                      </p>
                    </td>
                    <td>
                      <p>{renderPercentage(player.statistic.revealP)}</p>
                      <p className="text-xs text-cyan-400">
                        {player.statistic.revealPRanking ?? "-"}名
                      </p>
                      <p className="text-xs opacity-80">
                        (親:{" "}
                        {renderPercentageWithSign(
                          player.statistic.revealCountWhenEast /
                            player.statistic.revealCount
                        )}
                        , 子:{" "}
                        {renderPercentageWithSign(
                          player.statistic.revealCountWhenNonEast /
                            player.statistic.revealCount
                        )}
                        )
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <table className="flex-1 text-center">
                <thead>
                  <tr className="bg-neutral-700 text-white">
                    <th>和了率</th>
                    <th>平均和了打點</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>{renderPercentage(player.statistic.ronP)}</p>
                      <p className="text-xs text-cyan-400">
                        {player.statistic.ronPRanking ?? "-"}名
                      </p>
                      <p className="text-xs opacity-80">
                        (親:{" "}
                        {renderPercentageWithSign(
                          player.statistic.ronCountWhenEast /
                            player.statistic.ronCount
                        )}
                        , 子:{" "}
                        {renderPercentageWithSign(
                          player.statistic.ronCountWhenNonEast /
                            player.statistic.ronCount
                        )}
                        )
                      </p>
                      <p className="text-xs opacity-80">
                        (立直後:{" "}
                        {renderPercentageWithSign(
                          player.statistic.ronAfterRiichiCount /
                            player.statistic.ronCount
                        )}
                        , 副露後:{" "}
                        {renderPercentageWithSign(
                          player.statistic.ronAfterRevealCount /
                            player.statistic.ronCount
                        )}
                        )
                      </p>
                    </td>
                    <td>
                      <p>{player.statistic.ronPureScoreAvg.toFixed(2)}</p>
                      <p className="text-xs text-cyan-400">
                        {player.statistic.ronPureScoreAvgRanking ?? "-"}名
                      </p>
                      <p className="text-xs opacity-80">
                        (親:{" "}
                        {player.statistic.ronPureScoreAvgWhenEast.toFixed(2)},
                        子:{" "}
                        {player.statistic.ronPureScoreAvgWhenNonEast.toFixed(2)}
                        )
                      </p>
                      <p className="text-xs opacity-80">
                        (立直後:{" "}
                        {player.statistic.ronAfterRiichiPureScoreAvg.toFixed(2)}
                        , 副露後:{" "}
                        {player.statistic.ronAfterRevealPureScoreAvg.toFixed(2)}
                        )
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="flex-1 text-center">
                <thead>
                  <tr className="bg-neutral-700 text-white">
                    <th>銃和率</th>
                    <th>平均銃和打點</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>{renderPercentage(player.statistic.chuckP)}</p>
                      <p className="text-xs text-cyan-400">
                        {player.statistic.chuckPRanking ?? "-"}名
                      </p>
                      <p className="text-xs opacity-80">
                        (親:{" "}
                        {renderPercentageWithSign(
                          player.statistic.chuckCountWhenEast /
                            player.statistic.chuckCount
                        )}
                        , 子:{" "}
                        {renderPercentageWithSign(
                          player.statistic.chuckCountWhenNonEast /
                            player.statistic.chuckCount
                        )}
                        )
                      </p>
                      <p className="text-xs opacity-80">
                        (立直後:{" "}
                        {renderPercentageWithSign(
                          player.statistic.chuckAfterRiichiCount /
                            player.statistic.chuckCount
                        )}
                        , 副露後:{" "}
                        {renderPercentageWithSign(
                          player.statistic.chuckAfterRevealCount /
                            player.statistic.chuckCount
                        )}
                        )
                      </p>
                    </td>
                    <td>
                      <p>{player.statistic.chuckPureScoreAvg.toFixed(2)}</p>
                      <p className="text-xs text-cyan-400">
                        {player.statistic.chuckPureScoreAvgRanking ?? "-"}名
                      </p>
                      <p className="text-xs opacity-80">
                        (親:{" "}
                        {player.statistic.chuckPureScoreAvgWhenEast.toFixed(2)},
                        子:{" "}
                        {player.statistic.chuckPureScoreAvgWhenNonEast.toFixed(
                          2
                        )}
                        )
                      </p>
                      <p className="text-xs opacity-80">
                        (立直後:{" "}
                        {player.statistic.chuckAfterRiichiPureScoreAvg.toFixed(
                          2
                        )}
                        , 副露後:{" "}
                        {player.statistic.chuckAfterRevealPureScoreAvg.toFixed(
                          2
                        )}
                        )
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))} */}
    </main>
  );
}
