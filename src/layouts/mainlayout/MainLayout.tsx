import { Container } from "react-bootstrap";
import styles from "./Styles.module.css";
import { Header } from "@components/common";
import { Footer } from "@components/common";
import { Outlet } from "react-router-dom";

const { container, wrapper } = styles;

const MainLayout = () => {
  return (
    <Container className={container}>
      <Header />
      <div className={wrapper}>
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
};

export default MainLayout;
