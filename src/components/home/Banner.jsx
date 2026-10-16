import { useNavigate } from 'react-router-dom';
import bannerImage from '../../assets/banner1.jpg';

function Banner() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden bg-[#f5f5f7]">
      <img
        src={bannerImage}
        alt="New season collection"
        className="h-full w-full object-cover"
      />

      <div className="absolute left-[7%] top-1/2 -translate-y-1/2 italic">
        <p className="mb-4 text-[14px] tracking-[2px] text-[#9ca3af]">
          NEW INSPIRATION 2020
        </p>

        <h2 className="mb-6 max-w-90 text-[42px] font-normal leading-[1.15] tracking-[4px] text-black">
          20% OFF ON NEW SEASON
        </h2>

        <button
          type="button"
          className="cursor-pointer bg-[#333] px-8 py-3 text-[16px] text-white"
          onClick={() => navigate('/shop')}
        >
          Browse collections
        </button>
      </div>
    </section>
  );
}

export default Banner;
