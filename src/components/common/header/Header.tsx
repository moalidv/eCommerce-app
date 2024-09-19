import { HeaderBasket } from "@components/ecommerce";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { authLogout } from "@store/auth/authSlice";

const { headerContainer, headerLogo } = styles;

const Header = () => {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(authLogout());
  };
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our </span>
          <Badge bg="info">eCom</Badge>
        </h1>
        <HeaderBasket />
      </div>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">eCommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="about-us">
                About
              </Nav.Link>
            </Nav>
            <Nav>
              {!accessToken ? (
                <>
                  <Nav.Link as={NavLink} to="login">
                    login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="register">
                    register
                  </Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown
                    title={`welcome ${user?.firstName} ${user?.lastName}`}
                    id="nav-dropdown"
                  >
                    <NavDropdown.Item as={NavLink} to="profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={NavLink}
                      to="/"
                      onClick={handleLogout}
                    >
                      logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
