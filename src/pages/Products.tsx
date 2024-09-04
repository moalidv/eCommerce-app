import { GridList, Heading } from "@components/common";
import { Product } from "@components/ecommerce";
import Loading from "@components/feedback/loading/Loading";
import useProducts from "@hooks/useProducts";
import { memo } from "react";
import { Container } from "react-bootstrap";

const Products = () => {
  const { productPrefix, loading, error, productsFullInfo } = useProducts();
  return (
    <Container>
      <Heading title={`${productPrefix?.toUpperCase()} Products`} />

      <Loading loading={loading} error={error}>
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default memo(Products);
