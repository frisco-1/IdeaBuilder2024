import React from 'react'
import HomePageCarousel from '../components/HomePage/HomePageCarousel';
import ProductListBar from '../components/HomePage/ProductListBar';
import {Row, Col} from 'react-bootstrap'; 
import TopSellers from '../components/HomePage/TopSellers';

export default function Home() {
  return (
    <>
      <HomePageCarousel/>

      <Row>
        <Col md={3}>
          <ProductListBar/>
        </Col>

        <Col>
          <TopSellers/>
        </Col>
      </Row>
      
    </>
  )
}
