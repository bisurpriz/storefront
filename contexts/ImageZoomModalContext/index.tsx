"use client";

import Modal from "@/components/Modal/FramerModal/Modal";
import Image from "next/image";
import { ReactNode, createContext, useContext, useState } from "react";

interface ImageZoomModalType {
  onOpen: (src: string) => void;
  onClose: () => void;
}

export const ImageZoomModal = createContext<ImageZoomModalType>({
  onOpen: () => {},
  onClose: () => {},
});

export const ImageZoomModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [src, setSrc] = useState<string | null>(null);

  const onOpen = (src: string) => {
    setSrc(src);
  };

  const onClose = () => {
    setSrc(null);
  };

  const value = { onOpen, onClose };

  return (
    <ImageZoomModal.Provider value={value}>
      <Modal open={Boolean(src)} handleClose={onClose}>
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
