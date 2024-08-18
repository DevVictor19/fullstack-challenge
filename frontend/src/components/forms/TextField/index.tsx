import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import { ForwardedRef, forwardRef } from "react";

export type TextFieldProps = MuiTextFieldProps;

const TextField = forwardRef(function TextField(
  props: TextFieldProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <MuiTextField
      {...props}
      autoComplete="off"
      inputProps={{
        autoComplete: "new-password",
        form: {
          autoComplete: "off",
        },
      }}
      ref={ref}
    />
  );
});

export default TextField;
