"use client";

import React, { useState } from "react";
import { Link } from "@/components/Link";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getImageUrlFromPath } from "@/utils/getImageUrl";

interface Variant {
  variantId: number;
  variantSlug: string;
  name: string;
  price: number;
  imageUrl: string;
  categorySlug: string;
}

interface ProductVariantSelectorProps {
  variants: Variant[];
}

export default function ProductVariantSelector({
  variants,
}: ProductVariantSelectorProps) {
  return (
    variants.length > 0 && (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Ürün Varyantları</h2>
        <RadioGroup>
          {variants.map((variant) => (
            <Link
              key={variant.variantId}
              href={`/${
                variant.categorySlug
              }/${variant.variantSlug}?pid=${variant.variantId}`}
            >
              <div className="mb-2 flex items-center space-x-4 rounded-md border p-2">
                <RadioGroupItem
                  value={variant.variantId.toString()}
                  id={variant.variantId.toString()}
                  className="sr-only"
                />
                <Label
                  htmlFor={variant.variantId.toString()}
                  className="flex w-full cursor-pointer items-center space-x-4"
                >
                  <Image
                    src={getImageUrlFromPath(variant.imageUrl)}
                    alt={variant.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <div>{variant.name}</div>
                    <div className="text-sm text-gray-600">
                      {variant.price.toFixed(2)} TL
                    </div>
                  </div>
                </Label>
              </div>
            </Link>
          ))}
        </RadioGroup>
      </div>
    )
  );
}
