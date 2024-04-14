import { Box, Stack, Alert, CircularProgress } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { useRouter } from "next/router";
import { useUserService } from "../../../shared/hooks/useUserService";
import { useEffect, useState } from "react";
import { UserProfile } from "../../../../../backend/src/user/user.dto";
import { useAuthService } from "../../../shared/hooks/useAuthService";
import toast from "react-hot-toast";
import BaseDialog from "../../../shared/components/baseDialog";
import ProfileCard from "../../../shared/components/profileCard";

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
    router.push("/customers");
  }

  async function handleLogout() {
    await logOut();
    localStorage.removeItem("token");
    router.push("/customers");
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
          {currUser.isFlagged && (
            <Alert icon={<WarningIcon fontSize="inherit" />} severity="warning">
              Your account has been flagged. Please visit the cafeteria to
              resolve this issue. You may resume acitivity upon the cafeteria
              staff member
              {"'"}s discretion.
            </Alert>
          )}

          <ProfileCard
            user={currUser}
            handleLogout={handleLogout}
            dropdownOptions={[
              {
                title: "Delete Account",
                onClick: () => setOpenDeleteDialog(true),
                color: "error.main",
              },
            ]}
          />
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
        dialogTitle="Are you sure you would like to delete your account?"
        dialogContent={`If you delete your account, you will no longer
          be able to create an account with us using the same email address.
           Please remember all email addresses must be a part of the UPR domain (@upr.edu).`}
        buttonDetails={{
          primary: { text: "No", position: "left" },
          secondary: { text: "Yes" },
        }}
      />
    </Box>
  );
}
