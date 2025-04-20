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
import { renderPoint } from "@/helpers/string.helper";
import { Team } from "@/types/index.type";

export const revalidate = 900;

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

  const teamSorter = (a: Team, b: Team) => {
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
        <div className="pt-8 md:pt-32 pb-40 relative z-10 text-center">
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
          <section className="py-8">
            <h2 className="text-[36px] whitespace-pre-wrap sm:whitespace-nowrap sm:text-[44px] leading-[1.5] sm:leading-none">
              詳情即將公佈
            </h2>
          </section>
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
