"use client";

import Loading from "@/app/loading";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";

type ContentProps = {
  children: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <Toaster />
      <main className="content-height max-sm:content-height-sm h-full pt-6 max-md:px-4 max-sm:px-4 max-md:mx-0 mx-12 scroll-smooth">
        {children}
      </main>
    </Suspense>
  );
};

export default Content;
