import PLAYERS from "@/constants/PLAYERS";
import {
  getPlayersGroupByTeams,
  getRegularTeams,
  getRegularTeamsWithPlayers,
  getTeams,
} from "@/helpers/sanity.helper";
import { Metadata } from "next";
import Link from "next/link";

const PLAYER_TYPE_DATA = {
  hklplayer: {
    bgColor: "#F400E0",
    bgColorLight: "#fadef8",
    color: "#FFFFFF",
    display: "HKL Player",
  },
  challenger: {
    bgColor: "#9078B5",
    bgColorLight: "#e7d9fc",
    color: "#FFFFFF",
    display: "Challenger",
  },
} as const;

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "參賽選手",
};

export default async function Teams() {
  const tournamentTeams = await getRegularTeamsWithPlayers();

  return (
    <main className="relative">
      {/* <section className="pt-10 pb-10">
        <h2 className="text-center text-4xl lg:text-5xl font-semibold">
          參賽選手
        </h2>
      </section> */}

      <section className="container mx-auto pb-24">
        <div className="grid grid-cols-2 gap-2">
          {(["hklplayer", "challenger"] as const).map((type) => (
            <div key={type}>
              <div
                className="text-center py-1 rounded-t-[20px]"
                style={{
                  background: PLAYER_TYPE_DATA[type].bgColor,
                  color: PLAYER_TYPE_DATA[type].color,
                }}
              >
                {PLAYER_TYPE_DATA[type].display}
              </div>
              <div
                className="border-l-[3px] border-r-[3px] border-b-[3px] rounded-b-[20px] p-4"
                style={{
                  borderColor: PLAYER_TYPE_DATA[type].bgColor,
                  backgroundColor: PLAYER_TYPE_DATA[type].bgColorLight,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-center">
                  {PLAYERS.filter(({ playerType }) => playerType === type).map(
                    (player) => (
                      <div key={player.name.display} className="relative">
                        <img
                          src="/images/logo-sakura-notext.png"
                          className="absolute opacity-50"
                        />
                        <img
                          className="relative z-10 rounded-full"
                          src={player.portrait.default.url}
                          alt={player.name.display}
                        />
                        <div className="absolute z-10 bottom-2 left-2 right-2 bg-white rounded-full pl-[12px] pb-[4px] text-[20px] leading-[28px] text-center">
                          <img
                            src="/images/sakura-icon-64x64.png"
                            className="absolute -left-2 top-0 w-8 h-8"
                            alt="*"
                          />
                          <span className="whitespace-nowrap">
                            {player.name.display}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto pb-24">
        {PLAYERS.map((player) => (
          <div
            key={player.name.display}
            className="relative h-[100vh] pt-[10vh] pb-[5vh] pl-[275px]"
          >
            <img
              className="absolute left-0 top-0 h-[90vh] z-10"
              src={player.fullbody.default.url}
              alt={player.name.display}
            />

            <div className="relative">
              <div className="inline-block bg-white rounded-full pl-16 pr-8 pb-2 text-[40px] text-center">
                <img
                  src="/images/sakura-icon-64x64.png"
                  className="absolute -left-2 top-0 w-16 h-16"
                  alt="*"
                />
                <span>{player.name.display}</span>
              </div>
              <div className="-ml-[150px] pl-[220px] bg-white bg-opacity-25 rounded-[4em] px-[4em] py-[1em] text-[24px] mt-4">
                abc
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
