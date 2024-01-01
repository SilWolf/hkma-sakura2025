import { getMatchesGroupedByDate } from "@/helpers/sanity.helper";
import { renderPoint, renderWeekday } from "@/helpers/string.helper";
import { Match } from "@/types/index.type";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const ScheduleTeam = ({
  match,
  playerIndex,
}: {
  match: Match;
  playerIndex: "playerEast" | "playerSouth" | "playerWest" | "playerNorth";
}) => {
  const point = match.result?.[playerIndex]?.point;
  const isLoser = match.result && match.result?.[playerIndex]?.ranking !== "1";

  return (
    <div>
      <img
        src={
          (match[playerIndex].team.squareLogoImage ?? "/images/empty.png") +
          "?w=512&auto=format"
        }
        className="w-full"
        alt={match.playerEast.team.name}
        style={{
          opacity: isLoser ? 0.4 : 1,
          filter: isLoser ? "grayscale(100%)" : "",
        }}
      />
      {match.result && (
        <p className="text-center text-sm">{renderPoint(point)}pt</p>
      )}
    </div>
  );
};

export async function generateMetadata({
  params: { year, month },
}: {
  params: { year: string; month: string };
}): Promise<Metadata> {
  return {
    title: `賽程及對局紀錄 - ${year}年${month}月`,
  };
}

export default async function SchedulePage({
  params: { year, month },
}: {
  params: { year: string; month: string };
}) {
  const trueYear = parseInt(year);
  const trueMonth = parseInt(month);

  if (trueYear < 2023 || trueYear > 2024) {
    return notFound();
  }

  if (trueMonth < 1 || trueMonth > 12) {
    return notFound();
  }

  const matchesGroupedByDate = await getMatchesGroupedByDate(
    trueYear,
    trueMonth
  );

  return (
    <main>
      <section className="py-10">
        <h2 className="text-center text-4xl lg:text-5xl font-semibold">
          賽程及對局紀錄
        </h2>
      </section>

      {/* <section className="pb-12">
        <div className="container px-2 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="text-white">
            <iframe
              className="w-full aspect-[4/3]"
              title="賽程Google Calendar"
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%231e223b&ctz=Asia%2FHong_Kong&showPrint=0&hl=zh_TW&src=ODI3MDAwMzE0YjQyMmFiMmI0ZjA0YTEzZDNmMTJkYjg1OWQ3YmJkZDFhY2E5MjNjYmQxM2RjM2IyZjcxOThmNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23616161"
              style={{ borderWidth: 0 }}
              frameBorder="0"
            />
          </div>
          <div>
            <table className="w-full [&_img]:w-10 [&_img]:h-10 sm:[&_img]:w-24 sm:[&_img]:h-24">
              <thead>
                <tr>
                  <th>場次</th>
                  <th colSpan={4}>隊伍</th>
                </tr>
              </thead>
              <tbody className="odd:[&_tr]:bg-[rgba(255,255,255,0.1)]">
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    稍後公佈
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section> */}

      <section className="pb-4">
        <div className="container mx-auto max-w-screen-lg">
          <div className="flex-wrap flex justify-center gap-4 [&>a]:py-1 [&>a]:px-4 [&>a]:border-b-4 [&>a]:border-transparent data-[active=true]:[&>a]:border-cyan-500">
            <Link
              href="/schedule/2024/1"
              data-active={trueYear === 2024 && trueMonth === 1}
            >
              1月
            </Link>
            <Link
              href="/schedule/2024/2"
              data-active={trueYear === 2024 && trueMonth === 2}
            >
              2月
            </Link>
            <Link
              href="/schedule/2024/3"
              data-active={trueYear === 2024 && trueMonth === 3}
            >
              3月
            </Link>
            <Link
              href="/schedule/2024/4"
              data-active={trueYear === 2024 && trueMonth === 4}
            >
              4月
            </Link>
            <Link
              href="/schedule/2024/5"
              data-active={trueYear === 2024 && trueMonth === 5}
            >
              5月
            </Link>
            <Link
              href="/schedule/2024/6"
              data-active={trueYear === 2024 && trueMonth === 6}
            >
              6月
            </Link>
            <Link
              href="/schedule/2024/7"
              data-active={trueYear === 2024 && trueMonth === 7}
            >
              7月
            </Link>
            <Link
              href="/schedule/2024/8"
              data-active={trueYear === 2024 && trueMonth === 8}
            >
              8月
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container px-2 mx-auto max-w-screen-lg space-y-6">
          {matchesGroupedByDate.length === 0 && (
            <div className="text-center text-2xl px-8 py-8 lg:px-8 lg:py-8 rounded-lg bg-white bg-opacity-10">
              稍後公佈
            </div>
          )}

          {matchesGroupedByDate.map(({ date, weekday, matches }) => (
            <div
              key={date}
              className="flex flex-col lg:flex-row gap-8 px-2 py-4 lg:px-8 lg:py-8 rounded-lg bg-[rgba(255,255,255,0.1)]"
            >
              <div className="[&>p]:inline lg:[&>p]:block shrink-0 text-center">
                <p className="text-2xl font-semibold">{date}</p>
                <p className="text-2xl font-semibold">
                  ({renderWeekday(weekday)})
                </p>
              </div>
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-12">
                {matches.map((match, index) => (
                  <div key={match._id}>
                    <div className="bg-gray-900 py-1 px-4 rounded-full mb-2">
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
                          {match.result && (
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
                      <ScheduleTeam match={match} playerIndex="playerEast" />
                      <ScheduleTeam match={match} playerIndex="playerSouth" />
                      <ScheduleTeam match={match} playerIndex="playerWest" />
                      <ScheduleTeam match={match} playerIndex="playerNorth" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
