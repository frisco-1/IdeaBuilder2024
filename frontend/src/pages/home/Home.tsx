
import HeroCarousel from '../../components/ForHomePage/HeroCarousel';

import '../../../styles/homepage.css';
import StorySection from '../../components/ForHomePage/StorySection';
import ProductGridHome from '../../components/ForHomePage/ProductGridHome';
import ContactSection from '../../components/ForHomePage/ContactSection';


export default function Home() {
  return (
    <>
      <div>
        <HeroCarousel/>
        <ProductGridHome/>
        <StorySection/>
        <ContactSection/>
        
      </div>
    </>
  )
}
