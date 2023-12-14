import TextField from "@/components/TextField";
import { localeDistanceFormat } from "@/utils/format";
import Image from "next/image";
import { updateUserById } from "../../actions";
import PhoneInput from "@/components/PhoneInput";
import SubmitButton from "@/components/Button/SubmitButton";
import { revalidatePath } from "next/cache";
import Button from "@/components/Button";
import Link from "next/link";

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
    vkn_tckn: string | null;
  };
  id: string;
  error: any;
}) => {
  async function updateUser(formData: FormData) {
    "use server";

    const values = Object.fromEntries(formData.entries());
    const variables = {
      firstname:
        (values.firstname as string)?.length > 0
          ? (values.firstname as string)
          : user.firstname,
      lastname:
        (values.lastname as string)?.length > 0
          ? (values.lastname as string)
          : user.lastname,
      phone:
        (values.phone as string)?.length > 0
          ? (values.phone as string)
          : user.phone,
      vkn_tckn:
        (values.vkn_tckn as string)?.length > 0
          ? (values.vkn_tckn as string)
          : user.vkn_tckn,
      email:
        (values.email as string)?.length > 0
          ? (values.email as string)
          : user.email,
      id,
      picture:
        (values.picture as string)?.length > 0
          ? (values.picture as string)
          : user.picture,
    };

    try {
      await updateUserById({
        ...variables,
      });

      revalidatePath("/account");
    } catch (err) {
      console.error(err);
    }
  }

  return user ? (
    <form className="flex flex-col gap-4 max-md:gap-2" action={updateUser}>
      <div className="flex items-start flex-col justify-start gap-2">
        <p className="text-xs text-slate-400">
          {localeDistanceFormat(new Date(user.created_at))} önce kaydoldunuz
        </p>
        <Image
          src={user.picture}
          alt="Profil resmi"
          className="rounded-lg w-36 h-36 max-sm:w-48 max-sm:h-48 shadow-sm shadow-7"
          width={200}
          height={200}
        />
      </div>
      <TextField
        label="İsim"
        id="firstname"
        placeholder={user.firstname || "Adınız"}
        type="text"
      />
      <TextField
        label="Soyisim"
        id="lastname"
        placeholder={user.lastname || "Soyadınız"}
        type="text"
      />
      <TextField
        label="E-posta"
        id="email"
        placeholder={user.email || "E-posta adresiniz"}
        type="email"
        disabled
      />
      <PhoneInput
        label="Telefon"
        placeholder={user.phone || "Telefon numaranız"}
      />
      <TextField
        label="VKN/TCKN"
        id="vkn_tckn"
        placeholder={user.vkn_tckn || "VKN/TCKN"}
        type="text"
      />
      <TextField
        label="Referans Kodu"
        id="reference_code"
        placeholder={user.reference_code || "Referans kodunuz"}
        type="text"
        disabled
      />

      <SubmitButton className="w-fit">Kaydet</SubmitButton>
    </form>
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
          <Button>Çıkış yap</Button>
        </Link>
      </p>
    </div>
  );
};

export default ProfileForm;
