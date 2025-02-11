import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import { GetCategoriesDocument } from "@/service/category";
import { BonnmarseApi } from "@/service/fetch";
import MobileBottomNav from "../MobileBottomNav";
import { Toaster } from "../ui/toaster";
import Footer from "./Footer";
import Header from "./Header";

export default async function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await BonnmarseApi.request<GetMainCategoriesQuery>({
    query: GetCategoriesDocument,
    tags: ["getMainCategories"],
    cache: {
      enable: true,
      duration: 30 * 60 * 1000,
    },
    withAuth: false,
  });

  return (
    <div className="flex flex-col h-full">
      <Toaster />
      <Header category={categories.category} />

      <div className="relative flex flex-col flex-1 overflow-hidden">
        {/* Scrollable content area */}
        <div className="absolute inset-0 flex flex-col overflow-hidden overflow-y-auto">
          <main className="relative flex-1">
            <div className="container px-2 py-6 pt-2 mx-auto max-w-7xl max-md:mb-20 max-sm:py-2 sm:px-4">
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
