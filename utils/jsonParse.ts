export const parseJson = (json: any) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};
