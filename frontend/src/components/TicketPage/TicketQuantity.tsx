import React from 'react';
import { Container, Row, Col, Form, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function TicketQuantity(props) {
  return (
    <>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item as={Link} to='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{props.displayName}</Breadcrumb.Item>
        </Breadcrumb>
        
        <Col md={12}>
          <h2 className='pt-2 pb-2 d-inline'>{props.displayName}</h2> {props.displayCode} <hr/>
        </Col>

        <Row>
          <Col md={6} className='p-3'>
            <img src="" alt={props.displayName} width={'100%'}/>
          </Col>

          <Col md={6} className='p-3 position-relative'>
            <h3>Configure & Price</h3>
            <hr />
            <Form>
              <Form.Group>
                <Form.Label>Quantity:</Form.Label>
                <Form.Select value={props.quantity} onChange={props.handleQuantityChange}>
                  <option value="">Select Quantity</option>
                  {props.quantityOptions.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId='designFee'>
                <Form.Check
                  type='checkbox'
                  label='Design $45'
                  checked={props.designFee}
                  onChange={props.handleCheckboxChange}
                  className='mt-2'
                />
              </Form.Group>
            </Form>
            <h3 className='mt-3'>Printing Cost: ${props.price}</h3>
          </Col>
        </Row>
      </Container>
    </>
  );
}
