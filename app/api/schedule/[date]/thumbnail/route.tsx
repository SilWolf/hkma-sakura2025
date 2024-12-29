import { NextRequest } from "next/server";
import { GET as ThumbnailWithIndexGet } from "./[index]/route";

export const dynamic = "force-dynamic";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) => {
  return ThumbnailWithIndexGet(request, {
    params: Promise.resolve({
      ...(await params),
      index: "1",
    }),
  });
};
