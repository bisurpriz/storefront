import jwt, { JwtPayload } from "jsonwebtoken";

export const checkExpire = (token) => {
  try {
    if (!token) {
      return true;
    }

    const decoded = jwt.decode(token) as JwtPayload;

    const currentTime = Date.now() / 1000;

    return decoded.exp && decoded.exp < currentTime;
  } catch (error) {
    console.log(error, "error");

    return false;
  }
};
