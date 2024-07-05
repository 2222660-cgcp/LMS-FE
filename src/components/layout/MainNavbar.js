import { Navbar, Nav } from "react-bootstrap";
import "./MainNavbar.css";

// --------------------------ANAGHA.S.R--------------------------------

const MainNavbar = () => {
  return (
    <>
      <Navbar expand="lg" collapseOnSelect className="main-navbar">
        <Navbar.Brand
          className="heading-margin"
          href="#"
          style={{ color: "white" }}
        >
          Library Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="margin">
            <Nav.Link className="main-navbar-text" href="#">
              Email: {localStorage.getItem("email")}
            </Nav.Link>
            <Nav.Link href="/logout" className="main-navbar-text logout-margin">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MainNavbar;
