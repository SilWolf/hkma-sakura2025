import { getTeams } from "@/helpers/sanity.helper";
import { renderPoint, renderRanking } from "@/helpers/string.helper";
import { Metadata } from "next";

export const revalidate = 900;

const statRows = [
  {
    label: "排名",
    name: "ranking",
  },
  {
    label: "積分",
    name: "point",
  },
  {
    label: "半莊數",
    name: "matchCount",
  },
  // {
  //   label: "一位率",
  //   name: "firstP",
  // },
  // {
  //   label: "二位率",
  //   name: "secondP",
  // },
  // {
  //   label: "三位率",
  //   name: "thirdP",
  // },
  // {
  //   label: "四位率",
  //   name: "fourthP",
  // },
  // {
  //   label: "平均得點",
  //   name: "pointAvg",
  // },
  // {
  //   label: "平均順位",
  //   name: "rankingAvg",
  // },
  // {
  //   label: "和了率",
  //   name: "ronP",
  // },
  // {
  //   label: "放銃率",
  //   name: "chuckP",
  // },
  // {
  //   label: "立直率",
  //   name: "riichiP",
  // },
  // {
  //   label: "副露率",
  //   name: "revealP",
  // },
] as const;

export const metadata: Metadata = {
  title: "排名及數據",
};

export default async function RankingPage() {
  const tournamentTeams = await getTeams();

  const tournamentTeamsOrderedByRanking = tournamentTeams.sort(
    (a, b) => (a.statistics?.ranking ?? 0) - (b.statistics?.ranking ?? 0)
  );

  return (
    <main>
      <section className="py-10">
        <h2 className="text-center text-4xl lg:text-5xl font-semibold">
          排名及數據
        </h2>
      </section>

      <section className="pb-12">
        <div className="container px-2 mx-auto">
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
            <tbody className="[&_img]:w-8 [&_img]:h-8 [&_td]:py-2 text-center">
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
                      <span className="sm:hidden">{statistics?.ranking}</span>
                    </td>
                    <td className="w-9">
                      <img
                        src={team.squareLogoImage + "?w=128&auto=format"}
                        alt={team.slug}
                        className="h-4 w-4"
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
                          ? renderPoint(
                              (tournamentTeamsOrderedByRanking[i - 1].statistics
                                ?.point ?? 0) - (statistics?.point ?? 0)
                            )
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
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-2">
          <h3 className="text-xl font-semibold mb-2 sm:text-2xl">
            數據 - 常規賽
          </h3>
          <div className="w-full overflow-y-scroll">
            <table className="w-full min-w-[980px] whitespace-nowrap text-center">
              <thead className="[&_img]:inline-block [&_img]:w-12 [&_img]:h-12 xl:[&_img]:w-16 xl:[&_img]:h-16">
                <tr className="[&>th]:w-9 [&>th]:text-xs sm:[&>th]:text-base">
                  <th></th>
                  {tournamentTeams.map((team) => (
                    <th
                      scope="col"
                      key={team._key}
                      style={{
                        background: team.team.color + "80",
                      }}
                    >
                      <img
                        src={team.team.squareLogoImage + "?w=64&auto=format"}
                        alt={team.team.slug}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="[&_td]:py-1 text-center">
                <tr>
                  <th scope="row">排名</th>
                  {tournamentTeams.map((team) => (
                    <td
                      key={team._key}
                      style={{
                        background: team.team.color + "80",
                      }}
                    >
                      {renderRanking(team.statistics?.ranking)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">積分</th>
                  {tournamentTeams.map((team) => (
                    <td
                      key={team._key}
                      style={{
                        background: team.team.color + "80",
                      }}
                    >
                      {renderPoint(team.statistics?.point)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">半莊數</th>
                  {tournamentTeams.map((team) => (
                    <td
                      key={team._key}
                      style={{
                        background: team.team.color + "80",
                      }}
                    >
                      {team.statistics?.matchCount}/60
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
