import React from 'react'
import {Card, Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function TopSellers() {
  const TopSellers = [
    {
    id: 0,
    pic: './img/TopSellersImg/BusinessCards.png',
    name: 'Business Cards',
    url: '/business-cards'
  },
  {
    id: 1,
    pic: './img/TopSellersImg/invoices.jpg',
    name: 'Invoices',
    url: '/invoices'
  },
  {
    id: 2,
    pic: './img/TopSellersImg/realtorsign.png',
    name: 'Realtor Signs',
    url: '/realtor-signs'
  },
  {
    id: 3,
    pic: './img/TopSellersImg/CarsVinyl.png',
    name: 'Car Magnets',
    url: '/car-magnets'
  },
  {
    id: 4,
    pic: './img/TopSellersImg/Labels.png',
    name: 'Labels',
    url: '/labels'
  },
  {
    id: 5,
    pic: './img/TopSellersImg/Envelopes.png',
    name: 'Envelopes',
    url: '/envelopes'
  },
  {
    id: 6,
    pic: './img/TopSellersImg/Flyers.png',
    name: 'Flyers',
    url: '/flyers'
  },
  {
    id: 7,
    pic: './img/TopSellersImg/FullWrapTrailer.png',
    name: 'Wrap (Trailers)',
    url: '/trailers-wrap'
  },
  {
    id: 8,
    pic: './img/TopSellersImg/realtorsign.png',
    name: 'Wrap (Cars&Vans)',
    url: '/cars-vans-wrap'
  }
  ]

  const ListSellers = TopSellers.map((product =>
    <Col xxl={2} xl={3} lg={4} md={6} sm={6} xs={6} key={product.id} >
        <Card as={Link} to={product.url} className='top-seller animation'>
          <img src={product.pic} alt={product.name} width={'100%'}/>
          <h5 className='d-flex text-center align-content-center justify-content-center'key={product.id}>{product.name}</h5>
        </Card>
    </Col>
  )) 

  return (
    <>
      <h3 className='p-3 d-flex'>Top Sellers</h3>
      
      
      <Row>
        {ListSellers}
      </Row>
      
      
    </>
  )
}
