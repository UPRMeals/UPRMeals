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
} from "@mui/material";
import { deepPurple, amber, cyan, grey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import { isFlaggedAccount } from "../components/navbar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";

const accountIconColors = [
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
  const name = "Tony Presidio";
  const email = "tony.presidio@upr.edu";
  const studentId = "802195678";
  const notes =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  function pickIconColor() {
    const randNumber = Math.floor(Math.random() * accountIconColors.length);

    return accountIconColors[randNumber];
  }

  function formatStudentId(studentId: string) {
    const cleanStudentId = studentId.replace(/\D/g, "");

    const formattedStudentId = cleanStudentId.replace(
      /(\d{3})(\d{2})(\d{4})/,
      "$1-$2-$3"
    );

    return formattedStudentId;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/customers");
  }

  return (
    <Box mt={15} pb={10} px={5} justifyContent="center" display="flex">
      <Stack gap={2}>
        {isFlaggedAccount && (
          <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">
            Your account has been flagged. Please visit the cafeteria to resolve
            this issue. You may resume acitivity upon the cafeteria staff member
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
                        bgcolor: pickIconColor(),
                        width: 156,
                        height: 156,
                        fontSize: 120,
                        fontFamily: "Bungee",
                      }}
                    >
                      {name.charAt(0).toUpperCase()}
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
                        <IconDetailsRow icon={<PersonIcon />} text={name} />
                        <IconDetailsRow icon={<EmailIcon />} text={email} />
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
                    <Box>
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
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
            <CardActions>
              <Button variant="contained" onClick={handleLogout}>
                Log Out
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
