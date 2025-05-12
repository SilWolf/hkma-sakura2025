"use client";

import PlayerDetailsSwiper from "../widgets/PlayerDetailsSwiper";

export const openPlayerSwiperDialog = () => {
  (
    document.getElementById("players-swiper-dialog") as HTMLDialogElement
  )?.showModal();
};

export default function PlayerSwiperDialog() {
  return (
    <dialog id="players-swiper-dialog" className="modal w-full max-w-screen">
      <div className="modal-box max-w-screen w-full bg-transparent p-0">
        <div className="w-full">
          <PlayerDetailsSwiper />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
