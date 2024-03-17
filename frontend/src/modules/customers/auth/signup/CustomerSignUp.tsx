import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import {
  SignUpFormType,
  signUpInitialValues,
  signUpValidationSchema,
} from "./config";
import TextInput from "@/shared/components/inputs/TextInput";
import { useAuthService } from "../hooks/useAuthService";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const CustomerSignUp = () => {
  const authService = useAuthService();
  const router = useRouter();
  const redirectUrl = (router.query["redirect"] as string) ?? null;

  const handleSubmit = async (values: SignUpFormType) => {
    const response = await authService.signUp(values);
    if (response?.error || !response?.access_token) {
      toast.error(
        response?.error ?? "An error occurred. Please try again later."
      );
    } else {
      localStorage.setItem("token", response.access_token);
      router.push(redirectUrl ?? "/customers/menu");
    }
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
      width="40%"
      rowGap={2}
    >
      <Typography variant="h1" mb={5}>
        Sign Up
      </Typography>
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
      <Stack direction="row" gap={1} mt={2}>
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
