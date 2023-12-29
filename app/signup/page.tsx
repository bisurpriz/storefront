import { SignUp } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return (
    <div>
      <SignUp path="/signup" routing="path"  />
    </div>
  );
};

export default Page;
