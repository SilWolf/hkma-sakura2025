import { getJsonValidator } from "@/helpers/json.helper";
import matchSchema from "./match.schema.json";
import { client } from "@/helpers/sanity.helper";

export const dynamic = "force-dynamic"; // defaults to auto

export async function PATCH(request: Request) {
  const match = await request.json();
  const jsonValidator = getJsonValidator(matchSchema);

  const validateResult = jsonValidator.validate(match);
  if (!validateResult.isValid) {
    return Response.json(
      {
        success: false,
        errors: validateResult.errors,
      },
      { status: 400 }
    );
  }

  const ref = client.patch(match._id).set(match);
  return ref
    .commit()
    .then(() => Response.json({ success: true }))
    .catch((error) =>
      Response.json({ success: false, errors: error.message }, { status: 400 })
    );
}
