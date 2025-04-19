import {
  MatchDTO,
  getRegularTeams,
  getMatchesGroupedByDate,
  getMatchesGroupedByStageAndDate,
} from "@/helpers/sanity.helper";
import {
  renderDateToShortForm,
  renderPoint,
  renderWeekday,
} from "@/helpers/string.helper";
import { Team } from "@/types/index.type";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 600;

const ScheduleTeam = ({
  team,
  point,
  isLoser,
}: {
  team: Team;
  point?: number | null;
  isLoser?: boolean;
}) => {
  // const point = match.result?.[playerIndex]?.point;
  // const isLoser = match.result && match.result?.[playerIndex]?.ranking !== "1";

  return (
    <div>
      <img
        src={team.squareLogoImage + "?w=512&auto=format"}
        className="w-full"
        alt={team.name}
        style={{
          opacity: isLoser ? 0.4 : 1,
          filter: isLoser ? "grayscale(100%)" : "",
        }}
      />
      {typeof point !== "undefined" && (
        <p className="text-center text-sm">{renderPoint(point)}pt</p>
      )}
    </div>
  );
};

const STAGES = [
  {
    name: "regulars",
    label: "常規賽",
    months: [
      {
        year: 2025,
        month: 1,
        label: "1月",
      },
      {
        year: 2025,
        month: 2,
        label: "2月",
      },
      {
        year: 2025,
        month: 3,
        label: "3月",
      },
      {
        year: 2025,
        month: 4,
        label: "4月",
      },
      {
        year: 2025,
        month: 5,
        label: "5月",
      },
      {
        year: 2025,
        month: 6,
        label: "6月",
      },
      {
        year: 2025,
        month: 7,
        label: "7月",
      },
      {
        year: 2025,
        month: 8,
        label: "8月",
      },
    ],
  },
  {
    name: "semifinals",
    label: "準決賽",
    months: [
      {
        year: 2025,
        month: 8,
        label: "8月",
      },
      {
        year: 2025,
        month: 9,
        label: "9月",
      },
    ],
  },
  {
    name: "finals",
    label: "決賽",
    months: [
      {
        year: 2025,
        month: 10,
        label: "10月",
      },
      {
        year: 2025,
        month: 11,
        label: "11月",
      },
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    year: string;
    month: string;
    stage: "regulars" | "semifinals" | "finals";
  }>;
}): Promise<Metadata> {
  const { year, month, stage = "finals" } = await params;
  const activeStage = STAGES.find((stageItem) => stageItem.name === stage);

  return {
    title: `賽程及對局紀錄 - ${activeStage?.label} ${year}年${month}月`,
  };
}

export default async function SchedulePage({
  params,
}: {
  params: Promise<{
    year: string;
    month: string;
    stage: "regulars" | "semifinals" | "finals";
  }>;
}) {
  const { year, month, stage = "finals" } = await params;
  const activeStage = STAGES.find((stageItem) => stageItem.name === stage);
  if (!activeStage) {
    return notFound();
  }

  const trueYear = parseInt(year);
  const trueMonth = parseInt(month);

  if (trueYear < 2023 || trueYear > 2025) {
    return notFound();
  }

  if (trueMonth < 1 || trueMonth > 12) {
    return notFound();
  }

  const nextMonth = trueMonth === 12 ? 2 : trueMonth + 1;
  const nextYear = trueMonth === 12 ? trueYear + 1 : trueYear;

  const matchesGroupedByDate = await getMatchesGroupedByStageAndDate(
    stage,
    `${trueYear}-${trueMonth.toString().padStart(2, "0")}-01T00:00:00+08:00`,
    `${nextYear}-${nextMonth.toString().padStart(2, "0")}-01T00:00:00+08:00`
  );

  const teamSorter = await getRegularTeams().then(
    (teams) => (a: Team, b: Team) => {
      const indexOfA = teams.findIndex((item) => item.team._id === a._id);
      const indexOfB = teams.findIndex((item) => item.team._id === b._id);

      return indexOfB - indexOfA;
    }
  );

  return (
    <main>
      <section className="py-10">
        <h2 className="text-center text-4xl lg:text-5xl font-semibold">
          賽程及對局紀錄
        </h2>
      </section>
      <section className="container mx-auto text-center text-2xl pb-24">
        稍後公佈
      </section>
    </main>
  );
}
