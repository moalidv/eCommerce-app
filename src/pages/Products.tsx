import { Product } from "@components/ecommerce";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { actGetProductsByCatPrefix } from "@store/products/act/actGetProductsByCatPrefix";
import { productsCleanUp } from "@store/products/productsSlice";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Products = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const params = useParams();

  useEffect(() => {
    // let prefix: string;
    // if (params.prefix && typeof params.prefix == "string") {
    //   prefix = params.prefix;
    //   dispatch<any>(actGetProductsByCatPrefix(prefix));
    // }
    dispatch<any>(actGetProductsByCatPrefix(params.prefix as string));
    return () => {
      productsCleanUp();
    };
  }, [dispatch, params]);

  const productsList =
    records.length > 0 &&
    records.map((p) => {
      return (
        <Col
          key={p.id}
          xs={3}
          className="d-flex justify-content-center mb-5 mt-2"
        >
          <Product {...p} />
        </Col>
      );
    });

  return (
    <Container>
      <Row>
        {productsList}
        {/* <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
          <Product />
        </Col>
        <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
          <Product />
        </Col>
        <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
          <Product />
        </Col>
        <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
          <Product />
        </Col> */}
      </Row>
    </Container>
  );
};

export default Products;
