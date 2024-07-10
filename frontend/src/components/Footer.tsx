import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiTwotonePhone } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { IoMdMail } from 'react-icons/io';


function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={12}>
            <h3>Quick Links</h3>
          </Col>

          <Col md={4}>
            <h5>Printing</h5>

             <ul>
              <li><Link to='/business-cards' >Business Cards</Link></li>
              <li><Link to='/brochures'>Brochures</Link></li>
              <li><Link to ='/flyers'>Flyers</Link></li>
              <li><Link to='invoices'>Invoices</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Signs</h5>

            <ul>
              <li><Link to='/magnets'>Magnets</Link></li>
              <li><Link to ='/banners'>Banners</Link></li>
              <li><Link to='/aluminum-signs'>Aluminum Signs</Link></li>
              <li><Link to='/realtor-signs'>Realtor Signs</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 id='LinkHead'>Promotion Items</h5>

            <ul className='list-unstyled'>
              <li><Link to='/pens'>Pens</Link></li>
              <li><Link to='/keychains'>Keychains</Link></li>
              <li><Link to='/drink-wear'>Drink Wear</Link></li>
              <li><Link to='/table-covers'>Table Covers</Link></li>
            </ul>
          </Col>
          {/* line break */}
          <Col md={12}>
            <hr id='line-break'/>
          </Col>
          {/* End of line break */}

          <Col md={3}>
            <h3 id='footHeading'>Address</h3>

            <p id='LinkHead'>3277 Lake Worth Rd. Suite B
            Palm Springs, FL 33461</p>
          </Col>

          <Col md={3}>
            <h3 id='footHeading'>Contact Us</h3>

            <ul className='list-unstyled fs-5'>
              <li><a href='tel:+5617211473' id='white'><AiTwotonePhone/> (561) 721-1473</a></li>
              <li><a href='mailto:sales@ideaprinting.com' id='white'><IoMdMail/> sales@ideaprinting.com</a></li>
            </ul>
          </Col>

          <Col md={3}>
            <h3 id='footHeading'>Website Links</h3>

            <ul className='list-unstyled fs-5'>
              <li className='mb-2'><a href='https://www.ibtshirts.com/' id='white' target='_blank' rel='noreferrer'><img src='img/ib tshirt logo.png' height='40px' alt='ibshirtslogo'/></a></li>
              <li className='mb-2'><a href='https://www.ibsites.com/' id='white' target='_blank' rel='noreferrer'><img src='img/white2-ib sites logo.png' height='40px' alt='ibsiteslogo'/></a></li>
            </ul>
          </Col>

          <Col md={3}>
            <h3 id='footHeading'>Social Media</h3>

            <ul className='list-unstyled'>
              <a href='https://www.facebook.com/ideabprinting' id='white' target='_blank' rel='noreferrer'>
                <AiFillFacebook className='facebook-icon'/>
              </a>
            </ul>
          </Col>

          {/* line break */}
          <Col md={12}>
            <hr id='line-break'/>
          </Col>
          {/* End of line break */}

        </Row>
        <span id='LinkHead'>Idea Builder</span> <span id='grayf'>All Rights Reserved Copyright &#169; {year}</span> 
      </Container>
    </>
  )
}

export default Footer
