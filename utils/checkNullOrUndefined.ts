export const checkNullOrUndefined = <T>(obj: NonNullable<T>) => {
  if (obj === null || obj === undefined) return false;
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};
