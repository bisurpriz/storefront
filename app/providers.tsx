import { CostData, ProductForCart } from "@/common/types/Cart/cart";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";
import { CartProvider } from "@/contexts/CartContext";
import { CategoryProvider } from "@/contexts/CategoryContext";
import { ResponsiveDialogProvider } from "@/contexts/DialogContext/ResponsiveDialogContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { SearchProductProvider } from "@/contexts/SearchContext";
import { Category } from "@/graphql/generated-types";
import { ApolloWrapper } from "@/graphql/lib/apollo-wrapper";
import { GetUserByIdQuery } from "@/graphql/queries/account/account.generated";
import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import { PostHogProvider } from "@/lib/posthog/PostHogProvider";
import { ReactNode } from "react";
import { ProgressBar, ProgressBarProvider } from "react-transition-progress";

interface ProvidersProps {
  children: ReactNode;
  userData: GetUserByIdQuery;
  categoryData: GetMainCategoriesQuery;
  cartItems: ProductForCart[];
  costData: CostData;
}

export function Providers({
  children,
  userData,
  categoryData,
  cartItems,
  costData,
}: ProvidersProps) {
  return (
    <ProgressBarProvider>
      <ProgressBar className="fixed top-0 z-[1000] h-1 bg-primary shadow-lg shadow-sky-500/20" />
      <PostHogProvider>
        <AuthProvider user={userData?.user_by_pk}>
          <TooltipProvider>
            <ResponsiveDialogProvider>
              <ApolloWrapper>
                <BreadcrumbProvider>
                  <ProductProvider>
                    <CategoryProvider category={categoryData?.category}>
                      <CartProvider cartDbItems={cartItems} dbCost={costData}>
                        <SearchProductProvider
                          categories={categoryData?.category as Category[]}
                        >
                          {children}
                        </SearchProductProvider>
                      </CartProvider>
                    </CategoryProvider>
                  </ProductProvider>
                </BreadcrumbProvider>
              </ApolloWrapper>
            </ResponsiveDialogProvider>
          </TooltipProvider>
        </AuthProvider>
      </PostHogProvider>
    </ProgressBarProvider>
  );
}
