"use client";

import { PLAYER_TYPE_DATA, SakuraPlayer } from "@/constants/PLAYERS";
import { useCallback } from "react";
import StatChart from "./StatChart";

export default function PlayerDialog({
  player,
  prevPlayer,
  nextPlayer,
}: {
  player: SakuraPlayer;
  prevPlayer: SakuraPlayer;
  nextPlayer: SakuraPlayer;
}) {
  const handleClickPrev = useCallback(() => {
    (
      document.getElementById(
        `modal-${player.name.display}`
      ) as HTMLDialogElement
    )?.close();
    (
      document.getElementById(
        `modal-${prevPlayer.name.display}`
      ) as HTMLDialogElement
    )?.showModal();
  }, [prevPlayer]);
  const handleClickNext = useCallback(() => {
    (
      document.getElementById(
        `modal-${player.name.display}`
      ) as HTMLDialogElement
    )?.close();
    (
      document.getElementById(
        `modal-${nextPlayer.name.display}`
      ) as HTMLDialogElement
    )?.showModal();
  }, [nextPlayer]);

  return (
    <dialog
      key={player.name.display}
      id={`modal-${player.name.display}`}
      className="modal **:data-fullbody:transition-all **:data-fullbody:duration-700 **:data-fullbody:-translate-x-[15%] **:data-fullbody:opacity-0 open:**:data-fullbody:opacity-100 open:**:data-fullbody:translate-x-0 **:data-infoblock:transition-all **:data-infoblock:duration-700 **:data-infoblock:translate-x-[10vh] **:data-infoblock:opacity-0 open:**:data-infoblock:opacity-100 open:**:data-infoblock:translate-x-0 **:data-sakura-icon:transition-transform **:data-sakura-icon:duration-700 open:**:data-sakura-icon:-rotate-45"
    >
      <div className="relative modal-box scale-25 w-full max-w-(--breakpoint-lg) overflow-visible">
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
                <div className="w-64 h-64 float-right">
                  <StatChart stat={player.stat} />
                </div>
                <div className="px-6 py-2 text-[24px] mt-4">
                  <p>{player.description}</p>
                </div>
                <div className="px-6 pt-6 grid grid-cols-2 gap-6 clear-both">
                  {player.metadatas.map(({ label, content }) => (
                    <div key={label}>
                      <div className="text-[14px] opacity-60">{label}</div>
                      <div className="text-[20px]">{content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn absolute text-2xl h-[3em] shadow -left-6 top-1/2"
          onClick={handleClickPrev}
        >
          &lt;
        </button>
        <button
          className="btn absolute text-2xl h-[3em] shadow -right-6 top-1/2"
          onClick={handleClickNext}
        >
          &gt;
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
