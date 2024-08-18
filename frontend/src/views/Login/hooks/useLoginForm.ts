import { useForm } from "react-hook-form";
import loginSchema, { LoginSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface IUseLoginForm {
  onSubmit: (formData: LoginSchema) => void;
}

export default function useLoginForm({ onSubmit }: IUseLoginForm) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const submitHandler = handleSubmit((data) => onSubmit(data));

  return {
    control,
    errors,
    submitHandler,
  };
}
