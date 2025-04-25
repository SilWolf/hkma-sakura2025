import PLAYERS, { PLAYER_TYPE_DATA } from "@/constants/PLAYERS";
import { Metadata } from "next";
import PlayerPortraitButton from "./components/PlayerPortraitButton";
import PlayerDialog from "./components/PlayerDialog";
import PlayerDetailsSwiper from "./widgets/PlayerDetailsSwiper";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "參賽選手",
};

export default async function Players() {
  return (
    <main className="relative">
      {/* <section className="pt-10 pb-10">
        <h2 className="text-center text-4xl lg:text-5xl font-semibold">
          參賽選手
        </h2>
      </section> */}

      <section className="container mx-auto pt-12 pb-12">
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
                      <a
                        key={player.name.display}
                        href={`#${player.id}`}
                        data-name={player.name.display}
                        className="cursor-pointer relative transition-transform hover:scale-110 **:data-sakura-icon:transition-transform hover:**:data-sakura-icon:scale-110 hover:**:data-sakura-icon:rotate-45"
                      >
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
                            data-sakura-icon
                          />
                          <span className="whitespace-nowrap">
                            {player.name.display}
                          </span>
                        </div>
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* {PLAYERS.map((player, index) => (
        <PlayerDialog
          key={player.name.display}
          player={player}
          prevPlayer={PLAYERS[(PLAYERS.length + index - 1) % PLAYERS.length]}
          nextPlayer={PLAYERS[(index + 1) % PLAYERS.length]}
        />
      ))} */}

      <section>
        <div className="pb-12">
          {PLAYERS.map((player) => (
            <a id={player.id} key={player.id} />
          ))}
        </div>
        <PlayerDetailsSwiper />
      </section>
    </main>
  );
}
