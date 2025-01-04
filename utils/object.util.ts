export const mergeObject = <T extends Record<string, unknown>>(
  base: T,
  overrided: T
): T => {
  const res = { ...base };

  for (const key in overrided) {
    if (!!overrided[key]) {
      res[key] = overrided[key];
    }
  }

  return res;
};
