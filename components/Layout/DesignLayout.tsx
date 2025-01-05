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
    <div className="flex min-h-dvh flex-col">
      <Toaster />
      <Header category={categories} />

      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Scrollable content area */}
        <div className="absolute inset-0 flex flex-col overflow-y-auto">
          <main className="relative flex-1">
            <div className="container mx-auto max-w-7xl px-2 py-6 max-md:mb-20 max-sm:py-2 sm:px-4">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
