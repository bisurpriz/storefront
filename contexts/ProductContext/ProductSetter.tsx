"use client";

import { Product } from "@/graphql/generated-types";
import { getCategoryUrl, getProductDetailUrl, getTenantUrl } from "@/lib/utils";
import { FC, useEffect } from "react";
import { useProduct } from ".";
import { useBreadcrumb } from "../BreadcrumbContext";

type ProductSetterProps = {
  initialData: Product;
};

const ProductSetter: FC<ProductSetterProps> = ({ initialData }) => {
  const { setProduct } = useProduct();
  const { setBreadcrumbs } = useBreadcrumb();

  const getBreadcrumb = (product: Product) => {
    if (!product) return [];
    let breadcrumb;

    breadcrumb = product.product_categories.map(({ category }) => ({
      label: category.name,
      href: getCategoryUrl(category.slug),
    }));

    breadcrumb.push({
      label: product.tenant.tenants[0].name,
      href: getTenantUrl(
        product.tenant.tenants[0].name,
        product.tenant.tenants[0].id,
      ),
    });

    breadcrumb.push({
      label: product.name,
      href: getProductDetailUrl(product.slug, product.id),
    });

    return breadcrumb;
  };

  useEffect(() => {
    setProduct(initialData);
    setBreadcrumbs(getBreadcrumb(initialData));

    return () => {
      setProduct(null);
    };
  }, [initialData]);

  return null;
};

export default ProductSetter;
