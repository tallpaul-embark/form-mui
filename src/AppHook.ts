import { useForm, SubmitHandler } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// const emailValidationMatch =
//   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// const validationSchema = yup.object().shape({
//   fullName: yup.string().required("Name Validation Field is Required"),
//   email: yup
//     .string()
//     .matches(emailValidationMatch, "Please Enter a valid email"),
//   age: yup
//     .number()
//     .required("Please Enter A Number")
//     .min(18, "You must be 18 years old"),
// });
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Please enter a string longer than 1" }),
  email: z.string().email({ message: "Please Enter a valid email" }),
  age: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .refine((val) => parseInt(val, 10) < 18, {
      message: "You must be 18 years old",
    }),
});

interface FormInputs {
  name: string;
  email: string;
  age: number;
}

export function useAppHook() {
  const formInformation = useForm<FormInputs>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);
  const fields = {
    fullName: {
      name: "fullName",
      label: "Full Name",
      defaultValue: "",
    },
    email: {
      name: "email",
      label: "Email",
      defaultValue: "",
    },
    age: {
      name: "age",
      label: "Age",
      defaultValue: "",
      type: "number",
      valueAsNumber: true,
    },
  };

  return {
    formInformation,
    onSubmit,
    fields,
    isSubmitDisabled: !formInformation.formState.isValid,
  };
}
