import React from "react";
import Package from "../Icons/Package";
import { Link } from "@/components/Link";

const EmptyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <Package className="mx-auto h-24 w-24 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-700 max-md:text-2xl sm:text-4xl">
          Henüz aramanızla eşleşen bir ürünümüz bulunmamaktadır.
        </h1>
        <p className="mt-4 text-slate-500">
          Yakın zamanda daha fazla ürün çeşidiyle karşınızda olacağız.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyPage;
