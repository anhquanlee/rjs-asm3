function YourOrder({ listCart }) {
  const total = listCart.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

  function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }

  return (
    <aside className="bg-[#f8f9fa] px-7 py-9">
      <h2 className="mb-3 text-[20px] font-normal tracking-wide text-black">YOUR ORDER</h2>

      {listCart.length === 0 ? (
        <p className="text-[13px] text-[#999]">Your shopping cart is empty.</p>
      ) : (
        <div>
          {listCart.map(({ product, quantity }) => (
            <div
              key={product._id.$oid}
              className="flex items-start justify-between gap-3 border-b border-[#ddd] py-3"
            >
              <span className="min-w-0 flex-1 text-[12px] leading-5 font-medium text-black">
                {product.name}
              </span>

              <span className="shrink-0 text-right text-[11px] leading-5 text-[#aaa]">
                {formatPrice(product.price)} VND x {quantity}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between gap-3 pt-4">
            <span className="text-[13px] text-black">TOTAL</span>
            <span className="text-right text-[15px] text-[#666]">{formatPrice(total)} VND</span>
          </div>
        </div>
      )}
    </aside>
  );
}

export default YourOrder;
