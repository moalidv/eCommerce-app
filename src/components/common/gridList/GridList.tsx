import { Col, Row } from "react-bootstrap";

type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
};

const GridList = <T extends { id?: number }>({
  records,
  renderItem,
}: GridListProps<T>) => {
  const categoryList = records.map((record) => {
    return (
      <Col
        key={record.id}
        xs={3}
        className="d-flex justify-content-center mb-5 mt-2"
      >
        {renderItem(record)}
      </Col>
    );
  });
  return <Row>{categoryList}</Row>;
};

export default GridList;
