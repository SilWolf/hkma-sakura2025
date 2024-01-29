import {
  MatchDTO,
  TeamPlayerDTO,
  getLastDateFinishedMatchesGroupedByDate,
  getLatestComingMatchesGroupedByDate,
  getOldMatches,
  getTeams,
} from "@/helpers/sanity.helper";
import {
  renderPoint,
  renderRanking,
  renderWeekday,
} from "@/helpers/string.helper";
import Link from "next/link";
import W3IssueCard from "./_components/W3IssueCard";

export const revalidate = 900;

const ScheduleTeam = ({
  match,
  playerIndex,
}: {
  match: MatchDTO;
  playerIndex: "playerEast" | "playerSouth" | "playerWest" | "playerNorth";
}) => {
  const point = match.result?.[playerIndex]?.point;
  const isLoser = match.result && match.result?.[playerIndex]?.ranking !== "1";

  return (
    <div>
      <a href={`/teams/${match[playerIndex].teamSlug}`} target="_blank">
        <img
          src={match[playerIndex].teamLogoImageUrl + "?w=512&auto=format"}
          className="w-full"
          alt={match[playerIndex].teamName}
          style={{
            opacity: isLoser ? 0.4 : 1,
            filter: isLoser ? "grayscale(100%)" : "",
          }}
        />
      </a>
      {match.result && (
        <p className="text-center text-sm">{renderPoint(point)}pt</p>
      )}
    </div>
  );
};

const TeamLogoForIntro = ({ team }: { team: TeamPlayerDTO }) => {
  return (
    <a href={`/teams/${team.teamSlug}`} target="_blank">
      <img
        src={team.teamLogoImageUrl + "?w=320&auto=format"}
        alt={team.teamFullname}
      />
    </a>
  );
};

export default async function Home() {
  const [
    tournamentTeams,
    lastMatchesGroupedByDate,
    comingMatchesGroupedByDate,
    oldMatches,
  ] = await Promise.all([
    getTeams(),
    getLastDateFinishedMatchesGroupedByDate(),
    getLatestComingMatchesGroupedByDate(),
    getOldMatches(),
  ]);

  const tournamentTeamsOrderedByRanking = tournamentTeams.sort(
    (a, b) => a.ranking - b.ranking
  );

  return (
    <main>
      <section className="w-full text-center relative overflow-hidden pt-12">
        <div className="w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          {/* <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/Kp_UppkAiCk?si=Va0LX5hMdsdeQXzO&controls=0&start=1878&autoplay=1&mute=1&playsinline=1"
          ></iframe> */}
          <div className="grid grid-cols-4 lg:grid-cols-6 items-center justify-center text-center max-w-screen-xl mx-auto">
            {tournamentTeams.map(({ team }) => (
              <div key={team.teamSlug}>
                <img
                  src={team.teamLogoImageUrl + "?w=512&auto=format"}
                  className="w-48"
                  alt={team.teamSlug}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 md:pt-20 pb-20 relative z-10 text-center">
          <div className="container px-2 mx-auto flex flex-col sm:flex-row justify-center items-stretch gap-4">
            <div className="shrink-0 animate-fadeInFromLeft">
              <img
                src="/images/logo.png"
                className="block mx-auto w-36 h-36 xl:w-40 xl:h-40"
                alt="HK-League"
              />
            </div>
            <div className="text-center sm:text-left flex flex-col justify-between pb-[4px] animate-fadeInFromRight">
              <h1
                className="text-[48px] sm:text-[56px] md:text-[72px] lg:text-[96px] leading-[1] sm:leading-[1.1] md:leading-[0.8] font-serif font-semibold"
                style={{
                  textShadow: "#00000080 0 0 1em, #00000080 0 0 0.5em",
                }}
              >
                HK-League 2024
              </h1>
              <h2
                className="text-[24px] whitespace-pre-wrap sm:whitespace-nowrap sm:text-[32px] leading-[1.2] sm:leading-[1]"
                style={{
                  textShadow: "#00000080 0 0 1em, #00000080 0 0 0.5em",
                }}
              >
                香港麻雀協會
                <br />
                香港立直麻雀團體聯賽2024
              </h2>
            </div>
          </div>
          <div className="flex justify-center gap-x-2 mx-auto mt-8">
            <a href="https://www.hkmahjong.org/" target="_blank">
              <img
                className="h-16"
                src="/images/logo-hkma.webp"
                alt="香港麻雀協會 Hong Kong Mahjong Association"
              />
            </a>
          </div>
        </div>
      </section>

      {/* <section
        className="py-12 bg-[url('/images/bg-3.jpg')] bg-cover bg-center"
        style={{ backgroundColor: "#85753c" }}
      >
        <div className="container max-w-screen-md px-2 mx-auto">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <h1 className="font-semibold text-4xl shrink-0">
              <span>常規賽 #01</span>
            </h1>
            <div className="font-semibold pl-2 pr-3 pb-1 rounded-full bg-red-500">
              <i className="bi bi-record-fill"></i> LIVE
            </div>
          </div>

          <div className="max-w-screen-sm mx-auto grid grid-cols-4 mt-8">
            <img src="/images/logo-team1.webp" alt="" />
            <img src="/images/logo-team2.webp" alt="" />
            <img src="/images/logo-team3.webp" alt="" />
            <img src="/images/logo-team4.webp" alt="" />
          </div>

          <div className="mt-8">
            <iframe
              title="常規賽 #01"
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/Kp_UppkAiCk?si=eXOxZCGAvv5TwRFY&mute=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section> */}

      <section>
        <div className="container max-w-screen-md px-2 mx-auto">
          <W3IssueCard />
        </div>
      </section>

      <section className="py-24">
        <div className="container px-2 mx-auto text-center flex flex-col lg:flex-row gap-8 gap-y-16">
          <div className="flex-1">
            <h2 className="font-semibold text-4xl mb-10">最新賽果</h2>

            <div className="space-y-6">
              {lastMatchesGroupedByDate.map(({ date, weekday, matches }) => (
                <div
                  key={date}
                  className="flex flex-col lg:flex-row gap-4 px-2 py-4 lg:px-4 lg:py-4 rounded-lg bg-[rgba(255,255,255,0.1)]"
                >
                  <div className="[&>p]:inline lg:[&>p]:block shrink-0 text-center">
                    <p className="text-2xl font-semibold">{date}</p>
                    <p className="text-2xl font-semibold">
                      ({renderWeekday(weekday)})
                    </p>
                  </div>
                  <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-4">
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
                          {match._order.map((playerIndex) => (
                            <ScheduleTeam
                              key={playerIndex}
                              match={match}
                              playerIndex={playerIndex}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-semibold text-4xl mb-10 mt-12">賽程</h2>

            <div className="space-y-6">
              {comingMatchesGroupedByDate.map(({ date, weekday, matches }) => (
                <div
                  key={date}
                  className="flex flex-col lg:flex-row gap-4 px-2 py-4 lg:px-4 lg:py-4 rounded-lg bg-[rgba(255,255,255,0.1)] first-of-type:bg-cyan-900"
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
                        {matches[0]._order.map((playerIndex) => (
                          <ScheduleTeam
                            key={playerIndex}
                            match={matches[0]}
                            playerIndex={playerIndex}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="container mx-auto text-center mt-8">
              <Link
                className="inline-block text-lg rounded-full py-4 px-12 hover:opacity-80 bg-[#1abced]"
                href="/schedule"
              >
                其他賽事
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-4xl mb-4">排名</h2>
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
                  ({ team, ranking, point, matchCount }, i) => (
                    <tr
                      key={team.teamId}
                      style={{
                        background: `linear-gradient(to right, ${team.color}B0, ${team.color}A0)`,
                      }}
                    >
                      <td scope="row">
                        <span className="hidden sm:inline">
                          {renderRanking(ranking)}
                        </span>
                        <span className="sm:hidden">{ranking}</span>
                      </td>
                      <td className="w-10 !p-0">
                        <img
                          src={team.teamLogoImageUrl + "?w=128&auto=format"}
                          alt={team.teamFullname}
                        />
                      </td>
                      <td>
                        <span className="text-sm sm:text-xl">
                          {team.teamFullname}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs sm:text-base">
                          {point?.toFixed(1) ?? "-"}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs sm:text-base">
                          {tournamentTeamsOrderedByRanking[i - 1]
                            ? (
                                tournamentTeamsOrderedByRanking[i - 1].point -
                                point
                              ).toFixed(1)
                            : "-"}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs sm:text-base">
                          {matchCount}
                        </span>
                        <span className="hidden sm:inline sm:text-sm">/60</span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="mt-8">
              <Link
                className="inline-block text-lg rounded-full py-4 px-12 hover:opacity-80 bg-[#1abced]"
                href="/ranking"
              >
                詳細數據
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[url('/images/bg-1.jpg')] bg-cover bg-center">
        <div className="container px-2 mx-auto flex justify-center items-center lg:[&_img]:w-32 lg:[&_img]:h-32 xl:[&_img]:w-48 xl:[&_img]:h-48 2xl:[&_img]:w-48 2xl:[&_img]:h-48 [&_img]:inline-block [&_img]:transition-transform hover:[&_img]:scale-110">
          <div className="flex-1 hidden lg:block">
            <div className="flex flex-col items-end">
              <div>
                <TeamLogoForIntro team={tournamentTeams[0].team} />
                <TeamLogoForIntro team={tournamentTeams[1].team} />
              </div>
              <div className="pr-[12%]">
                <TeamLogoForIntro team={tournamentTeams[2].team} />
                <TeamLogoForIntro team={tournamentTeams[3].team} />
              </div>
              <div>
                <TeamLogoForIntro team={tournamentTeams[4].team} />
                <TeamLogoForIntro team={tournamentTeams[5].team} />
              </div>
            </div>
          </div>
          <div className="shrink-[1] text-center space-y-12 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2 sm:[&_h3]:text-2xl">
            <div>
              <h3>至今為止最長賽程的香港日麻比賽</h3>
              <p>
                2024年1月-11月，共有十二隊隊伍角逐由
                <br />
                香港麻雀協會首次舉辦的立直麻雀團體聯賽冠軍
              </p>
            </div>
            <div>
              <h3>12支隊伍、48名選手</h3>
              <p>
                選手們喜愛立直麻雀，更視之為一種專業
                <br />
                大家組成隊伍，藉此在聯賽中證明自己的努力
              </p>
            </div>
            <div>
              <h3>長達八個月的常規賽</h3>
              <p>
                八個月裡，每隊將進行多達60場半莊
                <br />
                被降低的運氣性及多元的對局組合，將使排名更有意義
              </p>
            </div>
            <div>
              <h3>最終只為決定一支勝隊</h3>
              <p>
                六支隊伍進入合計36場半莊的準決賽
                <br />
                四支隊伍進入合計16場半莊的總決賽
                <br />
                最終勝出者將實至名歸
              </p>
            </div>
          </div>

          <div className="flex-1 hidden lg:block">
            <div className="flex flex-col items-start">
              <div>
                <TeamLogoForIntro team={tournamentTeams[6].team} />
                <TeamLogoForIntro team={tournamentTeams[7].team} />
              </div>
              <div className="pl-[12%]">
                <TeamLogoForIntro team={tournamentTeams[8].team} />
                <TeamLogoForIntro team={tournamentTeams[9].team} />
              </div>
              <div>
                <TeamLogoForIntro team={tournamentTeams[10].team} />
                <TeamLogoForIntro team={tournamentTeams[11].team} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 block relative overflow-hidden lg:hidden h-48 sm:h-64 [&>div]:absolute [&>div]:w-24 [&>div]:h-24 sm:[&>div]:w-32 sm:[&>div]:h-32 [&>div]:animate-carousel [&_img]:w-24 [&_img]:h-24 sm:[&_img]:w-32 sm:[&_img]:h-32">
          <div>
            <TeamLogoForIntro team={tournamentTeams[0].team} />
          </div>
          <div style={{ animationDelay: "-5s" }}>
            <TeamLogoForIntro team={tournamentTeams[1].team} />
          </div>
          <div style={{ animationDelay: "-10s" }}>
            <TeamLogoForIntro team={tournamentTeams[2].team} />
          </div>
          <div style={{ animationDelay: "-15s" }}>
            <TeamLogoForIntro team={tournamentTeams[3].team} />
          </div>
          <div style={{ animationDelay: "-20s" }}>
            <TeamLogoForIntro team={tournamentTeams[4].team} />
          </div>
          <div style={{ animationDelay: "-25s" }}>
            <TeamLogoForIntro team={tournamentTeams[5].team} />
          </div>
          <div className="bottom-0" style={{ animationDirection: "reverse" }}>
            <TeamLogoForIntro team={tournamentTeams[6].team} />
          </div>
          <div
            className="bottom-0"
            style={{ animationDirection: "reverse", animationDelay: "-5s" }}
          >
            <TeamLogoForIntro team={tournamentTeams[7].team} />
          </div>
          <div
            className="bottom-0"
            style={{
              animationDirection: "reverse",
              animationDelay: "-10s",
            }}
          >
            <TeamLogoForIntro team={tournamentTeams[8].team} />
          </div>
          <div
            className="bottom-0"
            style={{
              animationDirection: "reverse",
              animationDelay: "-15s",
            }}
          >
            <TeamLogoForIntro team={tournamentTeams[9].team} />
          </div>
          <div
            className="bottom-0"
            style={{
              animationDirection: "reverse",
              animationDelay: "-20s",
            }}
          >
            <TeamLogoForIntro team={tournamentTeams[10].team} />
          </div>
          <div
            className="bottom-0"
            style={{
              animationDirection: "reverse",
              animationDelay: "-25s",
            }}
          >
            <TeamLogoForIntro team={tournamentTeams[11].team} />
          </div>
        </div>
        <div className="container mx-auto text-center mt-8">
          <Link
            className="inline-block text-lg rounded-full py-4 px-12 hover:opacity-80 bg-[#1abced]"
            href="/teams"
          >
            點我觀看隊伍介紹
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-2 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center [&_i.bi]:text-[64px] [&_h3]:font-semibold [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:mb-2">
          <div>
            <div>
              <i className="bi bi-calendar2-week"></i>
            </div>
            <h3>超過200場半莊的大型聯賽</h3>
            <p>
              所有隊伍在經過總計60場半莊的常規賽後，
              <br />
              排名最高的六隊及四隊，依序進入準決賽和總決賽。
            </p>
          </div>
          <div>
            <div>
              <i className="bi bi-camera-reels"></i>
            </div>
            <h3>全程直播所有賽事</h3>
            <p>
              廣東話旁述、清晰的分數變化及顯示，
              <br />在 Youtube 及 Bilibili 上播放。
            </p>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <div>
              <i className="bi bi-person-up"></i>
            </div>
            <h3>選手賽後訪問及數據</h3>
            <p>
              觀摩強者打法、學習更豐富的日麻思路，
              <br />
              無論新手或老手都能在立直麻雀競技上取得進步。
            </p>
          </div>
        </div>
      </section>

      <section className="py-12" id="old-matches">
        <div className="container px-2 mx-auto">
          <div className="flex items-end justify-center sm:justify-between mb-8">
            <h2 className="font-semibold text-4xl">對局紀錄</h2>
            <p className="hidden sm:block pr-2">
              <Link href="/schedule">觀看全部對局 &gt;</Link>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-12">
            {oldMatches.map((match) => (
              <a
                className="block"
                href={match.youtubeUrl ?? "#"}
                target="_blank"
                key={match._id}
              >
                <div className="bg-neutral-800 rounded aspect-video">
                  {match.youtubeThumbnailUrl && (
                    <img
                      src={match.youtubeThumbnailUrl}
                      className="w-full rounded aspect-[4/3]"
                      alt={match.name}
                    />
                  )}
                </div>
                <div className="flex flex-row justify-between items-center sm:pr-1 mt-1">
                  <div>
                    <p>{match.name}</p>
                    <p className="text-sm text-neutral-300">
                      {match.startAt?.substring(0, 10)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2">
                    <img
                      src={
                        match.playerEast.teamLogoImageUrl + "?w=128&auto=format"
                      }
                      className="inline w-10 h-10"
                      alt=""
                    />
                    <img
                      src={
                        match.playerSouth.teamLogoImageUrl +
                        "?w=128&auto=format"
                      }
                      className="inline w-10 h-10"
                      alt=""
                    />
                    <img
                      src={
                        match.playerWest.teamLogoImageUrl + "?w=128&auto=format"
                      }
                      className="inline w-10 h-10"
                      alt=""
                    />
                    <img
                      src={
                        match.playerNorth.teamLogoImageUrl +
                        "?w=128&auto=format"
                      }
                      className="inline w-10 h-10"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-12 sm:hidden text-center">
            <Link
              className="inline-block rounded-full py-2 px-6 hover:opacity-80 border text-[#1abced] border-[#1abced]"
              href="/schedule"
            >
              觀看全部對局
            </Link>
          </div>
        </div>
      </section>

      {/* <section className="py-12" id="new-players">
        <div className="container px-2 mx-auto">
          <h2 className="text-center sm:text-left font-semibold text-4xl mb-8">
            新手專區
          </h2>
          <p>（Dicky: 想放新手教學既文章、友站連結、Youtube片之類，求提供）</p>
        </div>
      </section> */}
    </main>
  );
}
