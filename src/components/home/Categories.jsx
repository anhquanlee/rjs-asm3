import { useNavigate } from 'react-router-dom';

import iphoneImage from '../../assets/product_1.png';
import macImage from '../../assets/product_2.png';
import ipadImage from '../../assets/product_3.png';
import watchImage from '../../assets/product_4.png';
import airpodsImage from '../../assets/product_5.png';

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'iPhone',
      image: iphoneImage,
      className: 'col-span-3',
    },
    {
      name: 'Mac',
      image: macImage,
      className: 'col-span-3',
    },
    {
      name: 'iPad',
      image: ipadImage,
      className: 'col-span-2',
    },
    {
      name: 'Watch',
      image: watchImage,
      className: 'col-span-2',
    },
    {
      name: 'AirPods',
      image: airpodsImage,
      className: 'col-span-2',
    },
  ];

  return (
    <section className="w-full bg-white py-12">
      <div className="mb-7 text-center italic">
        <p className="mb-1 text-[11px] tracking-[2px] text-[#b5b5b5]">
          CAREFULLY CREATED COLLECTIONS
        </p>

        <h2 className="text-[18px] font-semibold tracking-[2px] text-black">
          BROWSE OUR CATEGORIES
        </h2>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            className={`${category.className} group cursor-pointer overflow-hidden bg-[#f5f5f5]`}
            onClick={() => navigate('/shop')}
          >
            <div className="flex h-55 items-center justify-center overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
