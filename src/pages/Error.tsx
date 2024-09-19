import Lottie from "lottie-react";
import notFound from "@assets/lottifiles/notFound.json";
import { Container } from "react-bootstrap";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  let errorStatus: number;
  let errorText: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorText = error.statusText;
  } else {
    errorStatus = 404;
    errorText = "page not found";
  }

  return (
    <Container className="notFound">
      <Lottie style={{ width: "40%" }} animationData={notFound} />
      <Link to="/" replace={true}>
        How about going back to saftey??
      </Link>
    </Container>
  );
};

export default Error;
