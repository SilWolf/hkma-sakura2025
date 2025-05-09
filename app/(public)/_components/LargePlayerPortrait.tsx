import { V2MatchPlayer } from "@/models/V2Match.model";

export default function LargePlayerPortrait({
  player,
}: {
  player: V2MatchPlayer;
}) {
  return (
    <div className="relative">
      <div
        className="relative rounded-4xl overflow-hidden pt-4"
        style={{ backgroundColor: `${player.color.primary}80` }}
      >
        <img
          className="absolute -top-0 -right-[30%] opacity-75 w-full aspect-square"
          src={player.image.riichi?.default.url}
          alt={player.name.display.primary}
        />

        <img
          className="relative w-full aspect-[18/25] z-10 right-8"
          src={player.image.portrait?.default.url}
          alt={player.name.display.primary}
        />
      </div>

      <div className="absolute z-10 bottom-0 left-0 right-0 bg-white rounded-full pl-[12px] pb-[4px] text-[28px] leading-[36px] text-center shadow">
        <img
          src="/images/sakura-icon-64x64.png"
          className="absolute -left-4 -top-1 w-12 h-12"
          alt="*"
          data-sakura-icon
        />
        <span className="whitespace-nowrap">{player.name.display.primary}</span>
      </div>
    </div>
  );
}
