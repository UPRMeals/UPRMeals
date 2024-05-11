import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { getCartLayout } from "@/shared/providers/CartProvider";
import { NextPageWithLayout } from "../../_app";
import { Colors } from "@/styles/theme";
import { blueGrey } from "@mui/material/colors";
import Link from "next/link";

const DevCard = ({
  name,
  color,
  image,
}: {
  name: string;
  color: string;
  image: "Tarzan" | "Jane";
}) => {
  return (
    <Card
      sx={{
        border: 0,
        boxShadow: "1px 2px 7px 1px " + blueGrey[100] + "99",
        height: 350,
        width: 275,
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
            {name}
          </Typography>
        }
        sx={{
          backgroundColor: color,
          textAlign: "center",
          px: 0,
          py: 0.8,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      />

      <CardContent
        sx={{
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
          backgroundColor: "whitesmoke",
        }}
      >
        <Box sx={{ position: "relative" }}>
          {image === "Tarzan" ? (
            <Image
              src="/Tarzan.png"
              alt="Tarzan"
              layout="fixed"
              objectFit="contain"
              height={313}
              width={151}
            />
          ) : (
            <Image
              src="/Jane.png"
              alt="Jane"
              layout="fixed"
              objectFit="contain"
              height={313}
              width={151}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const CustomerAboutUsPage: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Box
      mb={{ xs: 300, md: 135 }}
      height={"90vh"}
      width={"100vw"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"start"}
    >
      <Typography variant="h3" fontWeight={600} color={Colors.Charcoal} pt={4}>
        Meet the Developers
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4} gap={4} pt={4}>
        <DevCard name={"Kenneth Aponte"} color={"#087F8Cdd"} image="Tarzan" />
        <DevCard name="Isabella Garrido" color="#ab003cdd" image="Jane" />
        <DevCard name="Jorge Cruz" color="#00695fdd" image="Tarzan" />
      </Stack>
      <Stack direction="row" pt={4}>
        <Typography>Access our</Typography>
        <Link
          href={
            "https://drive.google.com/file/d/17tiFFRtY0L1R9WFuaRTsJBzHf_uFTNQb/view?usp=share_link"
          }
        >
          <Typography
            pl={1}
            sx={{
              fontWeight: 600,
              ":hover": { cursor: "pointer" },
              textDecoration: "underline",
            }}
            fontWeight={600}
            color={Colors.Teal}
          >
            Elevator Pitch
          </Typography>
        </Link>
      </Stack>
      <Stack direction="row" pt={4}>
        <Typography>Access our</Typography>
        <Link
          href={
            "https://drive.google.com/file/d/1pDhXKdrRHSe7QmNNoOa8K7_TzY4605U6/view?usp=share_link"
          }
        >
          <Typography
            pl={1}
            sx={{
              fontWeight: 600,
              ":hover": { cursor: "pointer" },
              textDecoration: "underline",
            }}
            fontWeight={600}
            color={Colors.Teal}
          >
            Final Presentation Demo
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
};

CustomerAboutUsPage.getLayout = getCartLayout;
export default CustomerAboutUsPage;
