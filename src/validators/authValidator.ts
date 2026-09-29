import { z } from "zod";

const emailField = z
  .string({ error: "Email is required." })
  .trim()
  .toLowerCase()
  .pipe(z.email({ error: "Please provide a valid email." }));

const registerSchema = z.object({
  name: z
    .string({ error: "Name is required." })
    .trim()
    .min(1, { error: "Name is required." }),
  email: emailField,
  password: z
    .string({ error: "Password is required." })
    .min(6, { error: "Password must be at least 6 characters." })
    .max(20, { error: "Password must be at most 20 characters." }),
});

const loginSchema = z.object({
  email: emailField,
  password: z
    .string({ error: "Password is required." })
    .min(1, { error: "Password is required." }),
});

export { registerSchema, loginSchema };
