import {
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import TextInput from "@/shared/inputs/TextInput";
import { useAuthService } from "../../../../shared/hooks/useAuthService";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { Schema } from "yup";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

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

const CustomerSignUp = () => {
  const authService = useAuthService();
  const router = useRouter();
  const redirectUrl = (router.query["redirect"] as string) ?? null;
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const handleSubmit = async (values: SignUpFormType) => {
    setIsValidating(true);
    const response = await authService.signUp(values);
    if (response?.error || !response?.access_token) {
      toast.error(
        response?.error ?? "An error occurred. Please try again later."
      );
    } else {
      localStorage.setItem("token", response.access_token);
      router.push(redirectUrl ?? "/customers/menu");
    }
    setIsValidating(false);
  };

  const formik = useFormik<SignUpFormType>({
    initialValues: signUpInitialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
      width={{ xs: "70%", sm: "40%" }}
      rowGap={2}
    >
      <Typography variant="h1" mb={5}>
        Sign Up
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} gap={2} width="100%">
        <TextInput
          formik={formik}
          name="firstName"
          label="First Name"
          required
        />
        <TextInput formik={formik} name="lastName" label="Last Name" required />
      </Stack>
      <TextInput formik={formik} name="email" label="Email" required />
      <TextInput
        formik={formik}
        name="password"
        label="Pasword"
        type="password"
        required
      />
      <TextInput
        formik={formik}
        name="confirmPassword"
        label="Confirm Pasword"
        type="password"
        required
      />
      <LoadingButton
        loading={isValidating}
        variant="contained"
        onClick={formik.submitForm}
        disabled={!formik.isValid}
        sx={{ width: { xs: "100%", sm: "auto" } }}
      >
        Sign Up
      </LoadingButton>
      <Stack direction="row" gap={1} mt={2} whiteSpace="nowrap">
        <Typography variant="body1">Already have an account?</Typography>
        <Link
          component="button"
          variant="body1"
          onClick={() => {
            router.push("/customers/auth/login");
          }}
        >
          Log In!
        </Link>
      </Stack>
    </Box>
  );
};

export default CustomerSignUp;
