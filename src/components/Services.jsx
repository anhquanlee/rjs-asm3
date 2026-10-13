function Services() {
  const services = [
    {
      title: 'FREE SHIPPING',
      description: 'Free shipping worldwide',
    },
    {
      title: '24 X 7 SERVICE',
      description: 'Free shipping worldwide',
    },
    {
      title: 'FESTIVAL OFFER',
      description: 'Free shipping worldwide',
    },
  ];

  return (
    <section className="w-full bg-white py-12 italic">
      <div className="grid grid-cols-3 bg-[#f7f7f7] px-10 py-14">
        {services.map((service) => (
          <div key={service.title} className="text-center">
            <h3 className="mb-2 text-[18px] font-normal tracking-[1px] text-black">
              {service.title}
            </h3>

            <p className="text-[13px] text-[#b3b3b3]">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-between gap-10">
        <div>
          <h3 className="mb-1 text-[20px] font-normal tracking-[1px] text-black">
            LET'S BE FRIENDS!
          </h3>

          <p className="text-[13px] text-[#b3b3b3]">
            Nisi nisi tempor consequat laboris nisi.
          </p>
        </div>

        <div className="flex w-full max-w-[520px]">
          <input
            type="email"
            placeholder="Enter your email address"
            className="h-[56px] flex-1 border border-[#d9d9d9] px-5 text-[14px] text-black outline-none placeholder:text-[#b3b3b3]"
          />

          <button
            type="button"
            className="h-[56px] cursor-pointer bg-[#333] px-8 text-[14px] text-white"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}

export default Services;
