//Pricing Configuration Component for the Invitations Product Page. Invitations.tsx
//This component is needed for handling a checkbox functionality for the Envelope option.
import React from 'react';
import { Container, Row, Col, Form, Breadcrumb } from 'react-bootstrap';

interface InvitationNumselectProps {
  displayName: string;
  displayCode: string;
  image: string;
  type: string;
  handleTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  quantity: number;
  handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnvelopeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  typeOptions: { value: string; label: string }[];
  quantityOptions: { value: string; label: string }[];
  productCode: string;
  price: number;
  envelopeSelected: boolean;
}

export default function InvitationNumselect(props: InvitationNumselectProps) {
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
                <Form.Control
                  type="number"
                  value={props.quantity}
                  onChange={props.handleQuantityChange}
                  min={25} // Set the minimum value
                  step={25} // Restrict increments to 25
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Envelope"
                  onChange={props.handleEnvelopeChange}
                  checked={props.envelopeSelected}
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
