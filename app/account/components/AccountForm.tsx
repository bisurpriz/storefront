"use client";

import LogoutButton from "@/components/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateUserByIdDocument } from "@/graphql/queries/account/account.generated";
import { getImageUrlFromPath } from "@/lib/utils";
import { localeDistanceFormat } from "@/utils/format";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Camera, Mail, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { object, string } from "yup";

const schema = object().shape({
  firstname: string().required("Adınızı girin"),
  lastname: string().required("Soyadınızı girin"),
  email: string().email("Geçerli bir e-posta adresi girin"),
  phone: string().required("Telefon numaranızı girin"),
});

interface AccountFormProps {
  user: {
    id: string;
    created_at: string;
    email: string;
    firstname: string;
    lastname: string;
    picture: string;
    phone: string;
    reference_code: string | null;
  };
}

export default function AccountForm({ user }: AccountFormProps) {
  const { refresh } = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [updateUser, { loading }] = useMutation(UpdateUserByIdDocument);

  const defaultValues = {
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    phone: user?.phone ? formatPhoneNumber(user.phone) : "",
  };

  const { control, reset, handleSubmit } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      phone: user?.phone ? formatPhoneNumber(user.phone) : "",
    });
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    try {
      const { phone, ...rest } = data;
      await updateUser({
        variables: {
          id: user.id,
          firstname: rest.firstname,
          lastname: rest.lastname,
          phone: phone.replace(/[^0-9]/g, ""),
        },
      });
      toast.success("Profil bilgileriniz başarıyla güncellendi.");
      setIsEditing(false);
      refresh();
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleCancel = () => {
    reset(defaultValues);
    setIsEditing(false);
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Hesap Bilgileri
            </h2>
            <p className="text-sm text-muted-foreground">
              Kişisel bilgilerinizi görüntüleyin ve güncelleyin.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                  className="h-10"
                >
                  Vazgeç
                </Button>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  type="button"
                  disabled={loading}
                  className="h-10"
                >
                  {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                </Button>
              </>
            ) : (
              <>
                <LogoutButton />
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="h-10 gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Düzenle
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={getImageUrlFromPath(user?.picture || "", 150)}
                alt={user?.firstname || ""}
              />
              <AvatarFallback className="text-lg">
                {(user?.firstname?.[0] || "") + (user?.lastname?.[0] || "")}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <CardTitle className="text-2xl">
              {user?.firstname || ""} {user?.lastname || ""}
            </CardTitle>
            <CardDescription className="mt-2 flex items-center justify-center gap-2 sm:justify-start">
              <Mail className="h-4 w-4" />
              {user?.email || ""}
            </CardDescription>
            <p className="mt-2 text-xs text-muted-foreground">
              {localeDistanceFormat(new Date(user.created_at))} önce kaydoldunuz
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Controller
              name="firstname"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label htmlFor="firstname">Ad</Label>
                  <Input
                    {...field}
                    value={field.value || ""}
                    id="firstname"
                    placeholder="Adınız"
                    error={!!error}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                  {error && isEditing && (
                    <p className="mt-1 text-xs text-destructive">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="space-y-2">
            <Controller
              name="lastname"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label htmlFor="lastname">Soyad</Label>
                  <Input
                    {...field}
                    value={field.value || ""}
                    id="lastname"
                    placeholder="Soyadınız"
                    error={!!error}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                  {error && isEditing && (
                    <p className="mt-1 text-xs text-destructive">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input
                  {...field}
                  value={field.value || ""}
                  id="email"
                  type="email"
                  disabled
                  className="bg-muted"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  E-posta adresi değiştirilemez.
                </p>
              </div>
            )}
          />
        </div>

        <div className="mt-6 space-y-2">
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  {...field}
                  value={field.value || ""}
                  id="phone"
                  type="tel"
                  placeholder="Telefon numaranız"
                  error={!!error}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
                {error && isEditing && (
                  <p className="mt-1 text-xs text-destructive">
                    {error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="mt-6 space-y-2">
          <Label htmlFor="reference">Referans Kodu</Label>
          <Input
            id="reference"
            value={user?.reference_code || ""}
            disabled
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Bu kod sizin benzersiz referans kodunuzdur.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
