import { createHmac, randomBytes } from "crypto";

export const generateAuthorizationHeaderV2 = (uri, body) => {
  const iyziWsHeaderName = "IYZWSv2";
  const apiKey = process.env.IYZICO_API_KEY;
  const separator = ":";
  const secretKey = process.env.IYZICO_SECRET_KEY;
  const randomString = randomBytes(16).toString("hex");

  return (
    iyziWsHeaderName +
    " " +
    generateHashV2(apiKey, separator, uri, randomString, secretKey, body)
  );
};

export const generateHashV2 = (
  apiKey,
  separator,
  uri,
  randomString,
  secretKey,
  body
) => {
  const signature = createHmac("sha256", secretKey)
    .update(randomString + uri + JSON.stringify(body))
    .digest("hex");

  const authorizationParams = [
    "apiKey" + separator + apiKey,
    "randomKey" + separator + randomString,
    "signature" + separator + signature,
  ];
  return Buffer.from(authorizationParams.join("&")).toString("base64");
};
