import { recalculateStatisticsByTournamentId } from "@/functions/recalculateStatistics";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic"; // defaults to auto

export const maxDuration = 60;

export async function GET(request: Request) {
  await recalculateStatisticsByTournamentId(
    process.env.SANITY_DEFAULT_TOURNAMENT_ID as string
  );

  revalidatePath("/(public)", "layout");

  return Response.json({ success: true }, { status: 200 });
}

export async function OPTIONS() {
  return new Response();
}
