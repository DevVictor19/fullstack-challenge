import { z } from "zod";

const signupSchema = z.object({
  email: z
    .string({ required_error: "Esse campo é obrigatório" })
    .email("Email inválido")
    .trim(),
  password: z
    .string({ required_error: "Esse campo é obrigatório" })
    .min(4, "No mínimo 4 caracteres")
    .max(100, "No máximo 100 caracteres")
    .trim(),
});

export default signupSchema;

export type SignupSchema = z.infer<typeof signupSchema>;
