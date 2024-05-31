import crypto from "crypto";

export async function POST(req: Request, res) {
  const callback: any = req.body;
  console.log(callback);
  const merchant_key = process.env.MERCHANT_KEY;
  const merchant_salt = process.env.MERCHANT_SALT;

  const paytr_token =
    callback.merchant_oid +
    merchant_salt +
    callback.status +
    callback.total_amount;
  const token = crypto
    .createHmac("sha256", merchant_key)
    .update(paytr_token)
    .digest("base64");

  if (token !== callback.hash) {
    throw new Error("PAYTR notification failed: bad hash");
  }

  if (callback.status === "success") {
    // Update the order status to "paid"
    // Send an email to the customer
    // Redirect the customer to the success page
    console.log("Payment successful");
  } else {
    // Update the order status to "failed"
    // Redirect the customer to the failed page
    console.log("Payment failed");
  }

  res.end("OK");
}
