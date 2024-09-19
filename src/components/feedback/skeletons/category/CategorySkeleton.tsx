import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

const CategorySkeleton = () => {
  const renderSkeletonList = Array(5)
    .fill(0)
    .map((_, idx) => (
      <Col key={idx} xs={3} className="d-flex justify-content-center mb-5 mt-2">
        <ContentLoader
          speed={2}
          width={500}
          height={260}
          viewBox="0 0 400 160"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="7" y="126" rx="3" ry="3" width="88" height="6" />
          <circle cx="51" cy="51" r="51" />
        </ContentLoader>
      </Col>
    ));
  return <Row>{renderSkeletonList}</Row>;
};

export default CategorySkeleton;
