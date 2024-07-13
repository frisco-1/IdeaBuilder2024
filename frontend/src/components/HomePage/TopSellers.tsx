import React from 'react'
import {Col} from 'react-bootstrap';
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
    <Col md={4} key={product.id}>
      <Link to={product.url}>
        <img src={product.pic} alt={product.name} width={'100%'}/>
        <h5 className='d-flex text-center align-content-center justify-content-center'key={product.id}>{product.name}</h5>
      </Link>
    </Col>
  )) 

  return (
    <>
      <h3>Top Sellers</h3>
      {ListSellers}
    </>
  )
}
