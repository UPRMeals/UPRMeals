import { Box, Stack, Alert, CircularProgress } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { useRouter } from "next/router";
import { useUserService } from "@/shared/hooks/useUserService";
import { useEffect, useState } from "react";
import { useAuthService } from "@/shared/hooks/useAuthService";
import toast from "react-hot-toast";
import BaseDialog from "@/shared/components/baseDialog";
import ProfileCard from "@/shared/components/profileCard";
import { UserProfile } from "../../../../../../backend/src/user/user.dto";
import { string } from "yup";

export default function EmployeeProfilesPage() {
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
