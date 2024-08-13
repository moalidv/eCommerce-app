import { Category } from "@components/ecommerce";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Categories = () => {
  const { records, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!records.length) {
      dispatch<any>(actGetCategories());
    }
  }, [dispatch]);

  const getCat =
    records.length > 0 &&
    records.map((c) => {
      return (
        <Col
          key={c.id}
          xs={3}
          className="d-flex justify-content-center mb-5 mt-2"
        >
          <Category {...c} />
        </Col>
      );
    });

  return (
    <Container>
      <Row>
        {getCat}
        {/* <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
          <Category />
        </Col>
        <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
          <Category />
        </Col>
        <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
          <Category />
        </Col>
        <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
          <Category />
        </Col> */}
      </Row>
    </Container>
  );
};

export default Categories;
