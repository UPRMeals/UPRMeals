import CustomerOrderPage from "@/modules/customers/order/CustomerOrderPage";
import { Box, Divider } from "@mui/material";

export default function OrderPage() {
  return (
    <Box
      py={10}
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      justifyContent={"center"}
    >
      <CustomerOrderPage />
    </Box>
  );
}
