import { ReactNode } from "react";

// Set revalidation time for ISR (in seconds)
export const revalidate = 300; // Revalidate every 5 minutes

// Enable dynamic rendering for pages not in the static paths
export const dynamicParams = true;

// Force dynamic rendering for this layout
export const dynamic = "force-dynamic";

export default async function ProductExample({
  children,
}: {
  children: ReactNode;
}) {
  return <div>{children}</div>;
}
