import { matchSchema } from "@/adapters/sanity/sanity.zod";
import { recalculateStatisticsByTournamentId } from "@/functions/recalculateStatistics";
import { client } from "@/helpers/sanity.helper";
import { apiGetTournamentIdByMatchId } from "@/services/tournament.service";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic"; // defaults to auto

export const maxDuration = 60;

const matchSchemaOnlyResultAndRounds = matchSchema.pick({
  _id: true,
  result: true,
  rounds: true,
});

export async function PATCH(request: Request) {
  const validateResult = matchSchemaOnlyResultAndRounds.safeParse(
    await request.json()
  );

  if (!validateResult.success) {
    return Response.json(
      {
        success: false,
        errors: validateResult.error,
      },
      { status: 400 }
    );
  }

  const match = {
    ...validateResult.data,
    resultUploadedAt: new Date().toISOString(),
  };

  const response = await client
    .patch(match._id)
    .set(match)
    .commit()
    .then(() => ({ success: true }))
    .catch((error) => ({ success: false, errors: error.message }));

  if (response.success) {
    return apiGetTournamentIdByMatchId(match._id)
      .then((tournamentId) => recalculateStatisticsByTournamentId(tournamentId))
      .then(() => {
        revalidatePath("/(public)", "layout");
        return Response.json(response, {
          status: response.success ? 200 : 400,
        });
      });
  }

  return Response.json(response, { status: response.success ? 200 : 400 });
}

export async function OPTIONS() {
  return new Response();
}
