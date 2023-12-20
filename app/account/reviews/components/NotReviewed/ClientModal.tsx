"use client";

import Rating from "@/components/Rating/Rating";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Tooltip from "@/components/Tooltip";
import { localeFormat } from "@/utils/format";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { useState } from "react";

const ClientModal = ({
  productId,
  onSubmit,
}: {
  productId: number;
  onSubmit: ({
    product_id,
    score,
    comment,
  }: {
    product_id: number;
    score: number;
    comment: string;
  }) => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const handleSubmit = async () => {
    await onSubmit({
      product_id: productId,
      score: selectedRating,
      comment: comment,
    });
    setOpen(false);
  };

  return (
    <>
      <Button
        label="Değerlendir"
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => {
          setOpen(true);
        }}
      />
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        title="Değerlendir"
      >
        <div className="p-8 pt-4 font-mono">
          <div className="flex items-start gap-4 border-b pb-4">
            <Image
              src={faker.image.imageUrl(200, 200, undefined, true)}
              alt="product"
              width={200}
              height={200}
              className="rounded-md object-cover w-24 h-24 shadow-md"
            />
            <div>
              <h4 className="text-lg font-semibold text-slate-700 m-0">
                {faker.commerce.productName()}
              </h4>
              <p className="text-xs m-0 leading-none text-slate-500 mt-0 whitespace-nowrap mb-2">
                Teslim tarihi: {localeFormat(faker.date.past(), "dd MMMM yyyy")}
              </p>
              <div className="flex flex-col gap-2 items-start mb-2 text-xs text-slate-400">
                <Rating
                  value={selectedRating}
                  showReviewCount={false}
                  className="!max-w-[80px]"
                  readOnly
                />
                <p className="text-sm m-0 leading-none text-slate-500 max-w-lg">
                  Bu ürün toplam{" "}
                  <strong className="text-slate-600">
                    {faker.datatype.number({ min: 1, max: 50000 })}
                  </strong>
                  &nbsp; değerlendirme almıştır.
                </p>
              </div>
            </div>
          </div>
          <div className="py-4 text-center border-b">
            <h4 className="text-xl font-semibold text-slate-700 mb-4">
              Ürünü değerlendirin
            </h4>
            <p
              className={`text-xs m-0 leading-none text-slate-500 max-w-lg mb-4`}
            >
              Ürünü değerlendirerek diğer kullanıcıların ürün hakkında daha
              fazla bilgi sahibi olmasına yardımcı olabilirsiniz.
            </p>
            <Rating
              value={selectedRating}
              showReviewCount={false}
              className="!max-w-[250px] mx-auto"
              onChange={(value) => {
                setSelectedRating(value);
              }}
            />
          </div>
          <form className="py-4 ">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-semibold text-slate-700">
                Değerlendirmenizi yazın
              </h4>
              <Tooltip
                text="Değerlendirmenizde ürünün kalitesi, teslimat hızı, satıcı ile iletişim gibi konuları değerlendirebilirsiniz. Lütfen ürün ile ilgili değerlendirme yapınız."
                position="top"
                whiteSpace="normal"
              >
                <p
                  className={`text-xs m-0 leading-none text-slate-500 max-w-lg`}
                >
                  Yorum kriterleri
                </p>
              </Tooltip>
            </div>
            <textarea
              name="review-comment"
              id="review-comment"
              rows={3}
              className="w-full p-4 border rounded-md shadow-md text-slate-500 outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-2"
              placeholder="Değerlendirmenizi buraya yazabilirsiniz."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <label
              htmlFor="review-terms"
              className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer"
            >
              <input type="checkbox" name="review-terms" id="review-terms" />
              <span>
                <strong className="text-slate-500">Kullanım koşulları</strong>
                &nbsp;ve&nbsp;
                <strong className="text-slate-500">gizlilik politikası</strong>
                &nbsp; koşullarını kabul ediyorum.
              </span>
            </label>
          </form>
          <Button
            label="Değerlendir"
            variant="fullfilled"
            color="primary"
            size="small"
            className="w-full justify-center"
            disabled={selectedRating === 0}
            onClick={handleSubmit}
          />
        </div>
      </Modal>
    </>
  );
};

export default ClientModal;
