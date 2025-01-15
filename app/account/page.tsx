import { getUserById } from "./actions";
import AccountForm from "./components/AccountForm";

export default async function AccountPage() {
  const { user } = await getUserById().catch((err) => ({
    user: null,
    loading: false,
    error: err,
  }));

  return <AccountForm user={user} />;
}
