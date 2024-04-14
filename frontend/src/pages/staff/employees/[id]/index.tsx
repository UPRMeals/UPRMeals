import { Box, Stack, CircularProgress, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useUserService } from "../../../../shared/hooks/useUserService";
import { useEffect, useState } from "react";
import ProfileCard from "../../../../shared/components/profileCard";
import { UserProfile } from "../../../../../../backend/src/user/user.dto";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DropdownMenuOptionType } from "../../../../shared/components/DropdownMenu";
import RemoveEmployeeDialog from "../../../../modules/staff/components/RemoveEmployeeDialog";
import { JWTUtils } from "../../../../shared/utils/jwtUtils";

export default function EmployeeProfilesPage() {
  const router = useRouter();
  const { getProfileById } = useUserService();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [openSuspendEmployeeDialog, setOpenSuspendEmployeeDialog] =
    useState(false);
  const [currUserId, setCurrUserId] = useState<number>();

  const getCurrUserId = JWTUtils.getUserId;

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("token");
      const userIdFromToken = getCurrUserId(token);

      setCurrUserId(userIdFromToken);
    };
    fetchUserId();
  }, [getCurrUserId, router]);

  const dropdownMenuOptions: DropdownMenuOptionType[] =
    currUserId === userProfile?.id
      ? []
      : [
          {
            title: "Suspender Empleado",
            onClick: () => setOpenSuspendEmployeeDialog(true),
            color: "error.main",
          },
        ];

  useEffect(() => {
    const getUserProfile = async () => {
      const idFromRouter = router.query.id;
      if (!idFromRouter || typeof idFromRouter !== "string") return;
      const user = await getProfileById(Number(idFromRouter));
      setUserProfile(user);
    };

    if (!userProfile) {
      getUserProfile();
    }
  }, [getProfileById]);

  return (
    <Box
      py={15}
      px={5}
      justifyContent="center"
      display="flex"
      height={userProfile ? "normal" : "100vh"}
    >
      {userProfile ? (
        <Stack gap={2}>
          <Box>
            <Button
              onClick={() => {
                router.push("/staff/employees");
              }}
              startIcon={<ArrowBackIcon />}
            >
              Regresar
            </Button>
          </Box>
          <ProfileCard
            user={userProfile}
            dropdownOptions={dropdownMenuOptions}
          />
        </Stack>
      ) : (
        <Box alignContent={"center"} justifyItems={"center"} height={"100%"}>
          <CircularProgress size={80} />
        </Box>
      )}
      {userProfile?.id ? (
        <RemoveEmployeeDialog
          open={openSuspendEmployeeDialog}
          handleClose={async () => {
            setOpenSuspendEmployeeDialog(false);
          }}
          userId={userProfile.id}
          rerouteLink={"/staff/employees"}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}
