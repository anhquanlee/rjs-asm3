import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';

function DetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const products = useRouteLoaderData('root');
  const product = products.find((item) => item._id.$oid === productId);

  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedImage('');
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [productId]);

  const images = product
    ? [product.img1, product.img2, product.img3, product.img4].filter(Boolean)
    : [];

  const relatedProducts = product
    ? products.filter(
        (item) =>
          item._id.$oid !== product._id.$oid &&
          item.category.toLowerCase() === product.category.toLowerCase()
      )
    : [];

  function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }

  if (!product) {
    return (
      <div className="w-full bg-white py-20 text-center text-[#999]">
        Product not found.
      </div>
    );
  }

  return (
    <div className="w-full bg-white px-5 pt-16 pb-20 italic">
      <section className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        {/* Product images */}
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex w-18 shrink-0 flex-col gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(image)}
                className="flex h-26.25 cursor-pointer items-center justify-center overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center">
            <img
              src={selectedImage || product.img1}
              alt={product.name}
              className="max-h-135 w-full object-contain"
            />
          </div>
        </div>

        {/* Product information */}
        <div className="pt-6">
          <h1 className="mb-8 text-[32px] leading-[1.2] font-normal text-black md:text-[38px]">
            {product.name}
          </h1>

          <p className="mb-9 text-[20px] font-light text-[#a3a3a3]">
            {formatPrice(product.price)} VND
          </p>

          <p className="mb-9 whitespace-pre-line text-[14px] leading-[2.1] text-[#aaa]">
            {product.short_desc}
          </p>

          <p className="mb-6 text-[14px]">
            <span className="font-medium text-black">CATEGORY: </span>
            <span className="ml-1 text-[#a3a3a3]">{product.category}</span>
          </p>

          {/* Quantity and cart button */}
          <div className="flex items-center">
            <div className="flex h-11.5 items-center border border-[#ddd]">
              <span className="pr-10 pl-4 text-[13px] tracking-wide text-[#b5b5b5]">
                QUANTITY
              </span>

              <button
                type="button"
                disabled={quantity === 1}
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="cursor-pointer px-2 text-[12px] text-black disabled:opacity-30"
              >
                <FontAwesomeIcon icon={faCaretLeft} />
              </button>

              <span className="min-w-6 text-center text-[16px] not-italic text-[#555]">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="cursor-pointer px-2 text-[12px] text-black"
              >
                <FontAwesomeIcon icon={faCaretRight} />
              </button>
            </div>

            <button
              type="button"
              disabled
              className="h-11.5 bg-[#333] px-7 text-[14px] text-white disabled:cursor-not-allowed"
            >
              Add to cart
            </button>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="mt-24">
        <span className="inline-block bg-[#333] px-6 py-3 text-[12px] text-white">
          DESCRIPTION
        </span>

        <h2 className="my-6 text-[19px] font-normal text-black">
          PRODUCT DESCRIPTION
        </h2>

        <p className="whitespace-pre-line text-[13px] leading-7 text-[#aaa]">
          {product.long_desc}
        </p>
      </section>

      {/* Related products */}
      <section className="mt-20">
        <h2 className="mb-7 text-[19px] font-normal text-black">
          RELATED PRODUCTS
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {relatedProducts.map((item) => (
            <button
              key={item._id.$oid}
              type="button"
              onClick={() => navigate(`/detail/${item._id.$oid}`)}
              className="cursor-pointer text-center"
            >
              <div className="mb-4 flex h-50 items-center justify-center overflow-hidden">
                <img
                  src={item.img1}
                  alt={item.name}
                  className="h-full w-full object-contain transition-all duration-300 hover:scale-105 hover:opacity-70"
                />
              </div>

              <h3 className="mb-2 text-[13px] text-black">{item.name}</h3>

              <p className="text-[12px] text-[#aaa]">
                {formatPrice(item.price)} VND
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DetailPage;
