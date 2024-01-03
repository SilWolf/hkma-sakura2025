import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { matchId: string } }
) {
  const { matchId } = params;

  revalidatePath("/(public)/schedule/[year]/[month]", "page");
  revalidatePath(`/(public)/matches/${matchId}`, "page");
  revalidatePath(`/(public)/`, "page");

  return Response.json({ revalidated: true, now: Date.now() });
}
