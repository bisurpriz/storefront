import { post } from "@/app/iyzico-payment/actions";

export async function POST(request: Request) {
  const url = await request.text();

  const params = await new URLSearchParams(url);

  const paramsObject = {};
  params.forEach((value, key) => {
    paramsObject[key] = value;
  });

  const response: any = await post("/payment/3dsecure/auth", {
    paymentId: paramsObject["paymentId"],
    conversationData: paramsObject["conversationData"],
  });

  const host = request.headers.get("x-forwarded-host");
  const port = request.headers.get("x-forwarded-port");
  const protocol = request.headers.get("x-forwarded-proto");

  const targetOrigin = `${protocol}://${host}`;

  if (response.status === "success") {
    // return script
    return new Response(
      `<script>
        document.addEventListener('DOMContentLoaded', function () {
            window.parent.postMessage('success', '${targetOrigin}'); 
        });
      </script>
    `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      },
    );
  } else {
    const scriptData = `
      <script>
        document.addEventListener('DOMContentLoaded', function () {
            window.parent.postMessage(${JSON.stringify({
              errorMessage: response.errorMessage,
            })}, '${targetOrigin}');
        });
      </script>
    `;
    return new Response(scriptData, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
}
