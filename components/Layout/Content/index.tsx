"use client";

import React from "react";

type ContentProps = {
  children: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  return (
    <main className="content-height max-sm:content-height-sm h-full pt-6 max-md:px-4 max-sm:px-4 max-md:mx-0 mx-12 scroll-smooth">
      {children}
    </main>
  );
};

export default Content;
