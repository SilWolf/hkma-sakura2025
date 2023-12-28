import { getPlayersGroupByTeams, getTeams } from "@/helpers/sanity.helper";
import Link from "next/link";

export const revalidate = 900;

export default async function Teams() {
  const [tournamentTeams, playersInTeamIds] = await Promise.all([
    getTeams(),
    getPlayersGroupByTeams(),
  ]);

  return (
    <main className="pt-10 pb-10 relative">
      <h2 className="text-center text-5xl font-semibold">聯賽隊伍</h2>

      <section className="py-8 sticky top-0 z-50 bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-transparent">
        <div className="container mx-auto max-w-screen-lg bg-neutral-800 p-4 rounded-full shadow-xl">
          <nav className="flex justify-center items-center">
            {tournamentTeams.map(({ team }) => (
              <div key={team.slug} className="flex-1 text-center">
                <a className="inline-block" href={`#${team.slug}`}>
                  <img
                    src={
                      (team.squareLogoImage ?? "/images/empty.png") +
                      "?w=64&auto=format"
                    }
                    className="w-16 h-16"
                    alt={team.name}
                  />
                </a>
              </div>
            ))}
          </nav>
        </div>
      </section>

      {tournamentTeams.map(({ team }) => (
        <section className="py-20 relative" key={team.slug}>
          <div id={team.slug} className="absolute -top-32"></div>
          <Link href={`/team-detail/${team.slug}`}>
            <div
              className="container mx-auto max-w-screen-lg flex gap-x-12 border-y bg-opacity-20 p-8 relative overflow-hidden"
              style={{
                borderColor: team.color,
                backgroundColor: `${team.color}2D`,
              }}
            >
              <div className="absolute -top-32 -left-[16rem] opacity-[.05] grayscale">
                <img
                  src={
                    (team.squareLogoImage ?? "/images/empty.png") +
                    "?w=512&auto=format"
                  }
                  className="w-[512px] h-[512px] mx-auto"
                  alt={team.name}
                />
              </div>
              <div className="shrink-0 z-10">
                <img
                  src={
                    (team.squareLogoImage ?? "/images/empty.png") +
                    "?w=512&auto=format"
                  }
                  className="w-[240px] h-[240px] mx-auto"
                  alt={team.name}
                />
              </div>
              <div className="flex-1 z-10">
                <h2 className="text-[28px] font-bold mb-4">{team.name}</h2>
                <p className="text-[18px] leading-[36px] whitespace-pre-wrap">
                  {team.description}
                </p>

                <div className="grid grid-cols-2 gap-6 gap-y-8 mt-12">
                  {playersInTeamIds[team._id]?.map((player) => (
                    <div key={player._id} className="flex gap-x-4 items-center">
                      <div className="shrink-0">
                        <img
                          className="aspect-square w-12"
                          src={
                            player.portraitImage +
                            "?w=360&h=360&fit=crop&crop=top&auto=format"
                          }
                          alt={player.name}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{player.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </section>
      ))}
    </main>
  );
}
