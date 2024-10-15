"use client";

import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";
import PhoneInput from "@/components/PhoneInput";
import TextField from "@/components/TextField";
import {
  UpdateUserByIdDocument,
  UpdateUserByIdMutation,
  UpdateUserByIdMutationVariables,
} from "@/graphql/queries/account/account.generated";
import { localeDistanceFormat } from "@/utils/format";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import Image from "next/image";
import { Link } from "@/components/Link";
import { useEffect } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { object, string } from "yup";
import { toast } from "sonner";

const schema = object().shape({
  firstname: string().required("Adınızı girin"),
  lastname: string().required("Soyadınızı girin"),
  email: string().email("Geçerli bir e-posta adresi girin"),
  phone: string().required("Telefon numaranızı girin"),
});

const ProfileForm = ({
  user,
  id,
  error,
}: {
  user: {
    created_at: string;
    email: string;
    firstname: string;
    lastname: string;
    picture: string;
    phone: string;
    reference_code: string | null;
  };
  id: string;
  error: any;
}) => {
  const [updateUser, { data, loading }] = useMutation<
    UpdateUserByIdMutation,
    UpdateUserByIdMutationVariables
  >(UpdateUserByIdDocument);

  const handleSubmit = async ({ data }) => {
    const { phone, ...rest } = data;
    await updateUser({
      variables: {
        id,
        firstname: rest.firstname,
        lastname: rest.lastname,
        phone: phone.replace(/[^0-9]/g, ""),
      },
    });
    toast.success("Profil bilgileriniz başarıyla güncellendi.", {
      position: "bottom-right",
      id: "login-success",
      duration: 3000,
    });
  };

  const { control, reset } = useForm({
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      phone: formatPhoneNumber(user?.phone),
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
    disabled: loading,
  });

  useEffect(() => {
    if (data) {
      reset({
        firstname: data.update_user_by_pk.firstname,
        lastname: data.update_user_by_pk?.lastname,
        email: data.update_user_by_pk?.email,
        phone: formatPhoneNumber(data.update_user_by_pk?.phone),
      });
    } else {
      reset({
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        phone: formatPhoneNumber(user?.phone),
      });
    }

    if (error) {
      console.error(error);
    }
  }, [user, data]);

  return user ? (
    <Form
      className={clsx(
        "flex items-start justify-start flex-wrap gap-12 max-lg:gap-6 max-lg:w-full"
      )}
      control={control}
      onSubmit={handleSubmit}
    >
      <div
        className={clsx(
          "flex flex-col items-start justify-start gap-2",
          "max-lg:gap-1 max-lg:w-full max-lg:my-2 max-lg:items-center",
          "max-lg:flex-col-reverse"
        )}
      >
        <p className="text-xs text-slate-400">
          {localeDistanceFormat(new Date(user.created_at))} önce kaydoldunuz
        </p>
        <Image
          src={user.picture || "/avatar.png"}
          alt="Profil resmi"
          className="rounded-lg w-36 h-36 max-lg:w-48 max-lg:h-48 shadow-sm shadow-7"
          width={200}
          height={200}
        />
      </div>
      <div className={"flex flex-col gap-4 flex-1"}>
        <Controller
          name="firstname"
          control={control}
          defaultValue={user.firstname}
          render={({
            field: { onChange, name, ref, value, disabled },
            fieldState: { error },
          }) => (
            <TextField
              label="Ad"
              placeholder="Adınızı girin"
              onChange={onChange}
              id={name}
              ref={ref}
              value={value}
              disabled={disabled}
              error={!!error}
              errorMessage={error?.message}
            />
          )}
        />

        <Controller
          name="lastname"
          control={control}
          defaultValue={user.lastname}
          render={({
            field: { onChange, name, ref, value, disabled },
            fieldState: { error },
          }) => (
            <TextField
              label="Soyad"
              placeholder="Soyadınızı girin"
              onChange={onChange}
              id={name}
              ref={ref}
              value={value}
              disabled={disabled}
              error={!!error}
              errorMessage={error?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          disabled
          defaultValue={user.email}
          render={({
            field: { onChange, name, ref, value, disabled },
            fieldState: { error },
          }) => (
            <TextField
              label="E-posta"
              placeholder="E-posta adresinizi girin"
              onChange={onChange}
              id={name}
              ref={ref}
              value={value}
              disabled={true}
              error={!!error}
              errorMessage={error?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue={user.phone}
          render={({
            field: { onChange, name, value },
            fieldState: { error },
          }) => (
            <PhoneInput
              label="Telefon"
              placeholder="Telefon numaranızı girin"
              onChange={onChange}
              id={name}
              value={value}
              error={!!error}
              errorMessage={error?.message}
            />
          )}
        />

        <Button loading={loading} type="submit" className="w-fit">
          Kaydet
        </Button>
        <LogoutButton />
      </div>
    </Form>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-center my-auto">
      <h1 className="text-2xl font-semibold tracking-wide">
        Kullanıcı verileri alınıken bir hata oluştu.
      </h1>
      <p className="text-sm text-slate-400 capitalize">
        {error?.message || "Lütfen daha sonra tekrar deneyin."}
      </p>

      <p>
        Tekrar giriş yapmak sorununuzu çözebilir.{" "}
        <Link href="/api/auth/logout">
          <Button variant="destructive">Çıkış yap</Button>
        </Link>
      </p>
    </div>
  );
};

export default ProfileForm;
