export const serializeData = (data: Record<string, unknown>) => {
  return Object.keys(data)
    .map((key) => {
      const value = data[key];
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
      return "";
    })
    .join("&");
};
