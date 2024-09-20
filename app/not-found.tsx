import { Link } from "@/components/Link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-8 text-gray-800 gap-8">
      <span className="text-9xl w-96 h-96 bg-gradient-to-r from-primary-light to-primary-dark text-transparent bg-clip-text rounded-full flex items-center justify-center ring-2 ring-primary">
        404
      </span>
      <p className="text-2xl font-bold text-center mt-4">
        Üzgünüz, aradığınız sayfa bulunamadı.
      </p>
      <Link
        href="/"
        className="text-xl font-bold text-center mt-4 text-primary"
      >
        Anasayfaya dön
      </Link>
    </div>
  );
}
