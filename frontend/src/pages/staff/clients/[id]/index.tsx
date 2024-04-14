import { Box, Stack, CircularProgress, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useUserService } from "@/shared/hooks/useUserService";
import { useEffect, useState } from "react";
import ProfileCard from "@/shared/components/profileCard";
import { UserProfile } from "../../../../../../backend/src/user/user.dto";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateStaffDialog from "../../../../modules/staff/components/CreateStaffDialog";
import { DropdownMenuOptionType } from "../../../../shared/components/DropdownMenu";

export default function ClientProfilePage() {
  const router = useRouter();
  const { getProfileById } = useUserService();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [openSuspendCustomerDialog, setOpenSuspendCustomerDialog] =
    useState(false);
  const [openCreateStaffDialog, setOpenCreateStaffDialog] = useState(false);
  const rand = Math.random(); // TODO
  let isFlagged = false;
  if (rand > 0.5) {
    isFlagged = true;
  }

  const dropdownMenuOptions: DropdownMenuOptionType[] = [
    {
      title: "Marcar como Empleado",
      onClick: () => setOpenCreateStaffDialog(true),
    },
  ];

  if (!isFlagged) {
    dropdownMenuOptions.push({
      title: "Suspender Cliente",
      onClick: () => setOpenSuspendCustomerDialog(true),
      color: "error.main",
    });
  }

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
                router.push("/staff/clients");
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
        <>
          <CreateStaffDialog
            open={openCreateStaffDialog}
            handleClose={async () => {
              setOpenCreateStaffDialog(false);
            }}
            userId={userProfile.id}
            rerouteLink={"/staff/employees"}
          />
        </>
      ) : null}
    </Box>
  );
}
