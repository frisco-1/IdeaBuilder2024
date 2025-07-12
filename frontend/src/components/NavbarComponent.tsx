
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";


export default function NavbarComp() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <>
      <Navbar className="bg-black navbar-dark navbar-light" expand={'md'} variant='light' sticky='top' >
        <Container fluid>

          <Navbar.Brand href="/">
          <img src="./img/ib logo.PNG" alt="Idea Builder Logo" width={'100px'} height={'auto'}/>
          </Navbar.Brand>

          <h1 id='white'>Idea Builder</h1>

          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-`} />

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-`}
            aria-labelledby={`offcanvasNavbarLabel-expand-`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-`}>
                Idea Builder
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 p-2">
                <Nav.Link as={Link} to='/'>Home</Nav.Link>

                <Nav.Link href="#action2">Products</Nav.Link>
              
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to='/contact'><FaPhoneAlt /> Contact Us</Nav.Link>
              </Nav>

              <Form className="d-flex p-2" onSubmit={handleSearchSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              

              <Nav.Link as={Link} to='/sign-in' className='m-2 text-white bg-black text-center border rounded p-2'>Sign In <VscAccount /></Nav.Link>


            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}
