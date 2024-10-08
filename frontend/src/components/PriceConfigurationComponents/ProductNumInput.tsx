//Product Pages that use this component:
/*
  Banners


*/

import React from 'react'
import {Container, Row, Col, Form, Breadcrumb} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import '../../../styles/reactBootstrap.css';

type ProductNumInputProps = {
  displayName: string;
  displayCode: string;
  image: string;
  type: string;
  productCode: string;
  length: number;
  width: number;
  area: number;
  handleLengthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
  price: number;
};

export default function ProductNumInput(props: ProductNumInputProps) {

  const location = useLocation();

  return (
    <>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{props.displayName}</Breadcrumb.Item>
        </Breadcrumb>
  

        <Row>

          <Col md={6} className='p-3'>
            <img src={props.image} alt={props.type} width={'100%'}/>
          </Col>
          <Col md={6} className='p-3 position-relative'>
          <h3>Configure & Price</h3>
          <hr />
          <h4>Product Code: {props.productCode}</h4>
          <Form>
            <Form.Group>
              <Form.Label>Size:</Form.Label>
              <div className='d-flex'>
                <Form.Control 
                  className='numSizing' 
                  type='number'
                  min='0'
                  value={props.length}
                  onChange={props.handleLengthChange}
                />
                <h5 className='p-1'>x</h5>
                <Form.Control 
                  className='numSizing' 
                  type='number'
                  min='0'
                  value={props.width}
                  onChange={props.handleWidthChange}
                />
                <h5 className='numSizing'>{props.area} sqf</h5>
              </div>
              {
                location.pathname === '/banners' && (
                  <>
                   <h5>(Minimum: 10 sqf)</h5>
                  </>
                )
              }
            </Form.Group>

            <Form.Group>
              <Form.Label>Quantity:</Form.Label>
              <Form.Control 
                  className='numSizing' 
                  type='number'
                  min='0'
                  value={props.quantity}
                  onChange={props.handleQuantityChange}
                />
            </Form.Group>

          

          </Form>
          <h3 className='mt-3'>Printing Cost: ${props.price.toFixed(2)}</h3> (Not Including Taxes)
        </Col>

        </Row>
        

      </Container>
    </>
  )
}
