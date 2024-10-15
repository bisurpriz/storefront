"use client";

import Textarea from "@/components/Textarea";
import { useCart } from "@/contexts/CartContext";
import { Fragment } from "react";

const GiftCardNote = ({ id, quantity }: { id: number; quantity: number }) => {
  const { updateCartItemNote } = useCart();

  const onChange = (e: any, index: number) => {
    const allInputs = document.querySelectorAll(
      `textarea[data-id="giftCardNote-${id}"]`
    ) as NodeListOf<HTMLInputElement>;
    const existNoteArr = Array.from(allInputs).map((x) => x.value);
    const newNote = existNoteArr.map((x) => `[${x}]`).join("");

    updateCartItemNote(id, newNote);
  };

  const data = [
    {
      content: Array.from({ length: quantity }, (_, i) => {
        return (
          <Fragment key={i}>
            {quantity > 1 && (
              <span
                className="text-xs font-semibold text-gray-600"
                key={`quantity-${i}`}
              >
                {i + 1}. ürün
              </span>
            )}
            <Textarea
              key={`textarea-${i}`}
              fullWidth
              placeholder="Hediye notunuzu buraya yazabilirsiniz."
              data-id={`giftCardNote-${id}`}
              onChange={(e, quantity) => onChange(e, i)}
              defaultValue={
                typeof window !== "undefined" && window.localStorage
                  ? JSON.parse(localStorage.getItem("cart"))
                      ?.find((x) => x.id === id)
                      ?.card_note?.match(/\[(.*?)\]/g)
                      ?.map((item) => item.slice(1, -1))?.[i] ?? ""
                  : ""
              }
            />
          </Fragment>
        );
      }),
    },
  ];

  return <>{data.map((item) => item.content)}</>;
};

export default GiftCardNote;
