"use client";

import { Button } from "@/components/ui/button";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { useRef, useState } from "react";
import { approveOrderImages } from "../actions";
import { toast } from "sonner";

const ImagePreview = ({
  initialImages,
  salt,
}: {
  initialImages: string[];
  salt: string;
}) => {
  const [clickedImage, setClickedImage] = useState("");
  const [note, setNote] = useState("");
  const [approveButtonDisabled, setApproveButtonDisabled] = useState(false);
  const ref = useRef(null);

  const closeModal = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setClickedImage(null);
    }
  };

  const onSubmit = async (approveStatus: boolean) => {
    const response = await approveOrderImages({
      salt,
      note,
      status: approveStatus,
    });
    if (response.approved) {
      setApproveButtonDisabled(true);
      toast.success("Siparişiniz başarıyla onaylandı.", {
        position: "bottom-right",

        id: "login-success",
        duration: 1500,
      });
    } else {
      toast.success("Geri bildirim gönderildi.", {
        position: "bottom-right",

        id: "login-success",
        duration: 1500,
      });
    }
  };

  return (
    <div>
      <div
        className="relative flex h-full w-full cursor-pointer flex-col gap-3 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-opacity hover:opacity-90"
        data-dialog-target="image-dialog"
      >
        {initialImages.map((image, index) => (
          <img
            key={image}
            onClick={() => setClickedImage(image)}
            alt="nature"
            className="h-full w-full object-cover object-center"
            src={getImageUrlFromPath(image)}
          />
        ))}
      </div>
      {clickedImage && (
        <div
          data-dialog-backdrop="image-dialog"
          data-dialog-backdrop-close="true"
          className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-[${
            clickedImage ? 1 : 0
          }] duration-300" backdrop-blur-sm transition-opacity`}
          onClick={closeModal}
        >
          <div
            className="text-blue-gray-500 relative m-4 flex w-[90%] min-w-[75%] rounded-lg bg-white font-sans text-base font-light leading-relaxed antialiased shadow-2xl"
            role="dialog"
            data-dialog="image-dialog"
            ref={ref}
          >
            <div className="border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500 relative border-b border-t p-0 font-sans text-base font-light leading-relaxed antialiased">
              <img
                alt="nature"
                className="h-full w-full object-cover object-center"
                src={getImageUrlFromPath(clickedImage)}
              />
            </div>
          </div>
        </div>
      )}

      {/* onayla yada itiraz et butonlari ve not input */}
      <div className="mt-4 flex flex-col justify-end gap-3">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="h-24 w-full rounded-md border border-gray-300 p-2"
          placeholder="Notunuzu buraya yazdıktan sonra onayla yada itiraz et butonlarına basınız."
        ></textarea>
        <div className="flex gap-3">
          <Button
            disabled={!note}
            variant="destructive"
            onClick={() => onSubmit(false)}
          >
            İtiraz Et
          </Button>
          <Button
            disabled={approveButtonDisabled}
            variant="default"
            onClick={() => onSubmit(true)}
          >
            Onayla
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
