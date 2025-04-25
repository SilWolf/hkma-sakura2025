"use client";

import PLAYERS, { PLAYER_TYPE_DATA } from "@/constants/PLAYERS";
import StatChart from "../components/StatChart";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, HashNavigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

export default function PlayerDetailsSwiper() {
  return (
    <Swiper
      modules={[Navigation, HashNavigation, EffectCoverflow]}
      spaceBetween={50}
      slidesPerView="auto"
      centeredSlides={true}
      className="player-details-swiper"
      effect="coverflow"
      coverflowEffect={{
        modifier: 0.25,
        rotate: 0,
        scale: 0.8,
        slideShadows: false,
      }}
      navigation
      hashNavigation={{
        watchState: true,
      }}
    >
      {PLAYERS.map((player) => (
        <SwiperSlide
          data-hash={player.id}
          key={player.name.display}
          className="max-w-fit"
        >
          <div className="relative card shadow bg-base-100 px-4 w-full max-w-(--breakpoint-lg) overflow-visible">
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
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
