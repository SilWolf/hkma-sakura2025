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
      modules={[HashNavigation, EffectCoverflow]}
      spaceBetween={0}
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
          <div className="relative card shadow bg-base-100 w-full max-w-(--breakpoint-laptop) overflow-y-scroll laptop:mx-12">
            <div className="h-[800px] max-h-screen laptop:max-h-[90vh]">
              <div
                className="block laptop:hidden w-full aspect-square overflow-hidden bg-cover bg-top sticky top-0"
                style={{
                  backgroundImage: `url("${player.fullbody.default.url}")`,
                  backgroundColor: PLAYER_TYPE_DATA[player.playerType].bgColor,
                }}
              ></div>
              <div className="flex h-full px-4">
                <div className="hidden laptop:block">
                  <img
                    className="h-full"
                    src={player.fullbody.default.url}
                    alt={player.name.display}
                    data-fullbody
                  />
                </div>
                <div className="flex-1 laptop:pt-8">
                  <div
                    className="relative bg-base-100 -mx-4 px-4"
                    data-infoblock
                  >
                    <div className="flex flex-col items-center laptop:flex-row laptop:flex-start gap-2">
                      <div className="relative text-[24px]">
                        <div className="-mt-20 laptop:mt-0">
                          <div>
                            <div
                              className="text-[0.5em] inline-block -ml-3 px-4 py-1 rounded-full"
                              style={{
                                color:
                                  PLAYER_TYPE_DATA[player.playerType].color,
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
                        </div>

                        <p className="laptop:px-6 laptop:py-2 mt-3">
                          {player.description}
                        </p>
                      </div>
                      <div className="aspect-square w-64 h-64 mt-8">
                        <StatChart stat={player.stat} />
                      </div>
                    </div>
                    <div className="laptop:px-6 py-6 grid grid-cols-1 laptop:grid-cols-2 gap-6">
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
