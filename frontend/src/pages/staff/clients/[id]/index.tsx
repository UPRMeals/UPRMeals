import { Box, Stack, CircularProgress, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useUserService } from "@/shared/hooks/useUserService";
import { useEffect, useState } from "react";
import ProfileCard from "@/shared/components/profileCard";
import { UserProfile } from "../../../../../../backend/src/user/user.dto";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ClientProfilePage() {
  const router = useRouter();
  const { getProfileById } = useUserService();
  const [currUser, setCurrUser] = useState<UserProfile>();

  useEffect(() => {
    const getUserProfile = async () => {
      const idFromRouter = router.query.id;
      if (!idFromRouter || typeof idFromRouter !== "string") return;
      const user = await getProfileById(Number(idFromRouter));
      setCurrUser(user);
    };

    if (!currUser) {
      getUserProfile();
    }
  }, [getProfileById]);

  return (
    <Box
      py={15}
      px={5}
      justifyContent="center"
      display="flex"
      height={currUser ? "normal" : "100vh"}
    >
      {currUser ? (
        <Stack gap={2}>
          <Box>
            <Button
              onClick={() => {
                router.push("/staff/clients");
              }}
              startIcon={<ArrowBackIcon />}
            >
              Regresar
            </Button>
          </Box>

          <ProfileCard user={currUser} />
        </Stack>
      ) : (
        <Box alignContent={"center"} justifyItems={"center"} height={"100%"}>
          <CircularProgress size={80} />
        </Box>
      )}
    </Box>
  );
}
