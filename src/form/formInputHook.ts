import { FieldValues, useFormContext, UseFormRegister } from "react-hook-form";
import { FormInputProps } from "./formInput";

type UseFormInputHookReturn = {
  register: UseFormRegister<FieldValues>;
  fieldName: string;
  hasError: boolean;
  errorMessage: string;
  type: string;
};

export function useFormInputHook(
  props: FormInputProps
): UseFormInputHookReturn {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldName = props.name;

  return {
    register,
    fieldName,
    hasError: !!errors[fieldName],
    errorMessage: errors[fieldName]?.message ?? "",
    type: props.type ?? "text",
  };
}
