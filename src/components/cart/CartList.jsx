import CartItem from './CartItem';

function CartList({ listCart }) {
  if (listCart.length === 0) {
    return (
      <p className="py-12 text-center text-[14px] text-[#999]">Your shopping cart is empty.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-145 border-collapse text-center">
        <thead className="bg-[#f8f9fa]">
          <tr className="text-[12px] tracking-wide text-black">
            <th className="px-2 py-5 font-normal">IMAGE</th>
            <th className="px-2 py-5 font-normal">PRODUCT</th>
            <th className="px-2 py-5 font-normal">PRICE</th>
            <th className="px-2 py-5 font-normal">QUANTITY</th>
            <th className="px-2 py-5 font-normal">TOTAL</th>
            <th className="px-2 py-5 font-normal">REMOVE</th>
          </tr>
        </thead>

        <tbody>
          {listCart.map(({ product, quantity }) => (
            <CartItem key={product._id.$oid} product={product} quantity={quantity} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartList;
