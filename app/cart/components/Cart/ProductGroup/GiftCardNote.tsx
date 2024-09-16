"use client";

import Accordion from "@/components/Accordion";
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

  return (
    <div className="border border-slate-200 rounded-md">
      <Accordion
        items={[
          {
            title: "Hediye Kartı Üzerine Yazılacak Not",
            content: Array.from({ length: quantity }, (_, i) => {
              return (
                <Fragment key={i}>
                  {quantity > 1 && (
                    <span key={`quantity-${i}`}>{i + 1}. ürün</span>
                  )}
                  <Textarea
                    key={`textarea-${i}`}
                    placeholder="Hediye notunuzu buraya yazabilirsiniz."
                    className="w-full"
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
        ]}
      />
    </div>
  );
};

export default GiftCardNote;
