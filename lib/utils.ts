import { IMAGE_URL } from "@/contants/urls";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrlFromPath(path?: string, size = 150): string {
  if (!path) return `https://via.placeholder.com/${size}`;
  if (path.startsWith("http") || path.startsWith("https")) return path;

  const imageUrl = `${IMAGE_URL}/${path}?w=${size}`;
  return `${imageUrl}&format=auto,avif,webp`;
}

export function getProductDetailUrl(slug: string, id: number): string {
  return `/${slug}?pid=${id}`;
}

export function getCategoryUrl(slug: string): string {
  return `/kategori/${slug}`;
}

export function getTenantUrl(name: string, id: string): string {
  const tenantSlug = slugCreator(name);
  return `/magaza/${tenantSlug}?mid=${id}`;
}

export function slugCreator(name: string): string {
  return name
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
