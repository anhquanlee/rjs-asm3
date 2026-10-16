function Category({ category, onChangeCategory }) {
  const categoryGroups = [
    {
      title: 'IPHONE & MAC',
      items: ['iPhone', 'iPod', 'Macbook'],
    },
    {
      title: 'WIRELESS',
      items: ['Airpod', 'Watch'],
    },
    {
      title: 'OTHER',
      items: ['Mouse', 'Keyboard', 'Other'],
    },
  ];

  return (
    <aside className="w-full italic">
      <h2 className="mb-4 text-[18px] font-semibold text-black">CATEGORIES</h2>

      <div className="bg-[#111] px-5 py-3 text-[14px] text-white">APPLE</div>

      <button
        type="button"
        className={`w-full cursor-pointer px-5 py-3 text-left text-[13px] ${
          category.toLowerCase() === 'all'
            ? 'text-[#e6ad50]'
            : 'text-[#999] hover:text-[#e6ad50]'
        }`}
        onClick={() => onChangeCategory('all')}
      >
        All
      </button>

      {categoryGroups.map((group) => (
        <div key={group.title}>
          <div className="bg-[#f5f7f6] px-5 py-3 text-[13px] text-black">
            {group.title}
          </div>

          {group.items.map((item) => (
            <button
              key={item}
              type="button"
              className={`block w-full cursor-pointer px-5 py-3 text-left text-[13px] ${
                category.toLowerCase() === item.toLowerCase()
                  ? 'text-[#e6ad50]'
                  : 'text-[#999] hover:text-[#e6ad50]'
              }`}
              onClick={() => onChangeCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      ))}
    </aside>
  );
}

export default Category;
