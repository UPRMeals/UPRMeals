import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Combo } from "../../../../../../backend/src/menu/menu.dto";
import { Colors } from "@/styles/theme";

const ComboCard = ({ combo }: { combo: Combo }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: 1,
        width: { md: "100%", lg: "30%" },
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h4" fontWeight={500}>
            {combo.name}
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            ${combo.price}
          </Typography>
        </Stack>
        <Typography variant="caption">{combo.description}</Typography>

        <Typography variant="h5" fontWeight={500} mt={3}>
          Proteinas ({combo.proteinCount}):
        </Typography>
        <Stack direction="row" spacing={1} mt={1} useFlexGap flexWrap="wrap">
          {combo.proteins.map((protein, index) => (
            <Chip
              key={index}
              sx={{
                backgroundColor: Colors.OrangeSunset + "33",
                fontWeight: 600,
              }}
              label={protein.name}
            />
          ))}
        </Stack>
        <Typography variant="h5" fontWeight={500} mt={3}>
          Acompañantes ({combo.sideCount}):
        </Typography>
        <Stack direction="row" spacing={1} mt={1} useFlexGap flexWrap="wrap">
          {combo.sides.map((side, index) => (
            <Chip
              key={index}
              sx={{
                backgroundColor: Colors.Teal + "33",
                fontWeight: 600,
              }}
              label={side.name}
            />
          ))}
        </Stack>
      </CardContent>
      <CardActions sx={{ alignSelf: "center", width: "100%" }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            borderRadius: 5,
            backgroundColor: Colors.ColegioGreen + "dd",
            color: "white",
            ":hover": {
              backgroundColor: Colors.ColegioGreen,
            },
          }}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ComboCard;
