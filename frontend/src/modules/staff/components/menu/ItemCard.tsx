import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Item } from "../../../../../../backend/src/item/item.dto";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Colors } from "@/styles/theme";
import { useItemService } from "@/shared/hooks/useItemService";
import toast from "react-hot-toast";

export const ItemCard = ({
  item,
  handleEdit,
}: {
  item: Item;
  handleEdit: () => void;
}) => {
  const { deleteItem } = useItemService();

  async function handleDelete() {
    const res = await deleteItem(item);
    if ("id" in res && res.id) {
      const message =
        res.type === "PROTEIN" ? "Proteina borrada" : "Acompañante borrado";
      toast.success(message);
    } else if ("error" in res) {
      toast.error(res.error);
    }
  }

  return (
    <Card
      variant="outlined"
      sx={{
        width: { sm: "100%", md: "20%" },
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Stack>
          <Typography variant="h6" fontWeight={600}>
            {item.name}
          </Typography>
          <Typography variant="h6" fontWeight={400}>
            ${item.price}
          </Typography>
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
