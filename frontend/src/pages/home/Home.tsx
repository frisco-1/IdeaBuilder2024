
import HeroCarousel from '../../components/ForHomePage/HeroCarousel';

import '../../../styles/homepage.css';
import StorySection from '../../components/ForHomePage/StorySection';
import ProductGridHome from '../../components/ForHomePage/ProductGridHome';
// import ContactSection from '../../components/ForHomePage/ContactSection';


export default function Home() {
  return (
    <>
      <div>
        <HeroCarousel/>
        <ProductGridHome/>
        <StorySection/>
        {/* //Save this for the next iteration, we need to add the contact form and the map to the contact section first. */}
        {/* <ContactSection/> */}

        
      </div>
    </>
  )
}
