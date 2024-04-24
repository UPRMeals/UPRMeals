import { Box, Stack, CircularProgress, Button, Alert } from "@mui/material";
import { useRouter } from "next/router";
import { useUserService } from "@/shared/hooks/useUserService";
import { useEffect, useState } from "react";
import ProfileCard from "../../../../shared/components/profileCard";
import { UserProfile } from "../../../../../../backend/src/user/user.dto";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DropdownMenuOptionType } from "../../../../shared/components/DropdownMenu";
import WarningIcon from "@mui/icons-material/Warning";
import SetEmployeeDialog from "@/modules/staff/components/SetEmployeeDialog";
import toast from "react-hot-toast";
import FlagCustomerDialog from "@/modules/staff/components/FlagCustomerDialog";

export default function ClientProfilePage() {
  const router = useRouter();
  const { getProfileById, unflagCustomer } = useUserService();
  const [userProfile, setUserProfile] = useState<UserProfile | null>();
  const [openSuspendCustomerDialog, setOpenSuspendCustomerDialog] =
    useState(false);

  const [openSetEmployeeDialog, setOpenSetEmployeeDialog] = useState(false);

  async function handleRemovingCustomerFlag() {
    if (!userProfile?.id) {
      toast.error("No se pudo levantar la suspensión.");
      return;
    }
    const unflaggedUser = await unflagCustomer(userProfile.id);
    setUserProfile(null);
    if (unflaggedUser.id && !unflaggedUser.isFlagged) {
      toast.success("Suspensión removida exitosamente.");
    }
  }

  const dropdownMenuOptions: DropdownMenuOptionType[] = [
    {
      title: "Marcar como Empleado",
      onClick: () => setOpenSetEmployeeDialog(true),
    },
  ];

  if (userProfile?.isFlagged) {
    dropdownMenuOptions.push({
      title: "Remover Suspensión",
      onClick: () => handleRemovingCustomerFlag(),
      color: "error.main",
    });
  } else if (!userProfile?.isFlagged) {
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
  }, [getProfileById, userProfile]);

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
          {userProfile?.isFlagged && (
            <Alert icon={<WarningIcon fontSize="inherit" />} severity="warning">
              Este usuaria ha sido suspendido. Para remover la suspensión,
              presiona el botón de los tres puntos.
            </Alert>
          )}
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
          <SetEmployeeDialog
            open={openSetEmployeeDialog}
            handleClose={async () => {
              setOpenSetEmployeeDialog(false);
            }}
            userId={userProfile.id}
            rerouteLink={"/staff/employees"}
          />
          <FlagCustomerDialog
            open={openSuspendCustomerDialog}
            handleClose={async () => {
              setUserProfile(null);
              setOpenSuspendCustomerDialog(false);
            }}
            userId={userProfile.id}
          />
        </>
      ) : null}
    </Box>
  );
}
