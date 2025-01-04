"use client";

import { renderMatchCode } from "@/helpers/string.helper";
import { Match } from "@/types/index.type";
import { useCallback, useMemo, useState } from "react";

const MatchLogsSection = ({ match }: { match: Match }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const handleClickRound = useCallback((e: React.MouseEvent) => {
    const newIndex = e.currentTarget.getAttribute("data-index");
    if (typeof newIndex === "undefined") {
      return;
    }

    setActiveIndex(parseInt(newIndex as string));
  }, []);

  const tenhouSource = useMemo(() => {
    if (!match) {
      return null;
    }

    return match.rounds[activeIndex].tenhouReplayUrl?.replace("/6/", "/5/");
  }, [match, activeIndex]);

  console.log(tenhouSource);

  return (
    <section>
      <div className="flex flex-wrap mb-8 gap-2">
        {match.rounds.map((round, index) => (
          <button
            key={round.code}
            data-index={index}
            data-active={activeIndex === index}
            onClick={handleClickRound}
            className="py-1 px-4 data-[active=true]:bg-cyan-500 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={!round.tenhouReplayUrl}
          >
            {renderMatchCode(round.code)}
          </button>
        ))}
      </div>

      {tenhouSource && (
        <iframe
          key={activeIndex}
          src={tenhouSource}
          className="w-full aspect-video"
          frameBorder="0"
        ></iframe>
      )}
    </section>
  );
};

export default MatchLogsSection;
