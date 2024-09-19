import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, { message: "email is required" }).email(),
  password: z
    .string()
    .min(8, { message: "password should be at least 8 characters" }),
});

type TFormInputs = z.infer<typeof loginSchema>;

export { loginSchema, type TFormInputs };
