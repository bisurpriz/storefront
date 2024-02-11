import Rating from '@/components/Rating/Rating';
import { localeFormat } from '@/utils/format';
import Image from 'next/image';
import ClientModal from './ClientModal';
import { getImageUrlFromPath } from '@/utils/getImageUrl';
import { createReview } from '../../actions';

interface Props {
  imageUrl: string;
  productName: string;
  deliveryDate: string;
  rating: number;
  reviewCount: number;
  productId: number;
}

const NotReviewedCard = ({
  imageUrl,
  productName,
  deliveryDate,
  rating,
  reviewCount,
  productId,
}: Props) => {
  const handleCreateReview = async ({
    product_id,
    score,
    comment,
  }: {
    product_id: number;
    score: number;
    comment: string;
  }) => {
    await createReview({
      product_id,
      score,
      comment,
    });
  };

  return (
    <div className="flex items-center gap-4 border p-4 shadow-md rounded-md max-sm:flex-col max-sm:items-center max-sm:w-full">
      <Image
        src={getImageUrlFromPath(imageUrl)}
        alt="product"
        width={200}
        height={200}
        className="rounded-md object-cover w-32 h-32 shadow-md"
      />
      <div className="flex flex-col items-start justify-end font-mono">
        <h4 className="text-lg font-semibold text-slate-700 max-w-xs m-0">
          {productName}
        </h4>
        <p className="text-xs m-0 leading-none text-slate-500 max-w-lg mt-0 whitespace-nowrap mb-2">
          Teslim tarihi: {localeFormat(new Date(deliveryDate), 'PPP')}
        </p>
        <div className="flex gap-2 items-end mb-2 text-xs text-slate-400">
          {/* 
            Halihazırda bu ürünün kendi değerlendirmesi görüntülenecek
          */}
          <Rating value={rating ?? 3} readOnly showReviewCount={false} />
          {reviewCount}
        </div>

        <ClientModal
          productId={productId}
          onSubmit={handleCreateReview}
          deliveryDate={deliveryDate}
          image={getImageUrlFromPath(imageUrl)}
          productName={productName}
          reviewCount={reviewCount}
        />
      </div>
    </div>
  );
};

export default NotReviewedCard;
