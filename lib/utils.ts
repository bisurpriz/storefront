import { IMAGE_URL } from "@/contants/urls";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrlFromPath(path?: string, size = 150): string {
  if (!path) return `https://via.placeholder.com/${size}`;
  return `${IMAGE_URL}/${path}?format=webp`;
}

export function getProductDetailUrl(slug: string, id: number): string {
  return `/${slug}?pid=${id}`;
}

export function getCategoryUrl(slug: string, id: number): string {
  return `/kategori/${slug}?cid=${id}`;
}

export function getTenantUrl(slug: string, id: string): string {
  const tenantSlug = slugCreator(slug);
  return `/magaza/${tenantSlug}?mid=${id}`;
}

export function slugCreator(name: string): string {
  return name
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
