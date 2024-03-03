import * as yup from "yup";
import { Schema } from "yup";

export interface SignUpFormType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signUpValidationSchema: Schema<SignUpFormType> = yup
  .object()
  .shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Password confirmation is required"),
  })
  .test("passwords-match", "Passwords must match.", function (values) {
    if (!values) return true;

    if (!!values.password && !!values.confirmPassword) {
      if (values.password !== values.confirmPassword)
        throw this.createError({
          path: "confirmPassword",
          message: "Passwords must match.",
        });
    }
    return true;
  });

export const signUpInitialValues: SignUpFormType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
