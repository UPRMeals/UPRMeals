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

const ComboCards = ({ title, content }: { title: string; content: string }) => {
  return (
    <Card variant="outlined">
      <CardHeader
        title={title}
        titleTypographyProps={{ color: "secondary.main" }}
      />
      <CardContent>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </Card>
  );
};

export default function MenuPage() {
  const combos = [
    {
      title: "Combo Internacional",
      content: `This combo has the following things inside of it, lorem ipsum,
    lorem ipsum.`,
    },
    {
      title: "Combo Internacional",
      content: `This combo has the following things inside of it, lorem ipsum,
    lorem ipsum.`,
    },
    {
      title: "Combo Internacional",
      content: `This combo has the following things inside of it, lorem ipsum,
    lorem ipsum.`,
    },
  ];

  const sandwiches = [
    {
      title: "Jamon y Queso",
      content: `This combo has the following things inside of it, lorem ipsum,
    lorem ipsum.`,
    },
    {
      title: "Medianoche",
      content: `This combo has the following things inside of it, lorem ipsum,
    lorem ipsum.`,
    },
    {
      title: "Steak and Cheese",
      content: `This combo has the following things inside of it, lorem ipsum,
    lorem ipsum.`,
    },
  ];

  const sides = [
    "Arroz con habichuelas",
    "Papas majadas",
    "tostones",
    "ensalada de papa",
    "Arroz con habichuelas",
    "Papas majadas",
    "tostones",
    "ensalada de papa",
    "Arroz con habichuelas",
    "Papas majadas",
    "tostones",
    "ensalada de papa",
  ];

  return (
    <Box mt={8} pt={5} pb={10} px={5}>
      <Stack rowGap={4}>
        <Box justifyContent={"center"} display="flex">
          <Typography variant="h2">Menu de Hoy</Typography>
        </Box>
        <Box justifyContent={"center"} display="flex">
          <Button variant="contained">Order Now</Button>
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
            <ComboCards
              key={combo.title}
              title={combo.title}
              content={combo.content}
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
            <ComboCards
              key={sandwich.title}
              title={sandwich.title}
              content={sandwich.content}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
