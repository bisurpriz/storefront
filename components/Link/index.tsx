"use client";

import { startTransition } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useProgress } from "react-transition-progress";

export function Link({
  href,
  children,
  replace,
  ...rest
}: Parameters<typeof NextLink>[0]) {
  const router = useRouter();
  const startProgress = useProgress();

  return (
    <NextLink
      href={href}
      onClick={(e) => {
        e.preventDefault();
        if (rest.target === "_blank") {
          window.open(href.toString(), "_blank");
          return;
        }

        startTransition(() => {
          startProgress();
          const url = href.toString();
          if (replace) {
            router.replace(url);
          } else {
            router.push(url);
          }
        });
      }}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
