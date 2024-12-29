import { NextRequest } from "next/server";
import { GET as SquareWithIndexGet } from "./[index]/route";

export const dynamic = "force-dynamic";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) => {
  return SquareWithIndexGet(request, {
    params: Promise.resolve({
      ...(await params),
      index: "1",
    }),
  });
};
