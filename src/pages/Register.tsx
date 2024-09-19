import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Heading } from "@components/common";
import { Input } from "@components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { registerSchema, TFormInputs } from "@validations/registerSchema";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { actAuthRegister } from "@store/auth/act/actAuthRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getFieldState,
  } = useForm<TFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const {
    checkEmailAvailability,
    emailAvailabilityStatus,
    enteredEmail,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();
  const submitForm: SubmitHandler<TFormInputs> = (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch<any>(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => navigate("/login?message=account_created"));
  };

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    await trigger("email");
    console.log(value);
    const { invalid, isDirty } = getFieldState("email");
    if (isDirty && invalid && enteredEmail !== value) {
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };

  return (
    <>
      <Heading title="User Register" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="First Name"
              error={errors.firstName?.message as string}
              register={register}
              name="firstName"
            />
            <Input
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName?.message}
            />
            <Input
              label="Email"
              name="email"
              register={register}
              error={
                errors.email?.message
                  ? errors.email?.message
                  : emailAvailabilityStatus === "notAvailable"
                  ? "this email is already in use"
                  : ""
              }
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailabilityStatus === "checking"
                  ? "we're currently checking the availability of this email address. Please wait..."
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "this email is available"
                  : ""
              }
            />
            <Input
              type="password"
              label="password"
              name="password"
              error={errors.password?.message}
              register={register}
            />
            <Input
              type="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              error={errors.confirmPassword?.message}
              register={register}
            />
            <Button variant="info" type="submit" style={{ color: "white" }}>
              Submit
            </Button>
            {error && (
              <p style={{ color: "#dc3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
