import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./SubNavbar.css";

// --------------------------ANAGHA.S.R--------------------------------

const SubNavbar = () => {
  return (
    <>
      <Navbar
        className="sub-navbar"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="sub-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/admin-dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Book" id="book-dropdown">
              <LinkContainer to="/admin-dashboard/add-book">
                <NavDropdown.Item>Add</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin-dashboard/manage-book">
                <NavDropdown.Item>Update </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title="Category" id="category-dropdown">
              <LinkContainer to="/admin-dashboard/add-category">
                <NavDropdown.Item>Add</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin-dashboard/manage-category">
                <NavDropdown.Item>Update</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title="Author" id="author-dropdown">
              <LinkContainer to="/admin-dashboard/add-author">
                <NavDropdown.Item>Add</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin-dashboard/manage-author">
                <NavDropdown.Item>Update</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/admin-dashboard/view-user-feedback">
              <Nav.Link>Feedback</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default SubNavbar;
