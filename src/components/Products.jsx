import { useEffect, useState } from 'react';

const API_URL =
  'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(API_URL);
      const data = await response.json();

      setProducts(data.slice(0, 8));
    }

    fetchProducts();
  }, []);

  function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }

  return (
    <section className="w-full bg-white py-12">
      <div className="mb-7 text-left italic">
        <p className="mb-1 text-[11px] tracking-[2px] text-[#b5b5b5]">
          MADE THE HARD WAY
        </p>

        <h2 className="text-[18px] font-semibold tracking-[2px] text-black">
          TOP TRENDING PRODUCTS
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <div key={product._id} className="text-center italic">
            <div className="mb-4 flex h-[230px] items-center justify-center overflow-hidden">
              <img
                src={product.img1}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>

            <h3 className="mb-1 text-[13px] font-normal text-black">
              {product.name}
            </h3>

            <p className="text-[11px] text-[#a3a3a3]">
              {formatPrice(product.price)} VND
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
