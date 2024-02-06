import Button from '@/components/Button';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-12">
      <h1 className="text-4xl font-bold text-center">404</h1>

      <p className="text-2xl font-bold text-center">
        Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyiniz.
      </p>

      <Link href="/">
        <Button>Anasayfaya Dön</Button>
      </Link>
    </div>
  );
};

export default NotFound;
