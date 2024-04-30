import {
  Box,
  CardContent,
  Card,
  Typography,
  Stack,
  Divider,
  Avatar,
  Grid,
  CardHeader,
} from "@mui/material";
import {
  deepPurple,
  amber,
  cyan,
  blueGrey,
  lightGreen,
} from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

import { useEffect, useState } from "react";
import DropdownMenu, {
  DropdownMenuOptionType,
} from "@/shared/components/DropdownMenu";
import { UserProfile } from "../../../../backend/src/user/user.dto";
import { Colors } from "@/styles/theme";

type UserRoles = "Administrador" | "Empleado" | "Cliente";

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

const titleColors = {
  Administrador: {
    color: lightGreen[700],
  },
  Empleado: {
    color: "#ab003cee",
  },
  Cliente: {
    color: "#00695fee",
  },
};

function getUserRole(user: UserProfile): UserRoles {
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
  dropdownOptions,
  isStaffProfile = false,
}: {
  user: UserProfile;
  dropdownOptions?: DropdownMenuOptionType[];
  isStaffProfile?: boolean;
}) => {
  const [letterColor, setLetterColor] = useState<string>();

  let profileTitle = isStaffProfile ? "Perfil" : "Profile";
  let titleColor = Colors.Teal + "bb";

  const isStaffPortal = window.location.pathname.includes("staff");

  if (isStaffPortal && !isStaffProfile) {
    const userRole = getUserRole(user);
    profileTitle = userRole;
    titleColor = titleColors[userRole].color;
  }

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
          backgroundColor: titleColor,
          textAlign: "center",
          px: 0,
          py: 0.8,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      />
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
          <Grid container>
            <Grid item order={{ xs: 1, md: 1 }} xs={10} md={2.5} lg={3}>
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
                  sx={{ display: { xs: "none", md: "block" }, mx: 8 }}
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
              lg={1}
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
