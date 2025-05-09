import { sanityClient } from "@/adapters/sanity";
import { Player } from "@/adapters/sanity/sanity.types";

export const apiPatchPlayerStatistics = async (
  playerId: string,
  tournamentId: string,
  statistics: NonNullable<Player["statistics"]>[number],
  options?: { needInitialize?: boolean }
) => {
  const ref = sanityClient.patch(playerId);
  ref.setIfMissing({ statistics: [] });

  if (options?.needInitialize) {
    ref.append("statistics", [statistics]);
  } else {
    ref.set({
      [`statistics[_key=="${tournamentId}"]`]: statistics,
    });
  }

  return await ref.commit();
};
