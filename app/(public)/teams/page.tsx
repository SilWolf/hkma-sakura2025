import { getPlayersGroupByTeams, getTeams } from "@/helpers/sanity.helper";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "聯賽隊伍",
};

export default async function Teams() {
  const [tournamentTeams, playersInTeamIds] = await Promise.all([
    getTeams(),
    getPlayersGroupByTeams(),
  ]);

  return (
    <main className="relative">
      <section className="pt-10 pb-10">
        <h2 className="text-center text-4xl lg:text-5xl font-semibold">
          聯賽隊伍
        </h2>
      </section>

      <section className="hidden lg:block pb-12 sticky top-0 z-50 bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-transparent">
        <div className="container mx-auto max-w-screen-lg bg-white bg-opacity-10 p-4 rounded-full shadow-xl">
          <nav className="grid grid-cols-4 lg:grid-cols-12 justify-center items-center">
            {tournamentTeams.map(({ team }) => (
              <div key={team.teamSlug} className="text-center">
                <a className="inline-block" href={`#${team.teamSlug}`}>
                  <img
                    src={team.teamLogoImageUrl + "?w=128&auto=format"}
                    className="w-16 h-16"
                    alt={team.teamSlug}
                  />
                </a>
              </div>
            ))}
          </nav>
        </div>
      </section>

      {tournamentTeams.map(({ team }) => (
        <section className="pb-16 relative" key={team.teamSlug}>
          <div id={team.teamSlug} className="absolute -top-32"></div>
          <div className="container px-2 mx-auto max-w-screen-lg">
            <Link href={`/teams/${team.teamSlug}`}>
              <div
                className="flex flex-col md:flex-row gap-6 border-y bg-opacity-20 px-2 md:px-8 py-8 relative overflow-hidden"
                style={{
                  borderColor: team.color,
                  backgroundColor: `${team.color}2D`,
                }}
              >
                <div className="absolute -top-32 -left-[16rem] opacity-[.05] grayscale">
                  <img
                    src={team.teamLogoImageUrl + "?w=512&auto=format"}
                    className="w-[512px] h-[512px] mx-auto"
                    alt={team.teamFullname}
                  />
                </div>
                <div className="shrink-0 z-10">
                  <img
                    src={team.teamLogoImageUrl + "?w=512&auto=format"}
                    className="w-[240px] h-[240px] mx-auto"
                    alt={team.teamFullname}
                  />
                </div>
                <div className="flex-1 z-10">
                  <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
                    {team.teamFullname}
                  </h2>
                  <p className="text-base leading-8 text-justify lg:text-lg lg:leading-9 whitespace-pre-wrap">
                    {team.teamIntroduction}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8 mt-12">
                    {playersInTeamIds[team.teamId]?.map((player) => (
                      <div
                        key={player._id}
                        className="flex gap-x-4 items-center"
                      >
                        <div className="flex-1">
                          <h3 className="text-xl font-bold">{player.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      ))}
    </main>
  );
}
