import { Box, Button, Typography, Stack } from "@mui/material";
import Image from "next/legacy/image";
import { useRouter } from "next/router";

export default function CustomerHomePage() {
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
            ¿La fila está larga?
          </Typography>
          <Typography variant="h3">Pídelo aquí.</Typography>
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
          <Stack
            direction="row"
            spacing={2}
            mt={5}
            alignSelf={{ xs: "center", md: "inherit" }}
          >
            <Button
              variant="contained"
              onClick={() => router.push("/customers/order")}
            >
              Order Now
            </Button>
            <Button
              variant="text"
              onClick={() => router.push("/customers/menu")}
            >
              View Menu
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
