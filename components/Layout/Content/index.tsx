"use client";

import React from "react";

type ContentProps = {
  children: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  return (
    <main className="content-height h-full container pt-6 max-md:px-4 mx-auto max-sm:w-auto">
      {children}
    </main>
  );
};

export default Content;
