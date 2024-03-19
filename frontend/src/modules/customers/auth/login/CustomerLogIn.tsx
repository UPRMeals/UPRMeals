import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import TextInput from "@/shared/components/inputs/TextInput";
import { useAuthService } from "../hooks/useAuthService";
import { useRouter } from "next/router";
import {
  LogInFormType,
  logInInitialValues,
  logInValidationSchema,
} from "./config";
import toast from "react-hot-toast";

const CustomerLogIn = () => {
  const authService = useAuthService();
  const router = useRouter();
  const redirectUrl = (router.query["redirect"] as string) ?? null;

  const handleSubmit = async (values: LogInFormType) => {
    const response = await authService.logIn(values);
    if (response?.error || !response?.access_token) {
      toast.error(
        response?.error ?? "An error occurred. Please try again later."
      );
    } else {
      localStorage.setItem("token", response.access_token);
      router.push(redirectUrl ?? "/customers/menu");
    }
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
        disabled={!formik.isValid}
        sx={{ width: { xs: "100%", sm: "auto" } }}
      >
        Log In
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
