import * as yup from "yup";
import { Schema } from "yup";

export interface LogInFormType {
  email: string;
  password: string;
}

export const logInValidationSchema: Schema<LogInFormType> = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});

export const logInInitialValues: LogInFormType = {
  email: "",
  password: "",
};
