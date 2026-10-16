import Banner from '../components/home/Banner';
import Categories from '../components/home/Categories';
import Products from '../components/home/Products';
import Services from '../components/home/Services';

function HomePage() {
  return (
    <div className="w-full">
      <Banner />
      <Categories />
      <Products />
      <Services />
    </div>
  );
}

export default HomePage;
