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
} from "@mui/material";
import {
  deepPurple,
  amber,
  lime,
  lightGreen,
  cyan,
  grey,
} from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PetsIcon from "@mui/icons-material/Pets";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const accountIconColors = [
  deepPurple[200],
  deepPurple[300],
  lightGreen[300],
  lime[400],
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

  return (
    <Box mt={15} pb={10} px={5} justifyContent="center" display="flex">
      <Card sx={{ minWidth: "70%" }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent={{ xs: "center", md: "start" }}
            p={{ md: 2 }}
          >
            <Stack>
              <Stack direction={{ xs: "column", md: "row" }}>
                <Box alignSelf={{ xs: "center" }}>
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
                </Box>
                <Divider
                  flexItem
                  orientation="vertical"
                  sx={{ display: { xs: "none", md: "block" }, mx: 4 }}
                />
                <Stack gap={3} alignSelf="center" mt={{ xs: 3, md: 0 }}>
                  <IconDetailsRow icon={<PersonIcon />} text={name} />
                  <IconDetailsRow icon={<EmailIcon />} text={email} />
                  <IconDetailsRow
                    icon={<PetsIcon />}
                    text={formatStudentId(studentId)}
                  />
                </Stack>
              </Stack>
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
        </CardContent>
      </Card>
    </Box>
  );
}
