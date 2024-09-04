import Link from "next/link";
import React from "react";
import Package from "../Icons/Package";

const EmptyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <Package className="w-24 h-24 text-primary mx-auto" />
        <h1 className="mt-4 text-3xl max-md:text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          Aradığınız Ürünü Bulamadık
        </h1>
        <p className="mt-4 text-muted-foreground">
          Görünüşe göre kayboldunuz.
          <br />
          Lütfen tekrar deneyin.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex text-white items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
