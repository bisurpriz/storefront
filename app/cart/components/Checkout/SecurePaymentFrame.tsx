"use client";

import Modal from "@/components/Modal";
import clsx from "clsx";
import { useEffect, useRef } from "react";

interface SecurePaymentFrameProps {
  base64Content: string;
}

export const SecurePaymentFrame = ({
  base64Content,
}: SecurePaymentFrameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const checkStatus = () => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage("check-status", "*");
      }
    };

    checkStatus();
  }, []);

  return (
    <Modal open={true}>
      <iframe
        ref={iframeRef}
        src={`data:text/html;base64,${base64Content}`}
        className={clsx(
          "flex h-full min-h-[400px] w-full items-center justify-center",
          "rounded-lg border border-gray-200 bg-white p-4 shadow-lg",
        )}
        title="3D Secure Payment"
        sandbox="allow-forms allow-scripts allow-same-origin"
      />
    </Modal>
  );
};
