import { Box, Stack, Alert, CircularProgress, Button } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { useRouter } from "next/router";
import { useUserService } from "../../../shared/hooks/useUserService";
import { useEffect, useState } from "react";
import { UserProfile } from "../../../../../backend/src/user/user.dto";
import { useAuthService } from "../../../shared/hooks/useAuthService";
import toast from "react-hot-toast";
import BaseDialog from "../../../shared/components/baseDialog";
import ProfileCard from "../../../shared/components/profileCard";
import LogoutIcon from "@mui/icons-material/Logout";

export default function ProfilePage() {
  const router = useRouter();
  const { getProfile, removeUser } = useUserService();
  const { logOut } = useAuthService();
  const [currUser, setCurrUser] = useState<UserProfile>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  async function handleDelete() {
    await removeUser();
    toast.success("Successfully deleted account.");
    localStorage.removeItem("token");
    router.push("/staff");
  }

  async function handleLogout() {
    await logOut();
    localStorage.removeItem("token");
    router.push("/staff");
  }

  useEffect(() => {
    const getUserProfile = async () => {
      const user = await getProfile();
      setCurrUser(user);
    };

    if (!currUser) {
      getUserProfile();
    }
  }, [getProfile]);

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
          <ProfileCard
            user={currUser}
            dropdownOptions={[
              {
                title: "Eliminar Cuenta",
                onClick: () => setOpenDeleteDialog(true),
                color: "error.main",
              },
            ]}
            isStaffProfile={true}
          />
          <Button
            sx={{
              width: { xs: "100%", md: "inherit" },
              alignSelf: "flex-end",
            }}
            variant="contained"
            onClick={handleLogout}
            endIcon={<LogoutIcon />}
          >
            Cerrar Sesión
          </Button>
        </Stack>
      ) : (
        <Box alignContent={"center"} justifyItems={"center"} height={"100%"}>
          <CircularProgress size={80} />
        </Box>
      )}
      <BaseDialog
        open={openDeleteDialog}
        handleClose={() => {
          setOpenDeleteDialog(false);
        }}
        handleSubmit={handleDelete}
        dialogTitle="¿Está seguro de que desea eliminar su cuenta?"
        dialogContent={`Al eliminar su cuenta, no se podrá crear una cuenta
         usando la misma dirección de correo electrónico. 
        Recuerde que todas las direcciones de correo electrónico 
        deben ser parte del dominio UPR (@upr.edu).`}
        buttonDetails={{
          primary: { text: "No", position: "left" },
          secondary: { text: "Sí" },
        }}
      />
    </Box>
  );
}
