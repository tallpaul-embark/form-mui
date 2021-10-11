import "./formInput.css";
import React from "react";
import { TextField, TextFieldProps } from "@material-ui/core";
import { useFormInputHook } from "./formInputHook";

export type FormInputProps = TextFieldProps & {
  name: string;
};

export const FormInput: React.FC<FormInputProps> = (props) => {
  const { register, hasError, fieldName, errorMessage, type } =
    useFormInputHook(props);

  return (
    <TextField
      error={hasError}
      helperText={errorMessage}
      type={type}
      {...register(fieldName)}
      {...props}
    />
  );
};

export default FormInput;
