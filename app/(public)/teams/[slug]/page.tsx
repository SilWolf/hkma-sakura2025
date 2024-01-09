import { getTeamDetailBySlug, getTeamSlugs } from "@/helpers/sanity.helper";
import {
  renderPercentage,
  renderPoint,
  renderRankingAvg,
  renderScore,
} from "@/helpers/string.helper";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 1800;

export async function generateStaticParams() {
  return getTeamSlugs();
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const team = await getTeamDetailBySlug(slug);

  return {
    title: team?.teamFullname || "隊伍介紹",
    description: team?.teamIntroduction,
  };
}

export default async function TeamDetail({
  params: { slug },
}: {
  params: { slug: string };
}) {
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

      {team.players.map((player) => (
        <section key={player.playerName} className="py-12">
          <div className="container mx-auto max-w-screen-md px-2">
            <div className="flex gap-2 md:gap-12 items-center">
              <div className="flex-1">
                <h3 className="font-bold text-xl">{player.playerFullname}</h3>
                <p className="mt-2 whitespace-pre-wrap">
                  {player.playerIntroduction}
                </p>
              </div>
            </div>
            <div className="flex gap-x-4 mt-4">
              <table className="flex-[3] text-center">
                <thead>
                  <tr className="bg-neutral-700 text-white">
                    <th>半莊數</th>
                    <th>總積分</th>
                    <th>平均順位</th>
                    <th>最大分數</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{player.statistic.matchCount}</td>
                    <td>{renderPoint(player.statistic.point)}</td>
                    <td>{renderRankingAvg(player.statistic)}</td>
                    <td>{player.statistic.scoreMax}</td>
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
                      {renderPercentage(
                        (player.statistic.firstCount +
                          player.statistic.secondCount) /
                          player.statistic.matchCount
                      )}
                    </td>
                    <td>
                      {renderPercentage(
                        1 -
                          player.statistic.fourthCount /
                            player.statistic.matchCount
                      )}
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
                      {renderPercentage(
                        player.statistic.riichiCount /
                          player.statistic.roundCount
                      )}
                    </td>
                    <td>
                      {renderPercentage(
                        player.statistic.revealCount /
                          player.statistic.roundCount
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex gap-x-4 mt-4">
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
                      <p>
                        {renderPercentage(
                          player.statistic.ronCount /
                            player.statistic.roundCount
                        )}
                      </p>
                    </td>
                    <td>
                      <p>{player.statistic.ronPureScoreAvg.toFixed(2)}</p>
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
                      <p>
                        {renderPercentage(
                          player.statistic.chuckCount /
                            player.statistic.roundCount
                        )}
                      </p>
                    </td>
                    <td>
                      <p>{player.statistic.chuckPureScoreAvg.toFixed(2)}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
