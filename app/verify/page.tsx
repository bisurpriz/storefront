"use client";

import { Button } from "@/components/ui/button";
import {
  VerifyTokenDocument,
  VerifyTokenMutation,
  VerifyTokenMutationVariables,
} from "@/graphql/queries/verify/verify.generated";

import { useMutation } from "@apollo/client";
import clsx from "clsx";
import { Link } from "@/components/Link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

enum ResultTypes {
  NO_USER_FOUND = "NO_USER_FOUND",
  EMAIL_RESENT = "EMAIL_RESENT",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  EMAIL_VERIFIED = "EMAIL_VERIFIED",
  ERROR = "ERROR",
  ALREADY_VERIFIED = "ALREADY_VERIFIED",
}

const resultMessages = {
  NO_USER_FOUND: "Kullanıcı bulunamadı. Lütfen tekrar deneyin.",
  EMAIL_RESENT:
    "Aktivasyon maili tekrar gönderildi. Lütfen mail kutunuzu kontrol edin.",
  TOKEN_EXPIRED: "Aktivasyon süresi dolmuş. Lütfen tekrar deneyin.",
  EMAIL_VERIFIED: "Email doğrulandı. Giriş yapabilirsiniz.",
  ERROR: "Geçersiz veya hatalı link olabilir. Lütfen tekrar deneyin.",
  ALREADY_VERIFIED: "Email zaten doğrulanmış.",
};

type ResultType = keyof typeof ResultTypes;

function VerifyPage() {
  const searchParams = useSearchParams();
  const verifiedToken = searchParams.get("token");

  const router = useRouter();

  if (!verifiedToken) router.replace("/");

  const [mutate, { data, loading, error }] = useMutation<
    VerifyTokenMutation,
    VerifyTokenMutationVariables
  >(VerifyTokenDocument, {
    variables: {
      token: verifiedToken,
      resend: false,
    },
  });

  useEffect(() => {
    if (verifiedToken) {
      mutate();
    }
  }, [verifiedToken]);

  const result = data?.email_verify?.result;

  if (result === ResultTypes.ALREADY_VERIFIED) router.replace("/");

  return (
    <div
      className={clsx(
        "content-height flex flex-col items-center justify-center bg-gray-100 max-md:bg-white",
      )}
    >
      <div className={clsx("w-full max-w-md space-y-4")}>
        {(result === ResultTypes.TOKEN_EXPIRED ||
          result === ResultTypes.NO_USER_FOUND) && (
          <>
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-3xl font-bold">
                {result === ResultTypes.TOKEN_EXPIRED
                  ? "Aktivasyon Süresi Dolmuş"
                  : "Kullanıcı Bulunamadı"}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {resultMessages[result]}
              </p>
            </div>
            {result === ResultTypes.TOKEN_EXPIRED && (
              <Button
                variant="outline"
                onClick={() => {
                  mutate({
                    variables: {
                      token: verifiedToken,
                      resend: true,
                    },
                  });
                }}
                loading={false}
                className="mt-4 flex w-full items-center justify-center"
              >
                Tekrar Gönder
              </Button>
            )}
          </>
        )}
        {result === ResultTypes.EMAIL_VERIFIED && (
          <>
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-3xl font-bold">Email Doğrulandı</h1>
              <p className="text-gray-500 dark:text-gray-400">
                {resultMessages[result]}
              </p>
              <Button
                variant="outline"
                className="mt-4 flex w-full items-center justify-center"
              >
                <Link href="/login" replace>
                  Giriş Yap
                </Link>
              </Button>
            </div>
          </>
        )}

        {result === ResultTypes.EMAIL_RESENT && (
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold">Aktivasyon Maili Gönderildi</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {resultMessages[result]}
            </p>
          </div>
        )}

        {result === ResultTypes.ERROR && (
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold">Bir hata oluştu.</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {resultMessages[result]}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                mutate({
                  variables: {
                    token: verifiedToken,
                    resend: true,
                  },
                });
              }}
              loading={false}
              className="mt-4 flex w-full items-center justify-center"
            >
              Tekrar Gönder
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyPage;
