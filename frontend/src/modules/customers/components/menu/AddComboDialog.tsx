import BaseDialog from "@/shared/components/baseDialog";
import { Combo } from "../../../../../../backend/src/menu/menu.dto";
import {
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

const AddComboDialogContent = ({ combo }: { combo: Combo }) => {
  return (
    <Stack mt={2}>
      <Typography variant="h5" fontWeight={500}>
        Proteins
      </Typography>
      <Typography variant="caption">
        Choose up to {combo.proteinCount}
      </Typography>
      <FormGroup sx={{ ml: 1.5 }}>
        {combo.proteins.map((protein, index) => {
          return (
            <>
              {index !== 0 && <Divider />}
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={protein.name}
              />
            </>
          );
        })}
      </FormGroup>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" fontWeight={500}>
        Sides
      </Typography>
      <Typography variant="caption">Choose up to {combo.sideCount}</Typography>
      <FormGroup sx={{ ml: 1.5 }}>
        {combo.sides.map((side, index) => {
          return (
            <>
              {index !== 0 && <Divider />}
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={side.name}
              />
            </>
          );
        })}
      </FormGroup>
    </Stack>
  );
};

export default function AddComboDialog({
  open,
  onClose,
  onSubmit,
  combo,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  combo: Combo;
}) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  return (
    <BaseDialog
      open={open}
      handleClose={onClose}
      handleSubmit={onSubmit}
      dialogTitle={
        <Card
          variant="outlined"
          sx={{
            border: 0,
            padding: 2,
            backgroundColor: isMobile ? "#fbfbff" : "#f8f8fc",
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            {combo.name}
          </Typography>
          <Typography variant="body1" mb={1}>
            {combo.description}
          </Typography>
          <Typography variant="h6" fontWeight={400}>
            ${combo.price}
          </Typography>
        </Card>
      }
      dialogContent={<AddComboDialogContent combo={combo} />}
      buttonDetails={{
        primary: { text: "Add to Cart", position: "right" },
        secondary: { text: "Cancel" },
      }}
      otherDialogTitleProps={{
        sx: {
          boxShadow: isMobile ? "0px -1px 8px 0px rgba(0,0,0,0.12)" : 0,
          padding: 0,
        },
      }}
      otherDialogActionsProps={{
        sx: isMobile
          ? {
              boxShadow: "0px 1px 8px 0px rgba(0,0,0,0.12)",
              backgroundColor: "#fbfbff",
            }
          : { backgroundColor: "#f8f8fc" },
      }}
    />
  );
}
