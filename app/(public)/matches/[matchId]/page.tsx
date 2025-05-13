import { getMatch } from "@/helpers/sanity.helper";
import {
  renderDate,
  renderDateToLongForm,
  renderMatchCode,
  renderMatchResultType,
  renderPoint,
  renderRanking,
  renderScore,
} from "@/helpers/string.helper";
import { apiGetMatchById } from "@/services/match.service";
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
import LargePlayerPortrait from "../../_components/LargePlayerPortrait";
import { V2Match } from "@/models/V2Match.model";

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
      <p className="text-xs space-x-1">
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
          <p className="text-xs">{roundPlayer.yaku}</p>
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

const RoundPlayerStat = ({
  round,
  data,
}: {
  round: NonNullable<V2Match["data"]["rounds"]>[number];
  data: NonNullable<V2Match["data"]["rounds"]>[number]["playerEast"];
}) => {
  const scoreChanged = data.afterScore - data.beforeScore;
  return (
    <div className="text-center">
      {scoreChanged !== 0 && (
        <p
          className={`text-lg ${
            scoreChanged > 0 ? "text-green-500" : "text-error"
          }`}
        >
          {renderScore(scoreChanged)}
        </p>
      )}
      <p className="text-xs space-x-1">
        {data.status === "isRiichied" && (
          <span className="inline-block">立直</span>
        )}
        {data.status === "isRevealed" && (
          <span className="inline-block">副露</span>
        )}
        {data.isWaited && <span className="inline-block">聽牌</span>}
        {round.type === "ron" && data.type === "win" && (
          <span className="inline-block">榮和</span>
        )}
        {round.type === "ron" && data.type === "lose" && (
          <span className="inline-block">出銃</span>
        )}
        {round.type === "tsumo" && data.type === "win" && (
          <span className="inline-block">自摸</span>
        )}
      </p>
      {(round.type === "tsumo" || round.type === "ron") &&
        data.type === "win" && <p className="text-xs">{data.yaku}</p>}
    </div>
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
  const match = await apiGetMatchById(matchId);

  if (!match) {
    return notFound();
  }

  return (
    <main>
      <section className="pt-16 laptop:pt-8 pb-4">
        <div className="container mx-auto px-2 space-x-2 text-sm">
          <Link
            className="opacity-80"
            href={`/schedule/${match.data.startAt.substring(
              0,
              4
            )}/${match.data.startAt.substring(5, 7)}`}
          >
            賽程
          </Link>
          <span>&gt;</span>
          <span>{match.data.name}</span>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto">
          <table className="w-full">
            <tbody>
              <tr className="text-2xl">
                <td className="p-2">
                  <p>{match.data.name}</p>
                  <p className="text-lg">
                    {renderDateToLongForm(match.data.startAt)}
                  </p>
                  {match.metadata.youtubeUrl && (
                    <a
                      className="text-2xl"
                      href={match.metadata.youtubeUrl}
                      target="_blank"
                    >
                      <i className="bi bi-youtube"></i>
                    </a>
                  )}
                </td>
                <td className="w-[21%] px-2 py-2">
                  <LargePlayerPortrait
                    player={match.data.players[0]}
                    point={match.data.result?.playerEast.point}
                    ranking={match.data.result?.playerEast.ranking}
                  />
                </td>
                <td className="w-[21%] px-2 py-2">
                  <LargePlayerPortrait
                    player={match.data.players[1]}
                    point={match.data.result?.playerSouth.point}
                    ranking={match.data.result?.playerSouth.ranking}
                  />
                </td>
                <td className="w-[21%] px-2 py-2">
                  <LargePlayerPortrait
                    player={match.data.players[2]}
                    point={match.data.result?.playerWest.point}
                    ranking={match.data.result?.playerWest.ranking}
                  />
                </td>
                <td className="w-[21%] px-2 py-2">
                  <LargePlayerPortrait
                    player={match.data.players[3]}
                    point={match.data.result?.playerNorth.point}
                    ranking={match.data.result?.playerNorth.ranking}
                  />
                </td>
              </tr>

              <tr className="bg-base-300">
                <td className="text-center p-2">總分</td>
                <td className="text-center text-2xl font-bold py-4">
                  {match.data.result?.playerEast.score}
                </td>
                <td className="text-center text-2xl font-bold py-4">
                  {match.data.result?.playerSouth.score}
                </td>
                <td className="text-center text-2xl font-bold py-4">
                  {match.data.result?.playerNorth.score}
                </td>
                <td className="text-center text-2xl font-bold py-4">
                  {match.data.result?.playerWest.score}
                </td>
              </tr>

              {match.data.rounds?.map((round) => (
                <tr
                  key={round._key}
                  className="bg-base-200/50 odd:bg-base-100/50"
                >
                  <td className="text-center p-2">
                    <p className="font-bold">{renderMatchCode(round.code)}</p>
                    <p className="text-xs">
                      {renderMatchResultType(round.type)}
                    </p>
                  </td>
                  <td className="p-2">
                    <RoundPlayerStat round={round} data={round.playerEast} />
                  </td>
                  <td className="p-2">
                    <RoundPlayerStat round={round} data={round.playerSouth} />
                  </td>
                  <td className="p-2">
                    <RoundPlayerStat round={round} data={round.playerWest} />
                  </td>
                  <td className="p-2">
                    <RoundPlayerStat round={round} data={round.playerNorth} />
                  </td>
                </tr>
              ))}
              <tr className="bg-base-300">
                <td className="text-center p-2">總分</td>
                <td className="text-center text-2xl font-bold py-4">
                  {match.data.result?.playerEast.score}
                </td>
                <td className="text-center text-2xl font-bold py-4">
                  {match.data.result?.playerSouth.score}
                </td>
                <td className="text-center text-2xl font-bold py-4">
                  {match.data.result?.playerNorth.score}
                </td>
                <td className="text-center text-2xl font-bold py-4">
                  {match.data.result?.playerWest.score}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
