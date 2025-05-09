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
    <section className="py-12">
      <ParallaxBanner
        layers={[{ image: "/images/bg-sakura-2.webp", speed: -15 }]}
        className="min-h-[480px]"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container max-w-4xl mx-auto">
            <div className="grid grid-cols-4 gap-x-8">
              <LargePlayerPortrait player={nextMatch.data.players[0]} />
              <LargePlayerPortrait player={nextMatch.data.players[1]} />
              <LargePlayerPortrait player={nextMatch.data.players[2]} />
              <LargePlayerPortrait player={nextMatch.data.players[3]} />
            </div>
            <div className="text-center mt-8 text-4xl">
              {renderDateToLongForm(nextMatch.data.startAt)}
            </div>
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
      </ParallaxBanner>
    </section>
  );
}
