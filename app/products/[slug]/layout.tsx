import React from "react";

export default async function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-10">{children}</div>
    </div>
  );
}
