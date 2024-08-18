import { Control, Controller, FieldValues, Path } from "react-hook-form";

import TextField, { TextFieldProps } from "../TextField";

type TextFieldControlledProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T, any>;
  mask?: (value: string) => string;
};

export default function TextFieldControlled<T extends FieldValues>({
  name,
  control,
  mask,
  ...rest
}: TextFieldControlledProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          value={field.value}
          onChange={(event) => {
            if (mask) {
              event.target.value = mask(event.target.value);
            }

            field.onChange(event);
          }}
          onBlur={field.onBlur}
          disabled={field.disabled}
          ref={field.ref}
          {...rest}
        />
      )}
    />
  );
}
