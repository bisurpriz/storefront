import ProductDetailImageGallery from '@/components/Product/DetailImageGallery';

const ProductImageCarousel = ({
  images,
}: {
  images: {
    id: number;
    url: string;
  }[];
}) => {
  return <ProductDetailImageGallery images={images} />;
};

export default ProductImageCarousel;
