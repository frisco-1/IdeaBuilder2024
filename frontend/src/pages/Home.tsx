import React from 'react'
import HomePageCarousel from '../components/HomePage/HomePageCarousel';
import ProductListBar from '../components/HomePage/ProductListBar';
import {Row, Col} from 'react-bootstrap'; 
import TopSellers from '../components/HomePage/TopSellers';
import '../../styles/homepage.css';

export default function Home() {
  return (
    <>
      <div>
        <HomePageCarousel/>

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
