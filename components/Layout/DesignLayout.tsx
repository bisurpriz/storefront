import { GetAllCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import MobileBottomNav from "../MobileBottomNav";
import { Toaster } from "../ui/sonner";
import Footer from "./Footer";
import Header from "./Header";

export default function DesignLayout({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: GetAllCategoriesQuery["category"];
}) {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col max-md:mb-16">
      <Toaster />

      <Header category={categories} />
      <main className="box-border h-full flex-1 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-2 py-6 max-sm:py-2 sm:px-4">
          {children}
        </div>
      </main>
      <MobileBottomNav />
      <Footer />
    </div>
  );
}
