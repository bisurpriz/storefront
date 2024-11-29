import { Link } from "@/components/Link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 py-8 text-gray-700">
      <span className="flex h-96 w-96 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary bg-clip-text text-9xl text-transparent ring-2 ring-primary">
        404
      </span>
      <p className="mt-4 text-center text-2xl font-bold">
        Üzgünüz, aradığınız sayfa bulunamadı.
      </p>
      <Link
        href="/"
        className="mt-4 text-center text-xl font-bold text-primary"
      >
        Anasayfaya dön
      </Link>
    </div>
  );
}
