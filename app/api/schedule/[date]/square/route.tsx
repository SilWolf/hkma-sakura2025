import { NextRequest } from "next/server";
import { GET as SquareWithIndexGet } from "./[index]/route";

export const dynamic = "force-dynamic";

export const GET = async (
  request: NextRequest,
  { params }: { params: { date: string } }
) => {
  return SquareWithIndexGet(request, {
    params: {
      ...params,
      index: "1",
    },
  });
};
