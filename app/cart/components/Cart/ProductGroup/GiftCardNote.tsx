"use client";

import Textarea from "@/components/Textarea";
import { useCart } from "@/contexts/CartContext";
import { useCallback, useEffect, useState } from "react";

interface GiftCardNoteProps {
  id: number;
  quantity: number;
}

interface NoteState {
  [key: number]: string;
}

const MAX_CHARACTERS = 500;
const STORAGE_KEY = "cart";

const GiftCardNote = ({ id, quantity }: GiftCardNoteProps) => {
  const { updateCartItemNote } = useCart();
  const [notes, setNotes] = useState<NoteState>({});

  useEffect(() => {
    const initializeNotes = () => {
      try {
        const cartData = localStorage.getItem(STORAGE_KEY);
        if (!cartData) return;

        const parsedCart = JSON.parse(cartData);
        const item = parsedCart?.find((x: any) => x.id === id);

        if (item?.card_note) {
          const extractedNotes =
            item.card_note
              .match(/\[(.*?)\]/g)
              ?.map((note: string) => note.slice(1, -1)) || [];

          const noteState: NoteState = {};
          extractedNotes.forEach((note: string, index: number) => {
            noteState[index] = note;
          });

          setNotes(noteState);
        }
      } catch (error) {
        console.error("Error initializing notes:", error);
      }
    };

    initializeNotes();
  }, [id]);

  const handleNoteChange = useCallback(
    (value: string, index: number) => {
      if (value.length > MAX_CHARACTERS) return;

      setNotes((prev) => ({
        ...prev,
        [index]: value,
      }));

      const updatedNotes = Array.from(
        { length: quantity },
        (_, i) => notes[i] || "",
      );
      updatedNotes[index] = value;

      const formattedNote = updatedNotes.map((note) => `[${note}]`).join("");

      updateCartItemNote(id, formattedNote);
    },
    [id, quantity, notes, updateCartItemNote],
  );

  const renderNoteInput = (index: number) => {
    const currentNote = notes[index] || "";
    const remainingChars = MAX_CHARACTERS - currentNote.length;

    return (
      <div key={index} className="space-y-2">
        {quantity > 1 && (
          <div className="flex flex-col gap-1">
            <span className="block text-sm font-medium text-gray-700">
              {index + 1}. Ürün - Hediye Mesajı
            </span>
            <span className="text-xs text-gray-500">
              Yakında yapay zeka destekli öneriler ile hediye notunuzu
              oluşturabileceksiniz
            </span>
          </div>
        )}

        <div className="relative">
          <Textarea
            fullWidth
            value={currentNote}
            placeholder="Hediye alan kişiye özel mesajınızı buraya yazabilirsiniz. Samimi bir not veya kurumsal bir mesaj tercih edebilirsiniz."
            onChange={(e) => handleNoteChange(e.target.value, index)}
            className="focus:border-primary-500 focus:ring-primary-500 rounded-md border-gray-300"
            data-maxlength={MAX_CHARACTERS}
          />
          <div className="mt-1 flex justify-end">
            <span
              className={`text-xs ${remainingChars < 50 ? "text-red-500" : "text-gray-400"}`}
            >
              {remainingChars} karakter kaldı
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: quantity }, (_, index) => renderNoteInput(index))}
    </div>
  );
};

export default GiftCardNote;
