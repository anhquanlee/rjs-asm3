import ProductList from '../components/ProductList';

function ShopPage() {
  return (
    <div className="w-full bg-white italic">
      <section className="flex h-45 items-center justify-between bg-[#f5f7f6] px-10">
        <h1 className="text-[28px] font-normal tracking-[2px] text-black">
          SHOP
        </h1>

        <p className="text-[12px] text-[#aaa]">SHOP</p>
      </section>

      <ProductList />
    </div>
  );
}

export default ShopPage;
