import CustomerMenu from "@/modules/customers/components/menu/CustomerMenu";
import { Box } from "@mui/material";

export default function OrderPage() {
  return (
    <Box
      py={10}
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      justifyContent={"center"}
    >
      <CustomerMenu isOrderPage={true} />
    </Box>
  );
}
