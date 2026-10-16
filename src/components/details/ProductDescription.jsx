function ProductDescription({ description }) {
  return (
    <section className="mt-24">
      <span className="inline-block bg-[#333] px-6 py-3 text-[12px] text-white">
        DESCRIPTION
      </span>

      <h2 className="my-6 text-[19px] font-normal text-black">
        PRODUCT DESCRIPTION
      </h2>

      <p className="whitespace-pre-line text-[13px] leading-7 text-[#aaa]">
        {description}
      </p>
    </section>
  );
}

export default ProductDescription;
