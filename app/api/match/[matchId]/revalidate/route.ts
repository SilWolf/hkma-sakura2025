import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  const matchId = (await params).matchId;

  revalidatePath("/(public)/schedule/[year]/[month]", "page");
  revalidatePath(`/(public)/matches/${matchId}`, "page");
  revalidatePath(`/(public)/`, "page");

  return Response.json({ revalidated: true, now: Date.now() });
}
