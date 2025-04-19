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

      <section className="container mx-auto text-center text-2xl pb-24">
        稍後公佈
      </section>
    </main>
  );
}
