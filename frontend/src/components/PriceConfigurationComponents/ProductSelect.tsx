//Product Pages that use this component:
/*
 Business Cards
 Door Hangers
 Envelopes
 Flyers
 Invoices
 Letterheads
 PocketFolders
 Product Display

*/

import React from 'react';
import { Container, Row, Col, Form, Breadcrumb } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

interface ProductDisplayProps {
  displayName: string;
  displayCode: string;
  image: string;
  type: string;
  handleTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  quantity: string;
  handleQuantityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  typeOptions: { value: string; label: string }[];
  quantityOptions: { value: string; label: string }[];
  productCode: string;
  ncrNumbering: boolean;
  bookletStyle: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  price: number;
}

export default function ProductDisplay(props: ProductDisplayProps) {

  const location = useLocation();

  return (
    <>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{props.displayName}</Breadcrumb.Item>
        </Breadcrumb>
        
        <Col md={12}>
          <h2 className='pt-2 pb-2 d-inline'>{props.displayName}</h2> {props.displayCode} <hr/>
        </Col>

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
              <Form.Label>Type:</Form.Label>
              <Form.Select value={props.type} onChange={props.handleTypeChange}>
                <option value="">Select Type</option>
                {props.typeOptions.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Quantity:</Form.Label>
              <Form.Select value={props.quantity} onChange={props.handleQuantityChange}>
                <option value="">Select Quantity</option>
                {props.quantityOptions.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {
              location.pathname === '/invoices' && (
                <>
                  <Form.Group controlId='ncrNumbering'>
                    <Form.Check
                      type='checkbox'
                      label='NCR Numbering $30'
                      checked={props.ncrNumbering}
                      onChange={props.handleCheckboxChange}
                    />
                  </Form.Group>

                  <Form.Group controlId='bookletStyle'>
                    <Form.Check
                      type='checkbox'
                      label='Booklet Style $50'
                      checked={props.bookletStyle}
                      onChange={props.handleCheckboxChange}
                    />
                  </Form.Group>
                </>
              )
            }

          </Form>
          <h3 className='mt-3'>Printing Cost: ${props.price.toFixed(2)}</h3>
        </Col>

        </Row>
        

      </Container>
    </>
  )
}
