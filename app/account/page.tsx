import { Suspense } from "react";
import { getUserById } from "./actions";
import AccountForm from "./components/AccountForm";
import AccountFormSkeleton from "./components/AccountFormSkeleton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AccountPage() {
  const { user, loading, error } = await getUserById().catch((err) => ({
    user: null,
    loading: false,
    error: err,
  }));

  if (loading) return <AccountFormSkeleton />;

  return (
    <Suspense fallback={<AccountFormSkeleton />}>
      <AccountForm user={user} />
    </Suspense>
  );
}
