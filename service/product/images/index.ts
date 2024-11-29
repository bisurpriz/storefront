export const GetProductImagesDocument = `
    query getProductImages($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    image_url
  }
}
    `;
