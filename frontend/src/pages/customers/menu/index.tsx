import CustomerMenu from "@/modules/customers/components/menu/CustomerMenu";
import { Height } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function MenuPage() {
  const router = useRouter();

  return (
    <Box
      py={10}
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"start"}
    >
      <Stack justifyContent={"space-between"} alignItems={"center"} pb={2}>
        <Typography variant="h2" mb={2}>
          Menu de Hoy
        </Typography>
        <Button
          variant="contained"
          sx={{ maxHeight: 50 }}
          onClick={() => router.push("/customers/order")}
        >
          Order Now
        </Button>
      </Stack>
      <CustomerMenu isOrderPage={false} />
    </Box>
  );
}
