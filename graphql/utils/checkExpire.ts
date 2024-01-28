import jwt from "jsonwebtoken";

export const checkExpire = (token) => {
  try {
    const decoded = jwt.decode(token);

    const currentTime = Date.now() / 1000;

    return decoded.exp && decoded.exp < currentTime;
  } catch (error) {
    return false;
  }
};
