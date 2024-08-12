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
      <h1>{errorStatus}</h1>
      <p>{errorText}</p>
      <Link to="/" replace={true}>
        Back to Home
      </Link>
    </Container>
  );
};

export default Error;
