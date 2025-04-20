import { getMatch } from "@/helpers/sanity.helper";
import Link from "next/link";
import { notFound } from "next/navigation";
import MatchLogsSection from "./MatchLogsSection";
import { useMemo, useState } from "react";

const MatchDetailReplayPage = async ({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) => {
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
          <span>
            <Link className="opacity-80" href={`/matches/${match._id}`}>
              {match.name}
            </Link>
          </span>
          <span>&gt;</span>
          <span>牌譜</span>
        </div>
      </section>

      <section className="py-8">
        <div className="container px-2 max-w-(--breakpoint-lg) mx-auto">
          <MatchLogsSection match={match} />
        </div>
      </section>
    </main>
  );
};

export default MatchDetailReplayPage;
