import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import {
  SignUpFormType,
  signUpInitialValues,
  signUpValidationSchema,
} from "./config";
import TextInput from "@/shared/components/inputs/TextInput";
import { useAuthService } from "../hooks/useAuthService";
import { useState } from "react";
import { useRouter } from "next/router";

const CustomerSignUp = () => {
  const [submitError, setSubmitError] = useState<string>("");

  const authService = useAuthService();
  const router = useRouter();

  const handleSubmit = async (values: SignUpFormType) => {
    const response = await authService.signUp(values);
    if (response.error) {
      setSubmitError(response.error);
    } else {
      localStorage.setItem("token", response.access_token);
      router.push("/customers/menu");
    }
  };

  const formik = useFormik<SignUpFormType>({
    initialValues: signUpInitialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: handleSubmit,
  });

  //TODO: Add Student number with the checkbox for being a student
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
      width="40%"
      rowGap={2}
    >
      <Typography variant="h1" mb={5}>
        Sign Up
      </Typography>
      {!!submitError && (
        <Typography variant="body1" color="error">
          {submitError}
        </Typography>
      )}
      <Stack direction="row" spacing={1} width="100%">
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
      <Button
        variant="contained"
        onClick={formik.submitForm}
        disabled={!formik.isValid}
      >
        Sign Up
      </Button>
      <Stack direction="row" gap={1}>
        <Typography variant="body1">Already have an account?</Typography>
        <Link
          component="button"
          variant="body1"
          onClick={() => {
            console.info("redirect to login page");
          }}
        >
          Log In!
        </Link>
      </Stack>
    </Box>
  );
};

export default CustomerSignUp;
