import PLAYERS, { PLAYER_TYPE_DATA } from "@/constants/PLAYERS";
import { Metadata } from "next";
import PlayerSwiperDialog from "./components/PlayerSwiperDialog";
import PlayerPortraitButton from "./components/PlayerPortraitButton";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "參賽選手",
};

export default async function Players() {
  return (
    <main className="relative">
      {/* <section className="pt-10 pb-10">
        <h2 className="text-center text-4xl laptop:text-5xl font-semibold">
          參賽選手
        </h2>
      </section> */}

      <section className="container mx-auto tablet:pt-12 pb-12">
        <div className="grid grid-cols-2 laptop:gap-2">
          {(["hklplayer", "challenger"] as const).map((type) => (
            <div key={type}>
              <div
                className="hidden tablet:block text-center py-1 rounded-t-[20px]"
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
                <div className="grid grid-cols-1 laptop:grid-cols-3 gap-4 justify-center">
                  {PLAYERS.filter(({ playerType }) => playerType === type).map(
                    (player) => (
                      <PlayerPortraitButton player={player} key={player.id} />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PlayerSwiperDialog />
    </main>
  );
}
