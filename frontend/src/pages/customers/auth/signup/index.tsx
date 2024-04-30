import CustomerSignUp from "@/modules/customers/components/auth/CustomerSignUp";
import { Box } from "@mui/material";

const SignUpPage = () => {
  return (
    <Box
      pb={10}
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      justifyContent={"center"}
    >
      <CustomerSignUp />
    </Box>
  );
};

export default SignUpPage;
