import { Heading } from "@components/common";
import { Input } from "@components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import actAuthLogin from "@store/auth/act/actAuthLogin";
import { resetUI } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { loginSchema, TFormInputs } from "@validations/loginSchema";
import { useEffect } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const submitForm: SubmitHandler<TFormInputs> = (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }
    dispatch<any>(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    return () => {
      dispatch<any>(resetUI());
    };
  }, [dispatch]);

  if (accessToken) {
    // navigate("/");
    // return;
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">
              Your account successfully created, please login
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              name="email"
              error={errors.email?.message}
              label="Email"
              register={register}
            />
            <Input
              name="password"
              error={errors.password?.message}
              label="Password"
              register={register}
            />
            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm">
                    {" "}
                  </Spinner>{" "}
                  loading...
                </>
              ) : (
                "submit"
              )}
            </Button>
            {error && (
              <p style={{ color: "#bc3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
