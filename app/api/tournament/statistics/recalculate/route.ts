import { recalculateStatisticsByTournamentId } from "@/functions/recalculateStatistics";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  await recalculateStatisticsByTournamentId(
    process.env.SANITY_DEFAULT_TOURNAMENT_ID as string
  );

  return Response.json({ success: true }, { status: 200 });
}

export async function OPTIONS() {
  return new Response();
}
