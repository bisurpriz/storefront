import { post } from "@/app/iyzico-payment/actions";

export async function POST(request: Request) {
  const url = await request.text();

  const params = new URLSearchParams(url);

  const paramsObject = {};
  params.forEach((value, key) => {
    paramsObject[key] = value;
  });

  const response: any = await post("/payment/3dsecure/auth", {
    paymentId: paramsObject["paymentId"],
    conversationData: paramsObject["conversationData"],
  });

  if (response.status === "success") {
    console.log("Ödeme başarılı");
    // return script
    return new Response(
      `
      <script>
        document.addEventListener('DOMContentLoaded', function () {
            window.parent.postMessage('success', '*'); 
        });
      </script>
    `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } else {
    console.log("Ödeme başarısız");
    return new Response(
      `
      <script>
        document.addEventListener('DOMContentLoaded', function () {
            window.parent.postMessage('failed', '*'); 
        });
      </script>
    `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  }
}
