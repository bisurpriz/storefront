import { GetAllCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import MobileBottomNav from "../MobileBottomNav";
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
    <div className="flex min-h-screen flex-col max-md:mb-16">
      <Header category={categories} />
      <main className="box-border flex-1 overflow-hidden">
        <div className="container mx-auto max-w-7xl py-6 sm:px-4">
          {children}
        </div>
      </main>
      <MobileBottomNav />
      <Footer />
    </div>
  );
}
