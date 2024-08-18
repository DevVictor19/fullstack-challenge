import { useForm } from "react-hook-form";
import signupSchema, { SignupSchema } from "../schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface IUseSignupForm {
  onSubmit: (formData: SignupSchema) => void;
}

export default function useSignupForm({ onSubmit }: IUseSignupForm) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupSchema>({ resolver: zodResolver(signupSchema) });

  const submitHandler = handleSubmit((data) => onSubmit(data));

  return {
    control,
    errors,
    submitHandler,
  };
}
