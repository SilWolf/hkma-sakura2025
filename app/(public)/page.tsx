import {
  renderDateToShortForm,
  renderWeekdayByISODateString,
} from "@/helpers/string.helper";
import {
  apiGetLatestComingMatches,
  apiGetLatestCompletedMatches,
} from "@/services/match.service";
import { apiGetTournament } from "@/services/tournament.service";
import Link from "next/link";
import NextMatchSection from "./_widgets/NextMatchSection";
import RankingSection from "./_widgets/RankingSection";
import SakuraInstagramEmbed from "./_widgets/SakuraInstagramEmbed";
import LargePlayerPortrait from "./_components/LargePlayerPortrait";

export const revalidate = 900;

export default async function Home() {
  const [latestCompletedMatches, latestComingMatches] = await Promise.all([
    apiGetLatestCompletedMatches(),
    apiGetLatestComingMatches(),
  ]);
  const { players } = await apiGetTournament();

  const currentMatch = latestCompletedMatches[0]?.mergedMatch;
  const comingMatches = latestComingMatches
    .slice(0, 2)
    .map(({ mergedMatch }) => mergedMatch);
  const nextMatch = latestComingMatches[0]?.mergedMatch;

  return (
    <main>
      {nextMatch && (
        <section className="pb-12">
          <NextMatchSection nextMatch={nextMatch} />
        </section>
      )}

      {/* <div className="container mx-auto max-w-4xl grid grid-cols-4">
        {players.map((player) => (
          <img key={player._id} src={player.image.riichi?.default.url ?? ""} />
        ))}
      </div> */}

      <section className="py-0 laptop:py-12">
        <div className="container px-2 mx-auto text-center flex flex-col laptop:flex-row gap-8 gap-y-16">
          <div className="flex-1">
            <h2 className="font-semibold text-4xl mb-4">最新賽果</h2>

            <div className="space-y-6">
              {
                <div
                  key={currentMatch.data.startAt}
                  className="flex flex-col laptop:flex-row gap-2 laptop:gap-4"
                >
                  <div className="flex items-center justify-between laptop:justify-start gap-4 flex-row laptop:flex-col">
                    <div className="flex flex-row laptop:flex-col items-center">
                      <p className="text-2xl font-semibold">
                        {renderDateToShortForm(currentMatch.data.startAt)}
                      </p>
                      <p className="text-2xl font-semibold">
                        (
                        {renderWeekdayByISODateString(
                          currentMatch.data.startAt
                        )}
                        )
                      </p>
                    </div>
                    <div>
                      {currentMatch.data.result && (
                        <Link href={`/matches/${currentMatch.code}`}>
                          <button className="btn btn-secondary">詳情</button>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 gap-x-6 gap-y-12">
                    <div>
                      <div className="grid grid-cols-2 laptop:grid-cols-4 gap-2 text-[24px]">
                        <LargePlayerPortrait
                          player={currentMatch.data.players[0]}
                          point={currentMatch.data.result?.playerEast.point}
                          ranking={currentMatch.data.result?.playerEast.ranking}
                        />
                        <LargePlayerPortrait
                          player={currentMatch.data.players[1]}
                          point={currentMatch.data.result?.playerSouth.point}
                          ranking={
                            currentMatch.data.result?.playerSouth.ranking
                          }
                        />
                        <LargePlayerPortrait
                          player={currentMatch.data.players[2]}
                          point={currentMatch.data.result?.playerWest.point}
                          ranking={currentMatch.data.result?.playerWest.ranking}
                        />
                        <LargePlayerPortrait
                          player={currentMatch.data.players[3]}
                          point={currentMatch.data.result?.playerNorth.point}
                          ranking={
                            currentMatch.data.result?.playerNorth.ranking
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>

            <h2 className="font-semibold text-4xl mt-8 mb-4">賽程</h2>

            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 laptop:gap-8">
              {comingMatches.map((match) => (
                <div key={match.data.startAt} className="">
                  <div className="text-center mb-2">
                    <p className="text-xl font-semibold">
                      {renderDateToShortForm(match.data.startAt)} (
                      {renderWeekdayByISODateString(match.data.startAt)})
                    </p>
                  </div>
                  <div className="flex-1 gap-x-6 gap-y-12">
                    <div>
                      <div className="grid grid-cols-4 gap-2 text-[16px]">
                        {match.data.players.map((player) => (
                          <LargePlayerPortrait
                            key={player.id}
                            player={player}
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
          <div className="w-full laptop:w-[360px]">
            <SakuraInstagramEmbed />
          </div>
        </div>
      </section>

      <section className="py-12">
        <a id="ranking" />
        <RankingSection players={players} />
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
