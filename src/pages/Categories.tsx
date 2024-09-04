import { GridList, Heading } from "@components/common";
import { Category } from "@components/ecommerce";
import Loading from "@components/feedback/loading/Loading";
import useCategories from "@hooks/useCategories";
import { Container } from "react-bootstrap";

const Categories = () => {
  const { error, loading, records } = useCategories();

  return (
    <Container>
      <Heading title="Categories" />
      <Loading loading={loading} error={error}>
        <GridList
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
