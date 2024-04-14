import { Colors } from "@/styles/theme";
import { Box, Button, Typography, Stack, ButtonGroup } from "@mui/material";
import Image from "next/legacy/image";
import { useRouter } from "next/router";

export default function StaffHomePage() {
  const router = useRouter();

  return (
    <Box mt={9} pb={10} px={5} alignItems={"center"}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={"center"}
      >
        <Box
          sx={{ position: "relative" }}
          display={{ xs: "none", md: "block" }}
        >
          <Image
            src="/Tarzan.png"
            alt="Tarzan"
            layout="fixed"
            objectFit="contain"
            height={713}
            width={551}
          />
        </Box>
        <Stack textAlign={"end"} alignItems="end">
          <Typography variant="h1" fontFamily={"Bungee"}>
            Bienvenido al Equipo!
          </Typography>
          <Typography variant="h3" fontWeight={400}>
            Gestiona los pedidos aquí.
          </Typography>
          <Box
            sx={{ position: "relative" }}
            display={{ xs: "block", md: "none" }}
            alignSelf="center"
            mt={4}
          >
            <Image
              src="/Tarzan.png"
              alt="Tarzan"
              layout="fixed"
              objectFit="contain"
              height={215}
              width={173}
            />
          </Box>
          <Stack mt={5} alignSelf={{ xs: "center", md: "inherit" }}>
            <ButtonGroup variant="text">
              <Button onClick={() => router.push("/staff/orders")}>
                Pedidos
              </Button>
              <Button onClick={() => router.push("/staff/menus")}>Menus</Button>
              <Button onClick={() => router.push("/customers")}>
                Portal de Estudiantes
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
