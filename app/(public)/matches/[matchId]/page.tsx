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
  MatchRoundPlayer,
  Player,
  Team,
} from "@/types/index.type";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 600;

const MatchTeamDiv = ({
  team,
  result,
}: {
  team: Team;
  result: MatchResultPlayer;
}) => {
  const teamLogoUrl = team.squareLogoImage + "?w=128&auto=format";

  return (
    <div
      style={{
        background:
          result.ranking === "1" ? team.color + "9D" : team.color + "2D",
      }}
    >
      <div className="flex p-1 items-center">
        <div className="shrink-0">
          <img className="w-16 h-16" src={teamLogoUrl} alt={team.name} />
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
      <p className="pb-2 text-center my-2 font-bold whitespace-nowrap overflow-hidden">
        {team.name} {team.secondaryName}
      </p>
    </div>
  );
};

const MatchPlayerDiv = ({
  player,
  team,
  result,
}: {
  player: Player;
  team: Team;
  result: MatchResultPlayer;
}) => {
  return (
    <div
      className="h-full text-center py-2"
      style={{
        background:
          result.ranking === "1" ? team.color + "9D" : team.color + "2D",
      }}
    >
      <p className="text-center my-2 font-bold whitespace-nowrap overflow-hidden">
        {player.name}
      </p>
      <p className="text-center my-2 font-bold whitespace-nowrap overflow-hidden">
        ({player.nickname})
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
  round,
  roundPlayer,
  team,
}: {
  round: MatchRound;
  roundPlayer: MatchRoundPlayer;
  team: Team;
}) => {
  return (
    <td
      className="text-center p-2 data-[win='1']:border"
      style={{
        borderColor: team.color,
      }}
      data-win={
        (round.type === "tsumo" || round.type === "ron") &&
        roundPlayer.type === "win"
          ? "1"
          : "0"
      }
    >
      <p>
        <NumberSpan value={roundPlayer.afterScore - roundPlayer.beforeScore} />
      </p>
      <p className="text-xs opacity-60 space-x-1">
        {roundPlayer.status === "isRiichied" && (
          <span className="inline-block">立直</span>
        )}
        {roundPlayer.status === "isRevealed" && (
          <span className="inline-block">副露</span>
        )}
        {roundPlayer.isWaited && <span className="inline-block">聽牌</span>}
        {round.type === "ron" && roundPlayer.type === "win" && (
          <span className="inline-block">榮和</span>
        )}
        {round.type === "ron" && roundPlayer.type === "lose" && (
          <span className="inline-block">出銃</span>
        )}
        {round.type === "tsumo" && roundPlayer.type === "win" && (
          <span className="inline-block">自摸</span>
        )}
      </p>
      {(round.type === "tsumo" || round.type === "ron") &&
        roundPlayer.type === "win" && (
          <p className="text-xs opacity-60">{roundPlayer.yaku}</p>
        )}
    </td>
  );
};

const MatchFinalScoreTd = ({
  roundPlayer,
  team,
  result,
}: {
  roundPlayer: MatchRoundPlayer;
  team: Team;
  result: MatchResultPlayer;
}) => {
  return (
    <td
      className="py-4 text-center"
      style={{
        background:
          result.ranking === "1" ? team.color + "9D" : team.color + "2D",
      }}
    >
      <p className="text-xl font-bold">{roundPlayer.afterScore}</p>
    </td>
  );
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ matchId: string }>;
}): Promise<Metadata> {
  const matchId = (await params).matchId;
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
        `${match[key]?.name}：${renderRanking(
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
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const matchId = (await params).matchId;
  const match = await getMatch(matchId);

  if (!match) {
    return notFound();
  }

  return (
    <main>
      <section className="pt-16 md:pt-8 pb-4">
        <div className="container max-w-(--breakpoint-lg) mx-auto px-2 space-x-2 text-sm">
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
        <div className="container max-w-(--breakpoint-lg) mx-auto">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="p-2">
                  <p>{match.name}</p>
                  <p className="text-sm opacity-80">
                    {match.startAt?.substring(0, 10)}
                  </p>
                </td>
                <td className="w-[21%]">
                  <MatchTeamDiv
                    team={match.playerEastTeam!}
                    result={match.result!.playerEast}
                  />
                </td>
                <td className="w-[21%]">
                  <MatchTeamDiv
                    team={match.playerSouthTeam!}
                    result={match.result!.playerSouth}
                  />
                </td>
                <td className="w-[21%]">
                  <MatchTeamDiv
                    team={match.playerWestTeam!}
                    result={match.result!.playerWest}
                  />
                </td>
                <td className="w-[21%]">
                  <MatchTeamDiv
                    team={match.playerNorthTeam!}
                    result={match.result!.playerNorth}
                  />
                </td>
              </tr>
              <tr>
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
                <td>
                  <MatchPlayerDiv
                    player={match.playerEast!}
                    team={match.playerEastTeam!}
                    result={match.result!.playerEast}
                  />
                </td>
                <td>
                  <MatchPlayerDiv
                    player={match.playerSouth!}
                    team={match.playerSouthTeam!}
                    result={match.result!.playerSouth}
                  />
                </td>
                <td>
                  <MatchPlayerDiv
                    player={match.playerWest!}
                    team={match.playerWestTeam!}
                    result={match.result!.playerWest}
                  />
                </td>
                <td>
                  <MatchPlayerDiv
                    player={match.playerNorth!}
                    team={match.playerNorthTeam!}
                    result={match.result!.playerNorth}
                  />
                </td>
              </tr>
              {match.rounds.map((round) => (
                <tr
                  key={round._key}
                  className="odd:bg-neutral-100 odd:bg-opacity-10"
                >
                  <td className="text-center">
                    <p className="font-bold">{renderMatchCode(round.code)}</p>
                    <p className="text-xs opacity-60">
                      {renderMatchResultType(round.type)}
                    </p>
                  </td>
                  <MatchScoreChangeTd
                    round={round}
                    roundPlayer={round.playerEast}
                    team={match.playerEastTeam!}
                  />
                  <MatchScoreChangeTd
                    round={round}
                    roundPlayer={round.playerSouth}
                    team={match.playerSouthTeam!}
                  />
                  <MatchScoreChangeTd
                    round={round}
                    roundPlayer={round.playerWest}
                    team={match.playerWestTeam!}
                  />
                  <MatchScoreChangeTd
                    round={round}
                    roundPlayer={round.playerNorth}
                    team={match.playerNorthTeam!}
                  />
                </tr>
              ))}
              <tr className="odd:bg-neutral-100 odd:bg-opacity-10">
                <td></td>
                <MatchFinalScoreTd
                  roundPlayer={match.rounds[match.rounds.length - 1].playerEast}
                  team={match.playerEastTeam!}
                  result={match.result!.playerEast}
                />
                <MatchFinalScoreTd
                  roundPlayer={
                    match.rounds[match.rounds.length - 1].playerSouth
                  }
                  team={match.playerSouthTeam!}
                  result={match.result!.playerSouth}
                />
                <MatchFinalScoreTd
                  roundPlayer={match.rounds[match.rounds.length - 1].playerWest}
                  team={match.playerWestTeam!}
                  result={match.result!.playerWest}
                />
                <MatchFinalScoreTd
                  roundPlayer={
                    match.rounds[match.rounds.length - 1].playerNorth
                  }
                  team={match.playerNorthTeam!}
                  result={match.result!.playerNorth}
                />
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
