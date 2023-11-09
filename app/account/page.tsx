import React from "react";
import ProfileForm from "./components/ProfileForm";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { getUserById } from "./actions";
import ProfileFormSkeleton from "./components/ProfileForm/ProfileFormSkeleton";
import { readIdFromCookies } from "../actions";

const Account = async () => {
  const id = await readIdFromCookies("user_id");

  const { user, loading } = await getUserById(id!).catch((err) => {
    console.error(err);
    return { user: null, loading: false };
  });

  return (
    <div>
      <div className="flex items-end justify-between gap-2 mb-4 max-md:mb-2 max-md:gap-1 max-sm:flex-col max-sm:justify-start max-sm:items-start">
        <h1 className="text-2xl font-mono font-semibold tracking-wide">
          Bilgilerim
        </h1>
        <p className="text-xs flex items-center gap-1 text-emerald-600 py-1 px-2 border border-emerald-200 bg-emerald-100 rounded-lg">
          <AiOutlineExclamationCircle /> Bilgilerinizi güncelleyebilirsiniz
        </p>
      </div>
      {loading ? <ProfileFormSkeleton /> : <ProfileForm user={user} id={id!} />}
    </div>
  );
};

export default Account;
