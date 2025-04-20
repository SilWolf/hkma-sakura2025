"use client";

import { SakuraPlayer } from "@/constants/PLAYERS";

const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
  const targetModalId = `modal-${e.currentTarget.getAttribute("data-name")}`;
  (document.getElementById(targetModalId) as HTMLDialogElement)?.showModal();
};

export default function PlayerPortraitButton({
  player,
}: {
  player: SakuraPlayer;
}) {
  return (
    <button
      key={player.name.display}
      onClick={handleClickButton}
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
        <span className="whitespace-nowrap">{player.name.display}</span>
      </div>
    </button>
  );
}
