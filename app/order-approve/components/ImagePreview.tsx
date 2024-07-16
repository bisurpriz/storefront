"use client";

import Button from "@/components/Button";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { approveOrderImages } from "../actions";

const ImagePreview = ({
  initialImages,
  orderItemId,
  salt,
}: {
  initialImages: string[];
  orderItemId: number;
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
      orderItemId,
      salt,
      note,
      status: approveStatus,
    });
    console.log(response);
    if (response.returning[0].is_images_approved) {
      setApproveButtonDisabled(true);
      toast.success("Siparişiniz başarıyla onaylandı.", {
        position: "bottom-right",
        ariaProps: {
          "aria-live": "polite",
          role: "status",
        },
        id: "login-success",
        duration: 1500,
      });
    } else {
      toast.success("Geri bildirim gönderildi.", {
        position: "bottom-right",
        ariaProps: {
          "aria-live": "polite",
          role: "status",
        },
        id: "login-success",
        duration: 1500,
      });
    }
  };

  return (
    <div>
      <div
        className="relative gap-3 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-opacity hover:opacity-90"
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
          }] backdrop-blur-sm transition-opacity duration-300"`}
          onClick={closeModal}
        >
          <div
            className="relative flex m-4 w-[90%] min-w-[75%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
            role="dialog"
            data-dialog="image-dialog"
            ref={ref}
          >
            <div className="relative border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 p-0 font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased">
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
      <div className="flex flex-col gap-3 mt-4 justify-end">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-24 p-2 border border-gray-300 rounded-md"
          placeholder="Notunuzu buraya yazdıktan sonra onayla yada itiraz et butonlarına basınız."
        ></textarea>
        <div className="flex gap-3">
          <Button
            disabled={!note}
            color="error"
            onClick={() => onSubmit(false)}
          >
            İtiraz Et
          </Button>
          <Button
            disabled={approveButtonDisabled}
            color="success"
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
