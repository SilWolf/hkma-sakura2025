import PLAYERS from "@/constants/PLAYERS";
import {
  getPlayersGroupByTeams,
  getRegularTeams,
  getRegularTeamsWithPlayers,
  getTeams,
} from "@/helpers/sanity.helper";
import { Metadata } from "next";
import Link from "next/link";
import PlayerPortraitButton from "./components/PlayerPortraitButton";

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

      <section className="container mx-auto pt-12 pb-24">
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
                      <PlayerPortraitButton
                        key={player.name.display}
                        player={player}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {PLAYERS.map((player) => (
        <dialog
          key={player.name.display}
          id={`modal-${player.name.display}`}
          className="modal **:data-fullbody:transition-all **:data-fullbody:duration-700 **:data-fullbody:-translate-x-[15%] **:data-fullbody:opacity-0 open:**:data-fullbody:opacity-100 open:**:data-fullbody:translate-x-0 **:data-infoblock:transition-all **:data-infoblock:duration-700 **:data-infoblock:translate-x-[10vh] **:data-infoblock:opacity-0 open:**:data-infoblock:opacity-100 open:**:data-infoblock:translate-x-0 **:data-sakura-icon:transition-transform **:data-sakura-icon:duration-700 open:**:data-sakura-icon:-rotate-45"
        >
          <div className="modal-box scale-25 w-full max-w-(--breakpoint-lg) overflow-visible">
            <div className="h-[90vh]">
              <div className="flex h-full">
                <div>
                  <img
                    className="h-full"
                    src={player.fullbody.default.url}
                    alt={player.name.display}
                    data-fullbody
                  />
                </div>
                <div className="flex-1 pt-16">
                  <div className="relative" data-infoblock>
                    <div>
                      <div
                        className="text-[0.5em] inline-block -ml-3 px-4 py-1 rounded-full"
                        style={{
                          color: PLAYER_TYPE_DATA[player.playerType].color,
                          backgroundColor:
                            PLAYER_TYPE_DATA[player.playerType].bgColor,
                        }}
                      >
                        {PLAYER_TYPE_DATA[player.playerType].display}
                      </div>
                    </div>
                    <div className="relative inline-block bg-white rounded-full pl-14 pr-8 pb-2 mt-2 text-[40px] text-center">
                      <img
                        src="/images/sakura-icon-64x64.png"
                        className="absolute -left-4 top-0 w-16 h-16"
                        alt="*"
                        data-sakura-icon
                      />
                      <span>{player.name.display}</span>
                    </div>
                    <div className="px-6 py-2 text-[24px] mt-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      ))}
    </main>
  );
}
