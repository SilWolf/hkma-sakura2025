"use client";

import { Match, MatchResultPlayer, TeamPlayer } from "@/types/index.type";
import { useEffect, useState } from "react";

const MatchPlayerDiv = ({
  player,
  result,
}: {
  player: TeamPlayer;
  result: MatchResultPlayer;
}) => {
  const teamLogoUrl = player.team.squareLogoImage + "?w=128";
  const playerImageUrl =
    (player.overridedPortraitImage || player.player.portraitImage) +
    "?w=128&h=128&fit=crop&crop=top";

  return (
    <div
      className="flex p-1 items-center"
      style={{
        background: (player.overridedColor || player.team.color) + "2D",
      }}
    >
      <div className="shrink-0">
        <img className="w-16" src={teamLogoUrl} alt={player.team.name} />
      </div>
      {/* <div className="shrink-0">
        <img
          className="w-16 rounded-full"
          src={playerImageUrl}
          alt={player.player.name}
        />
      </div> */}
      <div className="flex-1 pl-4">
        <p className="text-center text-2xl">{result.point.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default function StatisticsPage() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetch("/api/match")
      .then((res) => res.json())
      .then((res) => setMatches(res));
  }, []);

  return (
    <main className="py-20 relative">
      <section className="pt-12 w-full text-center">
        <div className="relative z-10">
          <h2 className="text-[48px]">對局紀錄</h2>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th>對局</th>
                <th></th>
                <th>隊伍</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match._id}>
                  <td className="py-2">
                    <p>{match.name}</p>
                    <p className="text-sm opacity-80">
                      {match.startAt?.substring(0, 10)}
                    </p>
                  </td>
                  <td className="py-2">
                    {match.youtubeUrl && (
                      <a
                        className="text-2xl"
                        href={match.youtubeUrl}
                        target="_blank"
                      >
                        <i className="bi bi-youtube"></i>
                      </a>
                    )}
                  </td>
                  <td className="py-2">
                    <div className="grid grid-cols-4">
                      <MatchPlayerDiv
                        player={match.playerEast}
                        result={match.result!.playerEast}
                      />
                      <MatchPlayerDiv
                        player={match.playerSouth}
                        result={match.result!.playerSouth}
                      />
                      <MatchPlayerDiv
                        player={match.playerWest}
                        result={match.result!.playerWest}
                      />
                      <MatchPlayerDiv
                        player={match.playerNorth}
                        result={match.result!.playerNorth}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
