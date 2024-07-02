import "./UserNavbar.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const UserNavbar = () => {
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
            <LinkContainer to="/user-dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <NavDropdown title="My Profile" id="book-dropdown">
              <LinkContainer to="/user-dashboard/view-user">
                <NavDropdown.Item>View Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/user-dashboard/update-user">
                <NavDropdown.Item>Update Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/user-dashboard/change-password">
                <NavDropdown.Item>Change Password</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/user-dashboard/feedback">
              <Nav.Link>Feedback</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default UserNavbar;
