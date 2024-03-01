import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  if (router.isReady) {
    router.push("/customers");
  }

  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress size={80} />
    </Box>
  );
}
