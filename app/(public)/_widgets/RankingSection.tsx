"use client";

import { ParallaxBanner } from "react-scroll-parallax";
import { V2MatchPlayer } from "@/models/V2Match.model";

type PlayerAndValue = {
  player: V2MatchPlayer;
  value: React.ReactNode;
};

function RankingList({
  items,
  title,
  rightColText,
}: {
  items: PlayerAndValue[];
  title: React.ReactNode;
  rightColText: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-center text-lg font-bold mb-2">{title}</div>
      <div className="flex gap-x-2 justify-between pl-2 pr-6">
        <div>順位</div>
        <div>選手</div>
        <div>{rightColText}</div>
      </div>
      <div>
        {items.map((item, index) => (
          <RankingListItem
            key={item.player.id}
            item={item}
            ranking={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

function RankingListItem({
  ranking,
  item,
}: {
  ranking: number;
  item: PlayerAndValue;
}) {
  return (
    <div
      className={`flex gap-x-2 items-center pl-2 pr-6 py-1 rounded-lg ${
        ranking === 1
          ? "bg-primary text-primary-content font-bold"
          : ranking <= 3
          ? "font-bold"
          : ""
      }`}
    >
      <div
        className={`w-9 h-9 leading-8 text-center rounded-full ${
          ranking === 1
            ? "bg-primary-content text-primary text-xl font-bold"
            : ranking <= 3
            ? "text-xl"
            : "text-sm"
        }`}
      >
        {ranking}
      </div>
      <div
        className="w-9 h-9 bg-cover bg-top bg-white border-1 rounded-full"
        style={{
          backgroundImage: `url("${item.player.image.portrait?.default.url}")`,
          borderColor: item.player.color.primary,
        }}
      ></div>
      <div className="flex-1">{item.player.name.display.primary}</div>
      <div>{item.value}</div>
    </div>
  );
}

export default function RankingSection({
  players,
}: {
  players: V2MatchPlayer[];
}) {
  const rankingPlayersByTotalPoint = players
    .toSorted((a, b) => (b.statistics?.point ?? 0) - (a.statistics?.point ?? 0))
    .map((player) => ({
      player,
      value: player.statistics?.point?.toFixed(1) ?? "0.0",
    }));

  const rankingPlayersByHighestScore = players
    .toSorted(
      (a, b) => (b.statistics?.scoreMax ?? 0) - (a.statistics?.scoreMax ?? 0)
    )
    .map((player) => ({
      player,
      value: player.statistics?.scoreMax?.toFixed(0) ?? "0.000",
    }));

  const rankingPlayersByNonFourthP = players
    .toSorted(
      (a, b) =>
        (a.statistics?.nonFourthP ?? 0) - (b.statistics?.nonFourthP ?? 0)
    )
    .map((player) => ({
      player,
      value: player.statistics?.nonFourthP?.toFixed(3) ?? "0.000",
    }));

  return (
    <ParallaxBanner
      layers={[{ image: "/images/bg-sakura-2.webp", speed: -45 }]}
      className="min-h-screen"
    >
      <div className="absolute inset-0 flex items-center justify-center pt-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-x-8">
            <div>
              <RankingList
                items={rankingPlayersByTotalPoint}
                title="最高分數"
                rightColText="分數"
              />
            </div>
            <div>
              <RankingList
                items={rankingPlayersByHighestScore}
                title="半莊最高得點"
                rightColText="點數"
              />
            </div>
            <div>
              <RankingList
                items={rankingPlayersByNonFourthP}
                title="避四排名"
                rightColText="避四率"
              />
            </div>
          </div>
        </div>
      </div>
    </ParallaxBanner>
  );
}
