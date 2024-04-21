import {
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Combo } from "../../../../../../backend/src/menu/menu.dto";
import { Colors } from "@/styles/theme";
import { indigo } from "@mui/material/colors";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useComboService } from "@/shared/hooks/useComboService";
import toast from "react-hot-toast";

const ComboCard = ({
  combo,
  handleEdit,
  menuId,
}: {
  combo: Combo;
  handleEdit: () => void;
  menuId: number;
}) => {
  const { deleteCombo } = useComboService();

  async function handleDelete() {
    const res = await deleteCombo({
      ...combo,
      status: "available",
      removed: false,
      menuId,
    });
    if (res.id) {
      toast.success("Combo borrado.");
    }
  }

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
          <Typography variant="h5" fontWeight={500}>
            {combo.name}
          </Typography>
          <Typography variant="h6" fontWeight={400}>
            ${combo.price}
          </Typography>
        </Stack>
        <Typography variant="body1" fontWeight={300}>
          {combo.description}
        </Typography>
        <Typography variant="h6" fontWeight={400} mt={3}>
          Proteinas (Incluye {combo.proteinCount}):
        </Typography>
        <Stack direction="row" spacing={1} mt={1} useFlexGap flexWrap="wrap">
          {combo.proteins.map((protein, index) => (
            <Chip
              key={index}
              sx={{
                backgroundColor: indigo[400] + "33",
                fontWeight: 600,
              }}
              label={protein.name}
            />
          ))}
        </Stack>
        <Typography variant="h6" fontWeight={400} mt={3}>
          Acompañantes (Incluye {combo.sideCount}):
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
      <CardActions sx={{ justifyContent: "right" }}>
        <IconButton onClick={handleDelete}>
          <DeleteOutlineOutlinedIcon
            sx={{ color: Colors.Red + "cc", fontSize: 20 }}
          />
        </IconButton>
        <IconButton onClick={handleEdit}>
          <EditOutlinedIcon sx={{ color: Colors.Charcoal, fontSize: 20 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ComboCard;
