import { Box, Button, Typography, Stack, useTheme } from "@mui/material";
import Image from "next/legacy/image";

export default function HomePage() {
  const theme = useTheme();

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
          <Typography variant="h1" fontFamily={"Bungee"} color="info.main">
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
            spacing={3}
            mt={5}
            alignSelf={{ xs: "center", md: "inherit" }}
          >
            <Button
              variant="contained"
              disableElevation
              sx={{
                color: "#fffdf9",
                backgroundColor: "text.secondary",
                fontWeight: 600,
                textTransform: "capitalize",
                [theme.breakpoints.down("sm")]: {
                  fontSize: 18,
                },
                [theme.breakpoints.up("sm")]: {
                  fontSize: 20,
                },
              }}
            >
              Order Now
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "text.secondary",
                borderColor: "text.secondary",
                fontWeight: 600,
                textTransform: "capitalize",
                [theme.breakpoints.down("sm")]: {
                  fontSize: 18,
                },
                [theme.breakpoints.up("sm")]: {
                  fontSize: 20,
                },
              }}
            >
              View Menu
            </Button>
          </Stack>
        </Stack>
      </Box>
      {/* <LoginPage /> */}
    </Box>
  );
}
