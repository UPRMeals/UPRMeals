import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Combo } from "../../../../../../backend/src/menu/menu.dto";

import AddIcon from "@mui/icons-material/Add";

const ComboCard = ({ combo }: { combo: Combo }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: 1,
        width: "100%",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: 0,
        boxShadow: 6,
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
          {combo.proteins.map((protein) => (
            <Chip sx={{ backgroundColor: "#C7421A33" }} label={protein.name} />
          ))}
        </Stack>
        <Typography variant="h5" fontWeight={500} mt={3}>
          Acompañantes ({combo.sideCount}):
        </Typography>
        <Stack direction="row" spacing={1} mt={1} useFlexGap flexWrap="wrap">
          {combo.sides.map((side) => (
            <Chip sx={{ backgroundColor: "#087F8C33" }} label={side.name} />
          ))}
        </Stack>
      </CardContent>
      <CardActions sx={{ alignSelf: "center", width: "100%" }}>
        <Button fullWidth variant="contained" sx={{ borderRadius: 5 }}>
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ComboCard;
