"use client";

import Button from "@/components/Button";
import {
  VerifyTokenDocument,
  VerifyTokenMutation,
  VerifyTokenMutationVariables,
} from "@/graphql/generated";
import { useMutation } from "@apollo/client";
import clsx from "clsx";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";

enum ResultTypes {
  NO_USER_FOUND = "NO_USER_FOUND",
  EMAIL_RESENT = "EMAIL_RESENT",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  EMAIL_VERIFIED = "EMAIL_VERIFIED",
}

const resultMessages = {
  NO_USER_FOUND: "Kullanıcı bulunamadı.",
  EMAIL_RESENT: "Email tekrar gönder",
  TOKEN_EXPIRED: "Token süresi doldu.",
  EMAIL_VERIFIED: "Email doğrulandı.",
};

type ResultType = keyof typeof ResultTypes;

function VerifyPage() {
  const searchParams = useSearchParams();
  const verifiedToken = searchParams["token"];

  if (!verifiedToken) redirect("/");

  const [
    mutate,
    {
      data: {
        email_verify: { result },
      },
      loading,
      error,
    },
  ] = useMutation<VerifyTokenMutation, VerifyTokenMutationVariables>(
    VerifyTokenDocument,
    {
      variables: {
        token: verifiedToken,
        resend: false,
      },
    }
  );

  // const data = {
  //   email_verify: {
  //     result: ResultTypes.EMAIL_RESENT,
  //   },
  // };

  return (
    <div
      className={clsx("flex", "items-center", "justify-center font-manrope")}
    >
      <div className={clsx("text-center")}>
        {(result === ResultTypes.TOKEN_EXPIRED ||
          result === ResultTypes.NO_USER_FOUND) && (
          <>
            <p
              className={clsx(
                "text-red-500",
                "text-lg",
                "font-semibold",
                "mb-4"
              )}
            >
              {resultMessages[result]}
            </p>
            {result === ResultTypes.TOKEN_EXPIRED && (
              <Button
                onClick={() =>
                  mutate({
                    variables: {
                      token: verifiedToken,
                      resend: true,
                    },
                  })
                }
                loading={loading}
              >
                Email Tekrar Gönder
              </Button>
            )}
          </>
        )}
        {result === ResultTypes.EMAIL_VERIFIED && (
          <>
            <p
              className={clsx(
                "text-green-500",
                "text-lg",
                "font-semibold",
                "mb-4"
              )}
            >
              Hesabınız başarıyla doğrulandı. Giriş yapabilirsiniz.
            </p>

            <Link
              href="/login"
              className={clsx(
                "bg-blue-500",
                "text-white",
                "py-2",
                "px-4",
                "rounded",
                "text-sm",
                "font-semibold"
              )}
            >
              Giriş Yap
            </Link>
          </>
        )}

        {result === ResultTypes.EMAIL_RESENT && (
          <p
            className={clsx(
              "text-green-500",
              "text-lg",
              "font-semibold",
              "mb-4"
            )}
          >
            {resultMessages[result]}
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyPage;
