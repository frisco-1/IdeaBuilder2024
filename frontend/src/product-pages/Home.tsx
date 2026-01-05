
import HeroCarousel from '../components/ForHomePage/HeroCarousel';
import ProductListBar from '../components/ForHomePage/ProductListBar';
import {Row, Col} from 'react-bootstrap'; 
import TopSellers from '../components/ForHomePage/TopSellers';
import '../../styles/homepage.css';

export default function Home() {
  return (
    <>
      <div>
        <HeroCarousel/>

        <Row className='p-5' id='margin-right-remove'>
          <Col md={3}>
            <ProductListBar/>
          </Col>

          <Col>
            <TopSellers/>
          </Col>
        </Row>
      </div>
    </>
  )
}
