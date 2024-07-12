import { CardAssociation } from "@/app/iyzico-payment/types";
import { IMAGE_URL } from "@/contants/urls";

export function getImageUrlFromPath(path: string): string {
  if (!path) return "https://via.placeholder.com/500";

  return `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${path}`;
}

export function getCardAssociationImageUrl(
  cardAssociation: CardAssociation
): string {
  let prefix = ".svg";
  if (cardAssociation === "TROY") {
    prefix = ".png";
  }
  return `${IMAGE_URL}/bank-logos/${cardAssociation}${prefix}`;
}
