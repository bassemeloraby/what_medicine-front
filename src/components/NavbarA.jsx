import { useGlobalContext } from "../context";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "./Login";
function OffcanvasExample() {
  const { setAdmin, admin, setAdminOpen, adminOpen, asAdmin, asUser } =
    useGlobalContext();
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Medderma
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link>
                    <Link to="/medicine">Medicine</Link>{" "}
                    <NavDropdown>
                      <NavDropdown.Item href="#action3">
                        Search by Trade Name
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action3">
                        Search by Sientific Name
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/products">Derma</Link>
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
                      <NavDropdown.Item href="#action3">
                        Videos
                      </NavDropdown.Item>
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
                      <NavDropdown.Item href="#action3">
                        Videos
                      </NavDropdown.Item>
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
                      <NavDropdown.Item href="#action3">
                        Videos
                      </NavDropdown.Item>
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
                      <NavDropdown.Item href="#action3">
                        Videos
                      </NavDropdown.Item>
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
                      <NavDropdown.Item href="#action3">
                        Videos
                      </NavDropdown.Item>
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
      ))}
    </>
  );
}

export default OffcanvasExample;
