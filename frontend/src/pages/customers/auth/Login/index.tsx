import CustomerLogIn from "@/modules/customers/auth/login/CustomerLogIn";
import { Box } from "@mui/material";

const LoginPage = () => {
  return (
    <Box
      py={10}
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      justifyContent={"center"}
    >
      <CustomerLogIn />
    </Box>
  );
};

export default LoginPage;
