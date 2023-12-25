import Ajv from "ajv";
const ajv = new Ajv();

export const getJsonValidator = (schema: any) => {
  const validator = ajv.compile(schema);

  return {
    validate: (json: unknown) => {
      const result = validator(json);

      return {
        isValid: !!result,
        errors: validator.errors,
      };
    },
  };
};
