import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  revalidatePath("/(public)", "layout");

  return Response.json({ revalidated: true, now: Date.now() });
}
