import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Category from './Category';

const API_URL =
  'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74';

const PRODUCTS_PER_PAGE = 9;

function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(API_URL);
      const data = await response.json();

      setProducts(data);
    }

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      return (
        category.toLowerCase() === 'all' ||
        product.category.toLowerCase() === category.toLowerCase()
      );
    })
    .filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });

  const sortedProducts = [...filteredProducts];

  if (sort === 'price-asc') {
    sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sort === 'price-desc') {
    sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
  }

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }

  function handleCategoryChange(value) {
    setCategory(value);
    setCurrentPage(1);
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setCurrentPage(1);
  }

  function handleSortChange(event) {
    setSort(event.target.value);
    setCurrentPage(1);
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="grid w-full grid-cols-1 gap-8 bg-white py-10 md:grid-cols-[200px_1fr]">
      <Category category={category} onChangeCategory={handleCategoryChange} />

      <div className="w-full">
        <div className="mb-8 flex items-center justify-between gap-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Enter Search Here!"
            className="w-full max-w-55 border border-[#ddd] px-4 py-3 text-[12px] outline-none focus:border-[#999]"
          />

          <select
            value={sort}
            onChange={handleSortChange}
            className="border border-[#ddd] px-2 py-1 text-[12px] outline-none"
          >
            <option value="default">Default sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
          {currentProducts.map((product) => (
            <button
              key={product._id.$oid}
              type="button"
              className="cursor-pointer text-center italic"
              onClick={() => navigate(`/detail/${product._id.$oid}`)}
            >
              <div className="mb-4 flex h-50 items-center justify-center overflow-hidden">
                <img
                  src={product.img1}
                  alt={product.name}
                  className="h-full w-full object-contain transition-all duration-300 hover:scale-105 hover:opacity-70"
                />
              </div>

              <h3 className="mb-2 text-[13px] text-black">{product.name}</h3>

              <p className="text-[12px] text-[#aaa]">
                {formatPrice(product.price)} VND
              </p>
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-end gap-2">
          {totalPages > 1 && (
            <div className="flex items-center">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
                className="flex h-9 w-9 cursor-pointer items-center justify-center border border-[#ddd] text-[15px] disabled:cursor-not-allowed disabled:opacity-40"
              >
                «
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  type="button"
                  onClick={() => setCurrentPage(index + 1)}
                  className={`flex h-9 w-9 cursor-pointer items-center justify-center border border-[#ddd] text-[13px] ${
                    currentPage === index + 1
                      ? 'bg-[#111] text-white'
                      : 'bg-white text-black hover:bg-[#f5f5f5]'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
                className="flex h-9 w-9 cursor-pointer items-center justify-center border border-[#ddd] text-[15px] disabled:cursor-not-allowed disabled:opacity-40"
              >
                »
              </button>
            </div>
          )}

          <p className="text-[12px] italic text-[#aaa]">
            Showing {sortedProducts.length === 0 ? 0 : startIndex + 1}-
            {Math.min(endIndex, sortedProducts.length)} of{' '}
            {sortedProducts.length} results
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
