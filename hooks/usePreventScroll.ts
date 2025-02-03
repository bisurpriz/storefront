import { useEffect } from "react";

export function usePreventScroll(shouldPrevent: boolean) {
  useEffect(() => {
    if (shouldPrevent) {
      // Mevcut scroll pozisyonunu kaydet
      const scrollY = window.scrollY;

      // Body'yi kilitle
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Body'nin pozisyonunu eski haline getir
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      // Scroll pozisyonunu geri yükle
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      // Component unmount olduğunda body stillerini temizle
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [shouldPrevent]);
}
