import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import {
  SignUpFormType,
  signUpInitialValues,
  signUpValidationSchema,
} from "./config";
import TextInput from "@/shared/components/inputs/TextInput";

const CustomerSignUp = () => {
  const handleSubmit = (values: SignUpFormType) => {
    console.log("submittinng values", values);
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
