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
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email")
      .test("upr-email", "Email must belong to the UPR domain.", (value) => {
        if (!value) return true;
        return value.endsWith("@upr.edu");
      }),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s)(?=.{8,})/,
        "Must contain 8 characters, one uppercase, one lowercase, and one number."
      ),
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
