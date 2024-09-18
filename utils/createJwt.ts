import jwt from "jsonwebtoken";

export const createJwt = () => {
  const secret = JSON.parse(process.env.JWT_SECRET || "");
  return jwt.sign({}, secret, { expiresIn: "15m" });
};
