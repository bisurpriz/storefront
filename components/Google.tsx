"use client";

import { signIn } from "next-auth/react";

export const GoogleNextAuth = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center justify-center w-full h-12 text-black bg-google rounded-md"
    >
      Google
    </button>
  );
};
