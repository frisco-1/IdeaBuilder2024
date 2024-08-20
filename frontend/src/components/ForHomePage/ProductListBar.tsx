import React from 'react'
import {PRODUCTS as Products} from './productListData.tsx';
import { ListGroup } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function ProductListBar() {
  const mapAll = Products.map(product => {
    return (
      <ListGroup.Item action as={Link} to={product.id} key={product.id}>{product.name}</ListGroup.Item>
    )
  })

  return (
    <>
      <h4 className='p-3 d-flex'>All Products</h4>
      <ListGroup variant='flush'>
        {mapAll}
      </ListGroup>
    </>
  )
}
