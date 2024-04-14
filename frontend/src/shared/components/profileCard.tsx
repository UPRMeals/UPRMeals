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
  Grid,
  CardActions,
  Button,
  CardHeader,
} from "@mui/material";
import { deepPurple, amber, cyan, grey, blueGrey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useEffect, useState } from "react";
import DropdownMenu, {
  DropdownMenuOptionType,
} from "@/shared/components/DropdownMenu";
import { UserProfile } from "../../../../backend/src/user/user.dto";
import { Colors } from "@/styles/theme";

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

function getUserRole(user: UserProfile) {
  if (user.isAdmin) {
    return "Administrador";
  } else if (user.isStaff) {
    return "Empleado";
  } else {
    return "Cliente";
  }
}

const ProfileCard = ({
  user,
  handleLogout,
  dropdownOptions,
}: {
  user: UserProfile;
  handleLogout?: () => void;
  dropdownOptions?: DropdownMenuOptionType[];
}) => {
  const [letterColor, setLetterColor] = useState<string>();
  let profileTitle = "Profile";
  const isStaffPortal = window.location.pathname.includes("staff");
  if (isStaffPortal) {
    profileTitle = getUserRole(user);
  }

  const notes =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  function pickIconColor() {
    const randNumber = Math.floor(Math.random() * accountIconColors.length);

    return accountIconColors[randNumber];
  }

  useEffect(() => {
    const color = pickIconColor();
    setLetterColor(color);
  }, []);

  return (
    <Card
      sx={{
        minWidth: "70%",
        backgroundColor: "#f8f8fc",
        border: 0,
        boxShadow: "1px 2px 7px 1px " + blueGrey[100] + "99",
      }}
    >
      <CardHeader
        title={
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
              color: "white",
            }}
          >
            {profileTitle}
          </Typography>
        }
        sx={{
          backgroundColor: Colors.Teal + "bb",
          textAlign: "center",
          px: 0,
          py: 0.8,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      ></CardHeader>
      <CardContent
        sx={{
          backgroundColor: "whitesmoke",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
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
                  {user?.firstName?.charAt(0).toUpperCase()}
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
                      text={user.firstName + " " + user.lastName}
                    />
                    <IconDetailsRow icon={<EmailIcon />} text={user.email} />
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
                {dropdownOptions && dropdownOptions.length !== 0 ? (
                  <DropdownMenu menuItems={dropdownOptions} />
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
            <Divider sx={{ display: { xs: "block", md: "none" }, mt: 3 }} />
            <Stack mt={3}>
              <Box display="flex" flexDirection="row" alignItems={"center"}>
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
        {handleLogout ? (
          <CardActions>
            <Button variant="contained" onClick={handleLogout}>
              Log Out
            </Button>
          </CardActions>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
