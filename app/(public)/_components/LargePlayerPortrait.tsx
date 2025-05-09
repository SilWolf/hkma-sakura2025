import { renderPoint, renderRanking } from "@/helpers/string.helper";
import { V2MatchPlayer } from "@/models/V2Match.model";

export default function LargePlayerPortrait({
  player,
  point,
  ranking,
}: {
  player: V2MatchPlayer;
  point?: number | undefined;
  ranking?: string | undefined;
}) {
  return (
    <div
      className="relative"
      style={{
        opacity: typeof ranking !== "undefined" && ranking !== "1" ? 0.5 : 1,
      }}
    >
      <div
        className="relative rounded-[1.5em] overflow-hidden pt-[0.5em]"
        style={{ backgroundColor: `${player.color.primary}80` }}
      >
        <img
          className="absolute top-0 -right-[30%] opacity-25 w-full aspect-square"
          src={player.image.riichi?.default.url}
          alt={player.name.display.primary}
        />

        <img
          className="relative w-full aspect-[18/25] z-10 right-[5%]"
          src={player.image.portrait?.default.url}
          alt={player.name.display.primary}
        />
      </div>

      <div className="absolute z-10 bottom-0 left-0 right-0">
        <div className="bg-white rounded-full text-[1em] leading-[1.2em] text-center shadow overflow-hidden">
          <img
            src="/images/sakura-icon-64x64.png"
            className="absolute -left-[0.5em] -top-[0.15em] w-[1.75em] h-[1.75em]"
            alt="*"
            data-sakura-icon
          />
          <span className="whitespace-nowrap">
            <p className="pl-[0.5em] pb-[4px]">{player.name.display.primary}</p>
            {typeof point !== "undefined" && (
              <p
                className="pl-[2em] pr-[1.5em] py-[4px] text-[0.75em] leading-[1em] text-primary-content flex justify-between"
                style={{
                  backgroundColor: player.color.primary,
                }}
              >
                <span>{renderPoint(point)}</span>
                <span>{renderRanking(ranking)}</span>
              </p>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
