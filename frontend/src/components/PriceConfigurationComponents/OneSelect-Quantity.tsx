//Product Pages that use this component:
/*
 A Frame
 Arrow Signs
 Table Covers
 Coroplast Signs
 Custom Flags
 Printed Vinyl Laminated
 Realtor Signs
 Roll Up Banners
 Single Arm Sign Posts
 Vinyl Stickers

*/


import React from 'react';
import { Container, Row, Col, Form, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface OneSelectProps {
  displayName: string;
  displayCode: string;
  image: string;
  name: string;
  size: string;
  handleSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  quantity: number;
  handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  productCode: string;
  price: number;
  sizeOptions: { value: string; label: string }[];
}

export default function OneSelect(props: OneSelectProps) {
  return (
    <>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{props.displayName}</Breadcrumb.Item>
        </Breadcrumb>
        
        <Col md={12}>
          <h2 className='pt-2 pb-2 d-inline'>{props.displayName}</h2> {props.displayCode} <hr />
        </Col>

        <Row>
          <Col md={6} className='p-3'>
            <img src={props.image} alt={props.displayName} width={'100%'} />
          </Col>

          <Col md={6} className='p-3 position-relative'>
            <h3>Configure & Price</h3>
            <hr />
            <h4>Product Code: {props.productCode}</h4>
            <Form>
              <Form.Group>
                <Form.Select value={props.size} onChange={props.handleSizeChange}>
                  <option value="">Select Option</option>
                  {props.sizeOptions.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type='number'
                  min='1'
                  value={props.quantity}
                  onChange={props.handleQuantityChange}
                />
              </Form.Group>
            </Form>
            <h3 className='mt-3'>Total Cost: ${props.price.toFixed(2)}</h3>
          </Col>
        </Row>
      </Container>
    </>
  );
}
