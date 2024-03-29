import {
  Box,
  Button,
  CardContent,
  Card,
  Typography,
  Stack,
  Chip,
  CardHeader,
} from "@mui/material";
import { useRouter } from "next/router";

const InfoCards = ({
  title,
  content,
  price,
}: {
  title: string;
  content: string;
  price: number;
}) => {
  return (
    <Card variant="outlined">
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h6">${price}</Typography>
        </Stack>
      </Box>

      <CardContent>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </Card>
  );
};

export default function MenuPage() {
  const router = useRouter();
  const combos = [
    {
      title: "Combo Internacional 1",
      content: `This combo has the following things inside of it, lorem ipsum,
    lorem ipsum.`,
      price: 4.99,
    },
    {
      title: "Combo Internacional 2",
      content: `This combo has the following things inside of it, lorem ipsum,
    lorem ipsum.`,
      price: 4.99,
    },
    {
      title: "Combo Internacional 3",
      content: `This combo has the following things inside of it, lorem ipsum,
    lorem ipsum.`,
      price: 4.99,
    },
  ];

  const sandwiches = [
    {
      title: "Jamon y Queso",
      content: `This combo has the following things inside of it, lorem ipsum,
    lorem ipsum.`,
      price: 4.99,
    },
    {
      title: "Medianoche",
      content: `This combo has the following things inside of it, lorem ipsum,
    lorem ipsum.`,
      price: 4.99,
    },
    {
      title: "Steak and Cheese",
      content: `This combo has the following things inside of it, lorem ipsum,
    lorem ipsum.`,
      price: 4.99,
    },
  ];

  const sides = [
    "Arroz con habichuelas 1",
    "Papas majadas 1",
    "tostones 1",
    "ensalada de papa 1",
    "Arroz con habichuelas 2",
    "Papas majadas 2",
    "tostones 2",
    "ensalada de papa 2",
    "Arroz con habichuelas 3",
    "Papas majadas 3",
    "tostones 3",
    "ensalada de papa 3",
  ];

  return (
    <Box mt={8} pt={5} pb={10} px={5}>
      <Stack rowGap={4}>
        <Box justifyContent={"center"} display="flex">
          <Typography variant="h2">Menu de Hoy</Typography>
        </Box>
        <Box justifyContent={"center"} display="flex">
          <Button
            variant="contained"
            onClick={() => router.push("/customers/order")}
          >
            Order Now
          </Button>
        </Box>
      </Stack>

      <Box pt={4}>
        <Typography variant="h3">Combinaciones</Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={3}
          paddingX={{ xs: 2, md: 5 }}
          justifyContent="center"
          pt={2}
        >
          {combos.map((combo) => (
            <InfoCards
              key={combo.title}
              title={combo.title}
              content={combo.content}
              price={combo.price}
            />
          ))}
        </Stack>
      </Box>
      <Box pt={4}>
        <Typography variant="h3">Acompañantes</Typography>
        <Stack
          flexDirection="row"
          display="flex"
          sx={{ flexWrap: "wrap" }}
          gap={2}
          pt={2}
        >
          {sides.map((side) => (
            <Chip label={side} key={side} />
          ))}
        </Stack>
      </Box>
      <Box pt={4}>
        <Typography variant="h3">Sandwiches</Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={3}
          paddingX={{ xs: 2, md: 5 }}
          justifyContent="center"
          pt={2}
        >
          {sandwiches.map((sandwich) => (
            <InfoCards
              key={sandwich.title}
              title={sandwich.title}
              content={sandwich.content}
              price={sandwich.price}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
