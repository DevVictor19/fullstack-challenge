import { z } from "zod";

const loginSchema = z.object({
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

export default loginSchema;

export type LoginSchema = z.infer<typeof loginSchema>;
