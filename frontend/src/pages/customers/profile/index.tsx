import {
  Box,
  CardContent,
  Card,
  Typography,
  Stack,
  Divider,
  Avatar,
  Tooltip,
  IconButton,
  Alert,
  Grid,
  CardActions,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import { deepPurple, amber, cyan, grey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningIcon from "@mui/icons-material/Warning";
import { isFlaggedAccount } from "../components/navbar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";
import { useUserService } from "@/modules/customers/user/hooks/useUserService";
import { useEffect, useState } from "react";
import { UserProfile } from "../../../../../backend/src/user/user.dto";
import { useAuthService } from "@/modules/customers/auth/hooks/useAuthService";
import toast from "react-hot-toast";
import BaseDialog from "@/shared/components/baseDialog";
import DropdownMenu from "@/shared/components/DropdownMenu";

const accountIconColors: string[] = [
  deepPurple[200],
  deepPurple[300],
  amber[400],
  amber[600],
  cyan[200],
];

const IconDetailsRow = ({
  icon,
  text,
}: {
  icon: JSX.Element;
  text: string;
}) => {
  return (
    <Stack direction="row" spacing={3}>
      {icon}
      <Typography>{text}</Typography>
    </Stack>
  );
};

export default function ProfilePage() {
  const router = useRouter();
  const { getProfile, removeUser } = useUserService();
  const { logOut } = useAuthService();
  const [letterColor, setLetterColor] = useState<string>();
  const [currUser, setCurrUser] = useState<UserProfile>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const notes =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  async function handleDelete() {
    await removeUser();
    toast.success("Successfully deleted account.");
    localStorage.removeItem("token");
    router.push("/customers");
  }

  function pickIconColor() {
    const randNumber = Math.floor(Math.random() * accountIconColors.length);

    return accountIconColors[randNumber];
  }

  async function handleLogout() {
    await logOut();
    localStorage.removeItem("token");
    router.push("/customers");
  }

  useEffect(() => {
    const color = pickIconColor();
    setLetterColor(color);
  }, []);

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
    <Box mt={15} pb={10} px={5} justifyContent="center" display="flex">
      {currUser ? (
        <Stack gap={2}>
          {isFlaggedAccount && (
            <Alert icon={<WarningIcon fontSize="inherit" />} severity="warning">
              Your account has been flagged. Please visit the cafeteria to
              resolve this issue. You may resume acitivity upon the cafeteria
              staff member
              {"'"}s discretion.
            </Alert>
          )}

          <Card sx={{ minWidth: "70%" }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent={{ xs: "center", md: "start" }}
                p={{ xs: 3, md: 2 }}
              >
                <Stack>
                  <Grid container>
                    <Grid item order={{ xs: 1, md: 1 }} xs={10} md={2.5} lg={2}>
                      <Avatar
                        sx={{
                          bgcolor: letterColor,
                          width: 156,
                          height: 156,
                          fontSize: 120,
                          fontFamily: "Bungee",
                        }}
                      >
                        {currUser?.firstName?.charAt(0).toUpperCase()}
                      </Avatar>
                    </Grid>
                    <Grid
                      item
                      order={{ xs: 3, md: 2 }}
                      xs={12}
                      md={6.5}
                      lg={8}
                      display="flex"
                      alignItems="center"
                    >
                      <Box display="flex">
                        <Divider
                          flexItem
                          orientation="vertical"
                          sx={{ display: { xs: "none", md: "block" }, mx: 4 }}
                        />

                        <Stack gap={3} mt={{ xs: 3, md: 0 }}>
                          <IconDetailsRow
                            icon={<PersonIcon />}
                            text={currUser.firstName + " " + currUser.lastName}
                          />
                          <IconDetailsRow
                            icon={<EmailIcon />}
                            text={currUser.email}
                          />
                        </Stack>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      order={{ xs: 2, md: 3 }}
                      xs={2}
                      md={3}
                      lg={2}
                      display="flex"
                      justifyContent={"flex-end"}
                    >
                      <DropdownMenu
                        menuItems={[
                          {
                            title: "Delete Account",
                            onClick: () => setOpenDialog(true),
                            color: "error.main",
                          },
                        ]}
                      />
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{ display: { xs: "block", md: "none" }, mt: 3 }}
                  />
                  <Stack mt={3}>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems={"center"}
                    >
                      <Typography variant="h6">
                        <b>Notes</b>
                      </Typography>
                      <Tooltip
                        title="These notes are added to your account by the cafeteria staff or an admin user."
                        placement="top"
                      >
                        <IconButton>
                          <InfoOutlinedIcon
                            fontSize="small"
                            sx={{ color: grey[400] }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Typography> {notes}</Typography>
                  </Stack>
                </Stack>
              </Box>
              <CardActions>
                <Button variant="contained" onClick={handleLogout}>
                  Log Out
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Stack>
      ) : (
        <CircularProgress />
      )}
      <BaseDialog
        open={openDialog}
        handleClose={() => {
          setOpenDialog(false);
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
