import { Form } from "react-bootstrap";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  register: UseFormRegister<TFieldValue>;
  error?: string;
  type?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
};

const Input = <TFieldValue extends FieldValues>({
  name,
  label,
  type = "text",
  register,
  error,
  onBlur,
  formText,
  success,
}: InputProps<TFieldValue>) => {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...register(name)}
        onBlur={onBlurHandler}
        type={type}
        isInvalid={!!error}
        isValid={!!success}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      {formText && <Form.Text muted>{formText}</Form.Text>}
    </Form.Group>
  );
};

export default Input;
