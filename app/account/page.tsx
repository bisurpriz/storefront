import ProfileForm from "./components/ProfileForm";
import { getUserById } from "./actions";
import ProfileFormSkeleton from "./components/ProfileForm/ProfileFormSkeleton";
import clsx from "clsx";
import Exclamation from "@/components/Icons/Exclamation";

export const dynamic = "force-dynamic";

const Account = async () => {
  let error = null;

  const { user, loading, id } = await getUserById().catch((err) => {
    error = err;
    return {
      user: null,
      loading: false,
      id: null,
      error: err,
    };
  });

  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-2 max-md:mb-2 max-md:gap-1 max-sm:flex-col max-sm:items-start max-sm:justify-start">
        <h1 className="font-mono text-2xl font-semibold tracking-wide">
          Bilgilerim
        </h1>
        <p
          className={clsx(
            "text-xs text-slate-400",
            "flex items-center gap-1",
            "max-sm:mt-2",
            "max-sm:text-xs",
            "max-sm:gap-0.5",
          )}
        >
          <Exclamation /> Bilgilerinizi güncelleyebilirsiniz
        </p>
      </div>
      {loading ? (
        <ProfileFormSkeleton />
      ) : (
        <ProfileForm user={user} id={id!} error={error} />
      )}
    </div>
  );
};

export default Account;
