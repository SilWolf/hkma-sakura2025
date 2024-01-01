import { getMatch } from "@/helpers/sanity.helper";
import {
  renderDate,
  renderMatchCode,
  renderMatchResultType,
  renderPoint,
  renderRanking,
  renderScore,
} from "@/helpers/string.helper";
import {
  Match,
  MatchResultPlayer,
  MatchRound,
  TeamPlayer,
} from "@/types/index.type";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const MatchTeamDiv = ({
  player,
  result,
}: {
  player: TeamPlayer;
  result: MatchResultPlayer;
}) => {
  const teamLogoUrl = player.team.squareLogoImage + "?w=128&auto=format";

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
        <p className="text-right text-2xl">{renderPoint(result.point)}</p>
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
  return (
    <div
      className="text-center py-2"
      style={{
        background: (player.overridedColor || player.team.color) + "2D",
      }}
    >
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

const MatchScoreChangeTd = ({
  match,
  round,
  playerKey,
}: {
  match: Match;
  round: MatchRound;
  playerKey: "playerEast" | "playerSouth" | "playerWest" | "playerNorth";
}) => {
  return (
    <td
      className="text-center p-2 data-[win='1']:border"
      style={{
        borderColor:
          match[playerKey].overridedColor || match[playerKey].team.color,
      }}
      data-win={
        (round.type === "tsumo" || round.type === "ron") &&
        round[playerKey].type === "win"
          ? "1"
          : "0"
      }
    >
      <p>
        <NumberSpan
          value={round[playerKey].afterScore - round[playerKey].beforeScore}
        />
      </p>
      <p className="text-xs opacity-60 space-x-1">
        {round[playerKey].status === "isRiichied" && (
          <span className="inline-block">立直</span>
        )}
        {round[playerKey].status === "isRevealed" && (
          <span className="inline-block">副露</span>
        )}
        {round[playerKey].isWaited && (
          <span className="inline-block">聽牌</span>
        )}
        {round.type === "ron" && round[playerKey].type === "win" && (
          <span className="inline-block">榮和</span>
        )}
        {round.type === "ron" && round[playerKey].type === "lose" && (
          <span className="inline-block">出銃</span>
        )}
        {round.type === "tsumo" && round[playerKey].type === "win" && (
          <span className="inline-block">自摸</span>
        )}
      </p>
      {(round.type === "tsumo" || round.type === "ron") &&
        round[playerKey].type === "win" && (
          <p className="text-xs opacity-60">{round.playerSouth.yaku}</p>
        )}
    </td>
  );
};

const MatchFinalScoreTd = ({
  match,
  playerKey,
}: {
  match: Match;
  playerKey: "playerEast" | "playerSouth" | "playerWest" | "playerNorth";
}) => {
  return (
    <td
      className="py-4 text-center"
      style={{
        background:
          (match[playerKey].overridedColor || match[playerKey].team.color) +
          "2D",
      }}
    >
      <p className="text-xl font-bold">
        {match.rounds[match.rounds.length - 1][playerKey].afterScore}
      </p>
    </td>
  );
};

export async function generateMetadata({
  params: { matchId },
}: {
  params: { matchId: string };
}): Promise<Metadata> {
  const match = await getMatch(matchId);

  if (!match || !match.result) {
    return {
      title: "對局結果",
    };
  }

  const playersResultString = (
    ["playerEast", "playerSouth", "playerWest", "playerNorth"] as const
  )
    .map(
      (key) =>
        `${match[key].overridedName ?? match[key].player.name}：${renderRanking(
          match.result?.[key].ranking
        )},${renderScore(match.result?.[key].score)}(${renderPoint(
          match.result?.[key].point
        )})`
    )
    .join(" / ");

  return {
    title: `${match.name} (${renderDate(match.startAt)})`,
    description: `[${match.name}] ${playersResultString}`,
  };
}

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
    <main>
      <section className="pt-16 md:pt-8 pb-4">
        <div className="container max-w-screen-lg mx-auto px-2 space-x-2 text-sm">
          <Link
            className="opacity-80"
            href={`/schedule/${match.startAt.substring(
              0,
              4
            )}/${match.startAt.substring(5, 7)}`}
          >
            賽程
          </Link>
          <span>&gt;</span>
          <span>{match.name}</span>
        </div>
      </section>

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
                  className="odd:bg-neutral-100 odd:bg-opacity-10"
                >
                  <td colSpan={2} className="text-center">
                    <p className="font-bold">{renderMatchCode(round.code)}</p>
                    <p className="text-xs opacity-60">
                      {renderMatchResultType(round.type)}
                    </p>
                  </td>
                  <MatchScoreChangeTd
                    match={match}
                    round={round}
                    playerKey="playerEast"
                  />
                  <MatchScoreChangeTd
                    match={match}
                    round={round}
                    playerKey="playerSouth"
                  />
                  <MatchScoreChangeTd
                    match={match}
                    round={round}
                    playerKey="playerWest"
                  />
                  <MatchScoreChangeTd
                    match={match}
                    round={round}
                    playerKey="playerNorth"
                  />
                </tr>
              ))}
              <tr className="odd:bg-neutral-100 odd:bg-opacity-10">
                <td colSpan={2}></td>
                <MatchFinalScoreTd match={match} playerKey="playerEast" />
                <MatchFinalScoreTd match={match} playerKey="playerSouth" />
                <MatchFinalScoreTd match={match} playerKey="playerWest" />
                <MatchFinalScoreTd match={match} playerKey="playerNorth" />
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
