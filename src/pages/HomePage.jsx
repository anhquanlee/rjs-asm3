import Banner from '../components/Banner';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Services from '../components/Services';

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
