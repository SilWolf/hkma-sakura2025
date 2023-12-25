import { getMatch } from "@/helpers/sanity.helper";
import {
  renderMatchCode,
  renderMatchResultType,
  renderRanking,
} from "@/helpers/string.helper";
import { MatchResultPlayer, TeamPlayer } from "@/types/index.type";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const MatchTeamDiv = ({
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
        <img className="w-16 h-16" src={teamLogoUrl} alt={player.team.name} />
      </div>
      {/* <div className="shrink-0">
        <img
          className="w-16 rounded-full"
          src={playerImageUrl}
          alt={player.player.name}
        />
      </div> */}
      <div className="flex-1 pr-2">
        <p className="text-right text-sm">
          {renderRanking(parseInt(result.ranking))}
        </p>
        <p className="text-right text-2xl">{result.point.toFixed(1)}</p>
      </div>
    </div>
  );
};

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
      className="text-center"
      style={{
        background: (player.overridedColor || player.team.color) + "2D",
      }}
    >
      <img
        className="w-16 h-16 mx-auto"
        src={playerImageUrl}
        alt={player.overridedName || player.player.name}
      />
      <p className="text-center my-2 font-bold">
        {player.overridedName || player.player.name}
      </p>
    </div>
  );
};

const NumberSpan = ({ value }: { value: number }) => {
  if (value === 0) {
    return "";
  }

  if (value > 0) {
    return <span className="text-green-500">+{value}</span>;
  }

  return <span className="text-red-500">{value}</span>;
};

export default async function MatchDetailPage({
  params: { matchId },
}: {
  params: { matchId: string };
}) {
  const match = await getMatch(matchId);

  if (!match) {
    return notFound();
  }

  return (
    <main className="p-20 relative">
      <section className="py-8">
        <div className="container max-w-screen-lg mx-auto">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="p-2">
                  <p>{match.name}</p>
                  <p className="text-sm opacity-80">
                    {match.startAt?.substring(0, 10)}
                  </p>
                </td>
                <td className="p-2">
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
                <td className="w-48">
                  <MatchTeamDiv
                    player={match.playerEast}
                    result={match.result!.playerEast}
                  />
                </td>
                <td className="w-48">
                  <MatchTeamDiv
                    player={match.playerSouth}
                    result={match.result!.playerSouth}
                  />
                </td>
                <td className="w-48">
                  <MatchTeamDiv
                    player={match.playerWest}
                    result={match.result!.playerWest}
                  />
                </td>
                <td className="w-48">
                  <MatchTeamDiv
                    player={match.playerNorth}
                    result={match.result!.playerNorth}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td className="p-2"></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <MatchPlayerDiv
                    player={match.playerEast}
                    result={match.result!.playerEast}
                  />
                </td>
                <td>
                  <MatchPlayerDiv
                    player={match.playerSouth}
                    result={match.result!.playerSouth}
                  />
                </td>
                <td>
                  <MatchPlayerDiv
                    player={match.playerWest}
                    result={match.result!.playerWest}
                  />
                </td>
                <td>
                  <MatchPlayerDiv
                    player={match.playerNorth}
                    result={match.result!.playerNorth}
                  />
                </td>
              </tr>
              {match.rounds.map((round) => (
                <tr
                  key={round._key}
                  className="odd:bg-neutral-500 odd:bg-opacity-10"
                >
                  <td colSpan={2} className="text-center">
                    <p className="font-bold">{renderMatchCode(round.code)}</p>
                    <p className="text-xs opacity-60">
                      {renderMatchResultType(round.type)}
                    </p>
                  </td>
                  <td
                    className="text-center p-2 data-[win='1']:border"
                    style={{
                      borderColor:
                        match.playerEast.overridedColor ||
                        match.playerEast.team.color,
                    }}
                    data-win={
                      (round.type === "tsumo" || round.type === "ron") &&
                      round.playerEast.type === "win"
                        ? "1"
                        : "0"
                    }
                  >
                    <p>
                      <NumberSpan
                        value={
                          round.playerEast.afterScore -
                          round.playerEast.beforeScore
                        }
                      />
                    </p>
                    <p className="text-xs opacity-60 space-x-1">
                      {round.playerEast.status === "isRiichied" && (
                        <span className="inline-block">立直</span>
                      )}
                      {round.playerEast.status === "isRevealed" && (
                        <span className="inline-block">副露</span>
                      )}
                      {round.playerEast.isWaited && (
                        <span className="inline-block">聽牌</span>
                      )}
                      {round.type === "ron" &&
                        round.playerEast.type === "win" && (
                          <span className="inline-block">榮和</span>
                        )}
                      {round.type === "ron" &&
                        round.playerEast.type === "lose" && (
                          <span className="inline-block">出銃</span>
                        )}
                      {round.type === "tsumo" &&
                        round.playerEast.type === "win" && (
                          <span className="inline-block">自摸</span>
                        )}
                    </p>
                    {(round.type === "tsumo" || round.type === "ron") &&
                      round.playerEast.type === "win" && (
                        <p className="text-xs opacity-60">
                          {round.playerEast.yaku}
                        </p>
                      )}
                  </td>
                  <td
                    className="text-center p-2 data-[win='1']:border"
                    style={{
                      borderColor:
                        match.playerSouth.overridedColor ||
                        match.playerSouth.team.color,
                    }}
                    data-win={
                      (round.type === "tsumo" || round.type === "ron") &&
                      round.playerSouth.type === "win"
                        ? "1"
                        : "0"
                    }
                  >
                    <p>
                      <NumberSpan
                        value={
                          round.playerSouth.afterScore -
                          round.playerSouth.beforeScore
                        }
                      />
                    </p>
                    <p className="text-xs opacity-60 space-x-1">
                      {round.playerSouth.status === "isRiichied" && (
                        <span className="inline-block">立直</span>
                      )}
                      {round.playerSouth.status === "isRevealed" && (
                        <span className="inline-block">副露</span>
                      )}
                      {round.playerSouth.isWaited && (
                        <span className="inline-block">聽牌</span>
                      )}
                      {round.type === "ron" &&
                        round.playerSouth.type === "win" && (
                          <span className="inline-block">榮和</span>
                        )}
                      {round.type === "ron" &&
                        round.playerSouth.type === "lose" && (
                          <span className="inline-block">出銃</span>
                        )}
                      {round.type === "tsumo" &&
                        round.playerSouth.type === "win" && (
                          <span className="inline-block">自摸</span>
                        )}
                    </p>
                    {(round.type === "tsumo" || round.type === "ron") &&
                      round.playerSouth.type === "win" && (
                        <p className="text-xs opacity-60">
                          {round.playerSouth.yaku}
                        </p>
                      )}
                  </td>
                  <td
                    className="text-center p-2 data-[win='1']:border"
                    style={{
                      borderColor:
                        match.playerWest.overridedColor ||
                        match.playerWest.team.color,
                    }}
                    data-win={
                      (round.type === "tsumo" || round.type === "ron") &&
                      round.playerWest.type === "win"
                        ? "1"
                        : "0"
                    }
                  >
                    <p>
                      <NumberSpan
                        value={
                          round.playerWest.afterScore -
                          round.playerWest.beforeScore
                        }
                      />
                    </p>
                    <p className="text-xs opacity-60 space-x-1">
                      {round.playerWest.status === "isRiichied" && (
                        <span className="inline-block">立直</span>
                      )}
                      {round.playerWest.status === "isRevealed" && (
                        <span className="inline-block">副露</span>
                      )}
                      {round.playerWest.isWaited && (
                        <span className="inline-block">聽牌</span>
                      )}
                      {round.type === "ron" &&
                        round.playerWest.type === "win" && (
                          <span className="inline-block">榮和</span>
                        )}
                      {round.type === "ron" &&
                        round.playerWest.type === "lose" && (
                          <span className="inline-block">出銃</span>
                        )}
                      {round.type === "tsumo" &&
                        round.playerWest.type === "win" && (
                          <span className="inline-block">自摸</span>
                        )}
                    </p>
                    {(round.type === "tsumo" || round.type === "ron") &&
                      round.playerWest.type === "win" && (
                        <p className="text-xs opacity-60">
                          {round.playerWest.yaku}
                        </p>
                      )}
                  </td>
                  <td
                    className="text-center p-2 data-[win='1']:border"
                    style={{
                      borderColor:
                        match.playerNorth.overridedColor ||
                        match.playerNorth.team.color,
                    }}
                    data-win={
                      (round.type === "tsumo" || round.type === "ron") &&
                      round.playerNorth.type === "win"
                        ? "1"
                        : "0"
                    }
                  >
                    <p>
                      <NumberSpan
                        value={
                          round.playerNorth.afterScore -
                          round.playerNorth.beforeScore
                        }
                      />
                    </p>
                    <p className="text-xs opacity-60 space-x-1">
                      {round.playerNorth.status === "isRiichied" && (
                        <span className="inline-block">立直</span>
                      )}
                      {round.playerNorth.status === "isRevealed" && (
                        <span className="inline-block">副露</span>
                      )}
                      {round.playerNorth.isWaited && (
                        <span className="inline-block">聽牌</span>
                      )}
                      {round.type === "ron" &&
                        round.playerNorth.type === "win" && (
                          <span className="inline-block">榮和</span>
                        )}
                      {round.type === "ron" &&
                        round.playerNorth.type === "lose" && (
                          <span className="inline-block">出銃</span>
                        )}
                      {round.type === "tsumo" &&
                        round.playerNorth.type === "win" && (
                          <span className="inline-block">自摸</span>
                        )}
                    </p>
                    {(round.type === "tsumo" || round.type === "ron") &&
                      round.playerNorth.type === "win" && (
                        <p className="text-xs opacity-60">
                          {round.playerNorth.yaku}
                        </p>
                      )}
                  </td>
                </tr>
              ))}
              <tr className="odd:bg-neutral-500 odd:bg-opacity-10">
                <td colSpan={2}></td>
                <td
                  className="py-4 text-center font-bold text-lg"
                  style={{
                    background:
                      (match.playerEast.overridedColor ||
                        match.playerEast.team.color) + "2D",
                  }}
                >
                  {match.rounds[match.rounds.length - 1].playerEast.afterScore}
                </td>
                <td
                  className="py-4 text-center font-bold text-lg"
                  style={{
                    background:
                      (match.playerSouth.overridedColor ||
                        match.playerSouth.team.color) + "2D",
                  }}
                >
                  {match.rounds[match.rounds.length - 1].playerSouth.afterScore}
                </td>
                <td
                  className="py-4 text-center font-bold text-lg"
                  style={{
                    background:
                      (match.playerWest.overridedColor ||
                        match.playerWest.team.color) + "2D",
                  }}
                >
                  {match.rounds[match.rounds.length - 1].playerWest.afterScore}
                </td>
                <td
                  className="py-4 text-center font-bold text-lg"
                  style={{
                    background:
                      (match.playerNorth.overridedColor ||
                        match.playerNorth.team.color) + "2D",
                  }}
                >
                  {match.rounds[match.rounds.length - 1].playerNorth.afterScore}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
