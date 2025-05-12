import { renderPoint } from "@/helpers/string.helper";
import { V2TournamentTeam } from "@/models/V2Tournament.model";

import styles from "./index.module.css";
import { CSSProperties } from "react";

const BAR_LIMIT = 300.0;

export default function TeamScoreConflictBar({
  teamLeft,
  teamRight,
}: {
  teamLeft: V2TournamentTeam;
  teamRight: V2TournamentTeam;
}) {
  const teamLeftPoint = teamLeft.statistics?.point ?? 0.0;
  const teamRightPoint = teamRight.statistics?.point ?? 0.0;

  const teamLeftWidth =
    (
      (Math.min(
        Math.max(
          (teamLeftPoint - teamRightPoint + BAR_LIMIT) / (BAR_LIMIT * 2),
          0
        ),
        100
      ) *
        0.6 +
        0.2) *
      100
    ).toFixed(3) + "%";

  return (
    <div className="flex relative">
      <div
        className="text-right w-1/2 tablet:w-[var(--width)] text-white pr-6 py-1 tablet:py-3 relative overflow-hidden"
        style={
          {
            "--width": teamLeftWidth,
            backgroundColor: teamLeft.color.primary,
          } as CSSProperties
        }
      >
        <p className="flex flex-col tablet:flex-row justify-end gap-x-2">
          <span>HKL Player</span>
          <span>{renderPoint(teamLeftPoint)}</span>
        </p>
        <div className={`${styles.pulse} pulse-go-to-right`}></div>
      </div>
      <div
        className="flex-1 text-left text-white pl-6 py-1 tablet:py-3 relative overflow-hidden"
        style={{
          backgroundColor: teamRight.color.primary,
        }}
      >
        <p className="flex flex-col tablet:flex-row-reverse justify-end gap-x-2">
          <span>Challenger</span>
          <span>{renderPoint(teamRightPoint)}</span>
        </p>
        <div className={`${styles.pulse} pulse-go-to-left`}></div>
      </div>

      <div
        className="absolute w-1/2 tablet:w-[var(--width)] left-0 top-0 bottom-0 z-10 flex items-center justify-end"
        style={
          {
            "--width": teamLeftWidth,
          } as CSSProperties
        }
      >
        <div className="-mr-4 h-8 w-8 rounded-full bg-white font-bold flex items-center justify-center">
          <span>VS</span>
        </div>
      </div>
    </div>
  );
}
