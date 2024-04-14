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
import toast from "react-hot-toast";
import * as yup from "yup";
import { Schema } from "yup";
import { useState } from "react";

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

const CustomerLogIn = () => {
  const authService = useAuthService();
  const router = useRouter();
  const redirectUrl = (router.query["redirect"] as string) ?? null;
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const handleSubmit = async (values: LogInFormType) => {
    setIsValidating(true);
    const response = await authService.logIn(values);
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

  const formik = useFormik<LogInFormType>({
    initialValues: logInInitialValues,
    validationSchema: logInValidationSchema,
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
        Log In
      </Typography>
      <TextInput formik={formik} name="email" label="Email" required />
      <TextInput
        formik={formik}
        name="password"
        label="Pasword"
        type="password"
        required
      />
      <Button
        variant="contained"
        onClick={formik.submitForm}
        disabled={!formik.isValid || isValidating}
        sx={{ width: { xs: "100%", sm: "auto" } }}
      >
        {isValidating ? (
          <CircularProgress size={18} sx={{ color: "white", my: 1, mx: 2.5 }} />
        ) : (
          "Log In"
        )}
      </Button>
      <Stack direction="row" gap={1} mt={2} whiteSpace="nowrap">
        <Typography variant="body1">Don&apos;t have an account?</Typography>
        <Link
          component="button"
          variant="body1"
          onClick={() => {
            router.push("/customers/auth/signup");
          }}
        >
          Sign Up!
        </Link>
      </Stack>
    </Box>
  );
};

export default CustomerLogIn;
