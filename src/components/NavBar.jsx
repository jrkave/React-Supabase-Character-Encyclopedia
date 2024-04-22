import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import '../styles/NavBar.css';
import imagePath from '../images/portal.png';

// Navbar component
const NavBar = () => {
  const { auth, signOut } = useAuth();

  // Logout user upon click
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand className="navbar-brand">
          <img
            alt=""
            src={imagePath}
            width="30"
            height="30"
            className="d-inline-block align top"
          />{' '}
          WubbaLubbaDubHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 justify-content-end links">
            {!auth && (
              <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
            {auth && (
              <>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
