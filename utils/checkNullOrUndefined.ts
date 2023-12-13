export const checkNullOrUndefined = (obj: NonNullable<unknown>) => {
  // Check deep null or undefined
  if (obj === null || obj === undefined) return false;
  // Check shallow null or undefined and delete it
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  }
  return true;
};
