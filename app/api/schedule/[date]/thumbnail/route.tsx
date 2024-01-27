import { NextRequest } from "next/server";
import { GET as ThumbnailWithIndexGet } from "./[index]/route";

export const dynamic = "force-dynamic";

export const GET = async (
  request: NextRequest,
  { params }: { params: { date: string } }
) => {
  return ThumbnailWithIndexGet(request, {
    params: {
      ...params,
      index: "1",
    },
  });
};
