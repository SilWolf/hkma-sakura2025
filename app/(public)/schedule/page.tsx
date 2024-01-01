import { getMatchesGroupedByDate } from "@/helpers/sanity.helper";
import { renderPoint, renderWeekday } from "@/helpers/string.helper";
import { Match } from "@/types/index.type";
import SchedulePage from "./[year]/[month]/page";

const ScheduleTeam = ({
  match,
  playerIndex,
}: {
  match: Match;
  playerIndex: "playerEast" | "playerSouth" | "playerWest" | "playerNorth";
}) => {
  const point = match.result?.[playerIndex]?.point;
  const isLoser = match.result && match.result?.[playerIndex]?.ranking !== "1";

  return (
    <div>
      <img
        src={
          (match[playerIndex].team.squareLogoImage ?? "/images/empty.png") +
          "?w=512&auto=format"
        }
        className="w-full"
        alt={match.playerEast.team.name}
        style={{
          opacity: isLoser ? 0.4 : 1,
          filter: isLoser ? "grayscale(100%)" : "",
        }}
      />
      {match.result && (
        <p className="text-center text-sm">{renderPoint(point)}pt</p>
      )}
    </div>
  );
};

export default async function ScheduleDefaultPage() {
  const date = new Date();
  const params = {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString(),
  };

  return <SchedulePage params={params} />;
}
