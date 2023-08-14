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
import { mainPages } from "../data";
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
                {mainPages.map((mainPage) => (
                  <Nav.Link
                    key={mainPage.id}
                    style={{ backgroundColor: `${mainPage.backgroundColor}` }}
                  >
                    <h5 className="ms-2">{mainPage.text}</h5>

                    <NavDropdown>
                      {mainPage.ping.map((m, index) => (
                        <NavDropdown.Item
                          as={Link}
                          to={m.link}
                          onClick={handleClose}
                          key={index}
                        >
                          {m.name}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  </Nav.Link>
                ))}
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
