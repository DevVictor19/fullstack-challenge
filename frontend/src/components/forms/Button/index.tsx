import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { ForwardedRef, ReactNode, forwardRef } from "react";

interface IButtonProps extends MuiButtonProps {
  children: ReactNode;
}

const Button = forwardRef(function Button(
  { children, ...rest }: IButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <MuiButton {...rest} ref={ref}>
      {children}
    </MuiButton>
  );
});

export default Button;
