
import {Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiTwotonePhone } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { IoMdMail } from 'react-icons/io';
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import '../../styles/footer.css'


function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <Container fluid id='footer'>
        <Row>
          <Col md={12}>
            <h3 id='boldHeading'>Quick Links</h3>
          </Col>

          <Col md={4}>
            <h5>Printing</h5>

             <ul className='list-unstyled'>
              <li><Link id='footerLink'to='/business-cards' >Business Cards</Link></li>
              <li><Link id='footerLink' to='/tickets'>Tickets</Link></li>
              <li><Link id='footerLink' to ='/flyers'>Flyers</Link></li>
              <li><Link id='footerLink' to='invoices'>Invoices</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Signs</h5>

            <ul className='list-unstyled'>
              <li><Link id='footerLink' to='/magnetic-signs'>Magnetic Signs</Link></li>
              <li><Link id='footerLink' to ='/banners'>Banners</Link></li>
              <li><Link id='footerLink' to='/aluminum-signs'>Aluminum Signs</Link></li>
              <li><Link id='footerLink' to='/realtor-signs'>Realtor Signs</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 id='LinkHead'>Promotion Items</h5>

            <ul className='list-unstyled'>
              <li><Link id='footerLink' to='/pens'>Pens</Link></li>
              <li><Link id='footerLink' to='/table-covers'>Table Covers</Link></li>
            </ul>
          </Col>
          {/* line break */}
          <Col md={12}>
            <hr id='line-break'/>
          </Col>
          {/* End of line break */}

          <Col md={3}>
            <h3 id='boldHeading'>Address</h3>

            <p id='white'>3277 Lake Worth Rd. Suite B
            Palm Springs, FL 33461</p>
          </Col>

          <Col md={3}>
            <h3 id='boldHeading'>Contact Us</h3>

            <ul className='list-unstyled fs-5'>
              <li><a href='tel:+5617211473' id='footerLink'><AiTwotonePhone/> (561) 721-1473</a></li>
              <li><a href='mailto:sales@ideaprinting.com' id='footerLink'><IoMdMail/> sales@ideaprinting.com</a></li>
            </ul>
          </Col>

          <Col md={3}>
            <h3 id='boldHeading'>Social Media</h3>

            <ul className='list-unstyled'>
              <a href='https://www.facebook.com/ideabprinting' id='footerLink' className='facebook' target='_blank' rel='noreferrer'>
               <AiFillFacebook className='react-icon'/>
              </a>

              <a href='https://www.instagram.com/ibtshirts/' id='footerLink' className='facebook' target='_blank' rel='noreferrer'>
               <FaInstagram  className='react-icon'/>
              </a>

               <a href='https://www.tiktok.com/@ibtshirts' id='footerLink' className='facebook' target='_blank' rel='noreferrer'>
               <FaTiktok   className='react-icon'/>
              </a>
            </ul>
          </Col>

          {/* line break */}
          <Col md={12}>
            <hr id='line-break'/>
          </Col>
          {/* End of line break */}

        </Row>
        <span id='white'>Idea Builder</span> <span id='black'>All Rights Reserved Copyright &#169; {year}</span> 
      </Container>
    </>
  )
}

export default Footer
