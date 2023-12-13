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

/**
 * @description
 * This function is used to serialize data to be sent to the server.
 * It takes an object as an argument and returns a string.
 * The string is formatted as a query string.
 * The query string is used to send data to the server.
 *
 *  @example
 * const data = {
 * name: "John Doe",
 * age: 30,
 * };
 *
 * const serializedData = serializeData(data);
 * console.log(serializedData);
 * // name=John%20Doe&age=30
 *
 */
