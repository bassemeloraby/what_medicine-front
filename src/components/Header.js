import { useState } from "react";
import { useGlobalContext } from "../context";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "./Login";
function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const { setAdmin, admin, setAdminOpen, adminOpen, asAdmin, asUser } =
    useGlobalContext();
  return (
    <>
      <Navbar collapseOnSelect expand="expand" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={toggleShow}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Medderma
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link>
                  Medicine
                  <NavDropdown>
                    <NavDropdown.Item
                      as={Link}
                      to="/medicine"
                      onClick={handleClose}
                    >
                      Search by Trade Name
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/AllScientificName"
                      onClick={handleClose}
                    >
                      Search by Sientific Name
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav.Link>
                <Nav.Link as={Link} to="/products" onClick={handleClose}>
                  Derma
                  <NavDropdown>
                    <NavDropdown.Item href="#action3">
                      Products
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                      Companies
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Product Card
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action5">
                      Company Card
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/insurance">Insurance</Link>

                  <NavDropdown>
                    <NavDropdown.Item href="#action3">Videos</NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                      Insurance Companies
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                      Insurance Company Card
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav.Link>
                {/* milk & nutritions */}
                <Nav.Link>
                  <Link to="/insurance">Milk & Nutritions</Link>

                  <NavDropdown>
                    <NavDropdown.Item href="#action3">Videos</NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                      Insurance Companies
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                      Insurance Company Card
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav.Link>
                {/* dipers */}
                <Nav.Link>
                  <Link to="/insurance">Dipers</Link>

                  <NavDropdown>
                    <NavDropdown.Item href="#action3">Videos</NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                      Insurance Companies
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                      Insurance Company Card
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav.Link>
                {/* machines */}
                <Nav.Link>
                  <Link to="/insurance">Machines</Link>

                  <NavDropdown>
                    <NavDropdown.Item href="#action3">Videos</NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                      Insurance Companies
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                      Insurance Company Card
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav.Link>
                {/* cosmotic tools */}
                <Nav.Link>
                  <Link to="/insurance">Cosmotic Tools</Link>

                  <NavDropdown>
                    <NavDropdown.Item href="#action3">Videos</NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                      Insurance Companies
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                      Insurance Company Card
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          {/* website name */}
          <Navbar.Brand>
            <Link to="/">Medderma</Link>
          </Navbar.Brand>
          {!adminOpen ? (
            <Button variant="primary" onClick={asAdmin}>
              login
            </Button>
          ) : (
            <Button variant="danger" onClick={asUser}>
              logout
            </Button>
          )}
          {admin ? (
            <Login setAdminOpen={setAdminOpen} setAdmin={setAdmin} />
          ) : (
            ""
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
