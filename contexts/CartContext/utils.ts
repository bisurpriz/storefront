import { Type } from "./types";

export const messages = (type: Type) => {
  switch (type) {
    case "add":
      return {
        loading: "Ürün sepete ekleniyor.",
        success: "Ürün sepete eklendi.",
        error: "Ürün sepete eklenirken bir hata oluştu.",
      };
    case "remove":
      return {
        loading: "Ürün sepetten çıkarılıyor.",
        success: "Ürün sepetten çıkarıldı.",
        error: "Ürün sepetten çıkarılırken bir hata oluştu.",
      };
    case "clear":
      return {
        loading: "Sepet temizleniyor.",
        success: "Sepet temizlendi.",
        error: "Sepet temizlenirken bir hata oluştu.",
      };
    case "update":
      return {
        loading: "Ürün güncelleniyor.",
        success: "Ürün güncellendi.",
        error: "Ürün güncellenirken bir hata oluştu.",
      };
    default:
      return {
        loading: "Sepet güncelleniyor.",
        success: "Sepet başarıyla güncellendi.",
        error: "Sepet güncellenirken bir hata oluştu.",
      };
  }
};
