"use client";

import { ParallaxBanner } from "react-scroll-parallax";
import LargePlayerPortrait from "../_components/LargePlayerPortrait";
import { V2Match } from "@/models/V2Match.model";
import { renderDateToLongForm } from "@/helpers/string.helper";

export default function NextMatchSection({
  nextMatch,
}: {
  nextMatch: V2Match;
}) {
  return (
    <ParallaxBanner
      layers={[{ image: "/images/bg-sakura-2.webp", speed: -45 }]}
      className="min-h-screen laptop:min-h-[680px]"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container max-w-tablet mx-auto px-4">
          <div className="text-center mb-8 text-4xl">
            <p className="mb-2">下一場出賽選手</p>
            <p>{renderDateToLongForm(nextMatch.data.startAt)}</p>
          </div>

          <div className="grid grid-cols-2 laptop:grid-cols-4 gap-4 laptop:gap-8 text-[24px]">
            <LargePlayerPortrait player={nextMatch.data.players[0]} />
            <LargePlayerPortrait player={nextMatch.data.players[1]} />
            <LargePlayerPortrait player={nextMatch.data.players[2]} />
            <LargePlayerPortrait player={nextMatch.data.players[3]} />
          </div>
          <div className="mt-4">
            <div>
              <a
                href="https://www.youtube.com/@HKMAHJONG/streams"
                target="_blank"
              >
                <i className="bi bi-youtube"></i> @HKMAHJONG
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/hk_sakura_league/"
                target="_blank"
              >
                <i className="bi bi-instagram"></i> @hk_sakura_league
              </a>
            </div>
          </div>
        </div>
      </div>
    </ParallaxBanner>
  );
}
