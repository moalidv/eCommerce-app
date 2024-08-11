import { HeaderBasket } from "@components/ecommerce";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import styles from "./styles.module.css";

const { headerContainer, headerLogo } = styles;

const Header = () => {
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our </span>
          <Badge bg="info">Badge</Badge>
        </h1>
        <HeaderBasket />
      </div>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Categories</Nav.Link>
              <Nav.Link href="#link">About</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#home">login</Nav.Link>
              <Nav.Link href="#link">register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
