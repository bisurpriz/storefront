const devcert = require("devcert");
const fs = require("fs");

if (!fs.existsSync("./certs")) {
  fs.mkdirSync("./certs");
}

const domains = ["localhost"];

devcert
  .certificateFor(domains, { getCaPath: true })
  .then(({ key, cert, caPath }) => {
    if (!fs.existsSync("./certs")) {
      fs.mkdirSync("./certs");
    }

    fs.writeFileSync("./certs/devcert.key", key);
    fs.writeFileSync("./certs/devcert.cert", cert);
    fs.writeFileSync("./certs/.capath", caPath);
  })
  .catch(console.error);
