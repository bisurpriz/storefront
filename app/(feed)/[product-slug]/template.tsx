"use client";

import { useEffect } from "react";

const Template = ({ children }) => {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return children;
};

export default Template;
