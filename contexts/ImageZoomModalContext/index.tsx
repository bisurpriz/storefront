"use client";

import Modal from "@/components/Modal/FramerModal/Modal";
import Image from "next/image";
import { ReactNode, createContext, useContext, useState } from "react";

interface ImageZoomModalType {
  open: (src: string) => void;
  close: () => void;
}

export const ImageZoomModal = createContext<ImageZoomModalType>({
  open: () => {},
  close: () => {},
});

export const ImageZoomModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [src, setSrc] = useState<string | null>(null);

  const open = (src: string) => {
    setSrc(src);
  };

  const close = () => {
    setSrc(null);
  };

  const value = { open, close };

  return (
    <ImageZoomModal.Provider value={value}>
      <Modal open={Boolean(src)} handleClose={close}>
        <div className="flex items-center justify-center max-w-xl h-full overflow-hidden">
          <Image
            src={src}
            alt="zoomed"
            width={1200}
            height={1200}
            className="w-full object-contain max-w-4xl select-none overflow-hidden"
          />
        </div>
      </Modal>

      {children}
    </ImageZoomModal.Provider>
  );
};

export const useImageZoomModal = () => useContext(ImageZoomModal);
