import MenuBar from "../components/MenuBar";
import HeroFilter from "../components/HeroFilter";
import FeaturesSection from "../components/FeaturesSection";
import SalesSection from "../components/SalesSection";
import RentalSection from "../components/RentalSection";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <MenuBar />
      <HeroFilter 
      onResults={(items) => {
          console.log("Filtered results:", items);
        }}
        />
      <FeaturesSection />
      <SalesSection />
      <RentalSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
export default Home;