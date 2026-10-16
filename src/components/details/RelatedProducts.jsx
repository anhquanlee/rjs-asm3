import { useNavigate } from 'react-router-dom';

function RelatedProducts({ products }) {
  const navigate = useNavigate();

  function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }

  return (
    <section className="mt-20">
      <h2 className="mb-7 text-[19px] font-normal text-black">
        RELATED PRODUCTS
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {products.map((item) => (
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
  );
}

export default RelatedProducts;
