import { loginUser, signupUser } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export function useLoginUser() {
  return useMutation({
    mutationFn: loginUser,
  });
}

export function useSignupUser() {
  return useMutation({
    mutationFn: signupUser,
  });
}
