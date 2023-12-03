"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { localeDistanceFormat } from "@/utils/format";
import Image from "next/image";
import { useState } from "react";
import { updateUserById } from "../../actions";
import ProfileFormSkeleton from "./ProfileFormSkeleton";
import PhoneInput from "@/components/PhoneInput";

const ProfileForm = ({
  user,
  id,
}: {
  user: {
    created_at: string;
    email: string;
    firstname: string;
    lastname: string;
    picture: string;
    phone: string;
    reference_code: string | null;
    vkn_tckn: string | null;
  };
  id: string;
}) => {
  const [userData, setUserData] = useState(user);

  return userData ? (
    <form
      className="flex flex-col gap-4 max-md:gap-2"
      onSubmit={async (e) => {
        e.preventDefault();

        await updateUserById({
          ...userData,
          id: id,
        });
      }}
    >
      <div className="flex items-start flex-col justify-start gap-2">
        <p className="text-xs text-slate-400">
          {localeDistanceFormat(new Date(userData.created_at))} önce kaydoldunuz
        </p>
        <Image
          src={userData.picture}
          alt="Profil resmi"
          className="rounded-lg w-36 h-36 max-sm:w-48 max-sm:h-48 shadow-sm shadow-7"
          width={200}
          height={200}
        />
      </div>
      <TextField
        label="İsim"
        id="firstname"
        placeholder="Adınız"
        className="md:w-80"
        type="text"
        value={userData.firstname}
        onChange={(e, value) => setUserData({ ...userData, firstname: value })}
      />
      <TextField
        label="Soyisim"
        id="lastname"
        placeholder="Adınız"
        className="md:w-80"
        type="text"
        value={userData.lastname}
        onChange={(e, value) => setUserData({ ...userData, lastname: value })}
      />
      <TextField
        label="E-posta"
        id="email"
        placeholder="E-posta adresiniz"
        className="md:w-80"
        type="email"
        disabled
        value={user?.email}
      />
      <PhoneInput
        label="Telefon"
        className="md:w-80"
        placeholder="Telefon numaranız"
        value={userData.phone}
        onChange={(e, value) => setUserData({ ...userData, phone: value })}
      />
      <TextField
        label="VKN/TCKN"
        id="vkn_tckn"
        placeholder="VKN/TCKN"
        className="md:w-80"
        type="text"
        value={userData.vkn_tckn || ""}
        onChange={(e, value) => setUserData({ ...userData, vkn_tckn: value })}
      />
      <TextField
        label="Referans Kodu"
        id="reference_code"
        placeholder="Referans kodunuz"
        className="md:w-80"
        type="text"
        disabled
        value={userData.reference_code || ""}
      />

      <Button type="submit" className="w-fit">
        Kaydet
      </Button>
    </form>
  ) : (
    <ProfileFormSkeleton />
  );
};

export default ProfileForm;
