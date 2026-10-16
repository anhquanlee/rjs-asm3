import { useEffect } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';

import ProductDescription from '../components/details/ProductDescription';
import ProductGallery from '../components/details/ProductGallery';
import ProductInfo from '../components/details/ProductInfo';
import RelatedProducts from '../components/details/RelatedProducts';

function DetailPage() {
  const { productId } = useParams();

  const products = useRouteLoaderData('root');
  const product = products.find((item) => item._id.$oid === productId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="w-full bg-white py-20 text-center text-[#999]">
        Product not found.
      </div>
    );
  }

  const relatedProducts = products.filter(
    (item) =>
      item._id.$oid !== product._id.$oid &&
      item.category.toLowerCase() === product.category.toLowerCase()
  );

  return (
    <div className="w-full bg-white px-5 pt-16 pb-20 italic">
      <section className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <ProductGallery key={productId} product={product} />
        <ProductInfo key={productId} product={product} />
      </section>

      <ProductDescription description={product.long_desc} />

      <RelatedProducts products={relatedProducts} />
    </div>
  );
}

export default DetailPage;
