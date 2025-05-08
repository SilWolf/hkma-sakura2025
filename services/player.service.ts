import { sanityClient } from "@/adapters/sanity";
import { Player } from "@/adapters/sanity/sanity.types";

export const apiPatchPlayerStatistics = async (
  playerId: string,
  tournamentId: string,
  statistics: NonNullable<Player["statistics"]>[number]
) => {
  const ref = sanityClient.patch(playerId);
  ref.set({
    [`statistics[_key=="${tournamentId}"]`]: statistics,
  });

  return await ref.commit();
};
