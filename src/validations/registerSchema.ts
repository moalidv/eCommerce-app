import { z } from "zod";

const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: "first name is required" }),
    lastName: z.string().min(1, { message: "last name is required" }),
    email: z.string().min(1, { message: "email is required" }).email(),
    password: z
      .string()
      .min(8, { message: "password should be at least 8 characters" })
      .regex(/.*[!@#$%^&*()_+{}|\]\\:";'<>?.,/].*/, {
        message: "password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "confirm password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "password and confirm password don't match",
    path: ["confirmPassword"],
  });

type TFormInputs = z.infer<typeof registerSchema>;

export { registerSchema, type TFormInputs };
