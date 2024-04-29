import BaseDialog from "@/shared/components/baseDialog";
import { Combo } from "../../../../../../backend/src/menu/menu.dto";
import { Item } from "../../../../../../backend/src/item/item.dto";
import {
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useCartContext } from "@/shared/providers/CartProvider";
import { v4 as uuidv4 } from "uuid";

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
  const { addCombo } = useCartContext();

  const [selectedProteins, setSelectedProteins] = useState<Item[]>([]);
  const [selectedSides, setSelectedSides] = useState<Item[]>([]);

  const handleClose = () => {
    setSelectedProteins([]);
    setSelectedSides([]);
    onClose();
  };

  const handleSubmit = () => {
    addCombo({ ...combo, uId: uuidv4(), selectedProteins, selectedSides });
    setSelectedProteins([]);
    setSelectedSides([]);
    onSubmit();
  };

  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      dialogTitle={
        <Card
          variant="outlined"
          sx={{
            border: 0,
            padding: 2,
            backgroundColor: "#f8f8fc",
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
      dialogContent={
        <Stack mt={1}>
          <Typography variant="h5" fontWeight={500}>
            Proteins
          </Typography>
          <Typography variant="caption">
            Choose up to {combo.proteinCount}
          </Typography>
          <Divider />
          <FormGroup sx={{ ml: 1.5, mb: 2 }}>
            {combo.proteins.map((protein) => {
              return (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        key={protein.id}
                        disabled={
                          selectedProteins.length >= combo.proteinCount &&
                          !selectedProteins.some((p) => protein.id == p.id)
                        }
                        checked={selectedProteins.some(
                          (p) => protein.id == p.id
                        )}
                        onChange={(value) =>
                          setSelectedProteins(
                            selectedProteins.some((p) => protein.id == p.id)
                              ? selectedProteins.filter(
                                  (p) => protein.id !== p.id
                                )
                              : [...selectedProteins, protein]
                          )
                        }
                      />
                    }
                    label={protein.name}
                  />
                  <Divider />
                </>
              );
            })}
          </FormGroup>
          <Typography variant="h5" fontWeight={500}>
            Sides
          </Typography>
          <Typography variant="caption">
            Choose up to {combo.sideCount}
          </Typography>
          <Divider />
          <FormGroup sx={{ ml: 1.5 }}>
            {combo.sides.map((side, index) => {
              return (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={
                          selectedSides.length >= combo.sideCount &&
                          !selectedSides.some((s) => side.id == s.id)
                        }
                        key={side.id}
                        checked={selectedSides.some((s) => side.id == s.id)}
                        onChange={() =>
                          setSelectedSides(
                            selectedSides.some((s) => side.id == s.id)
                              ? selectedSides.filter((s) => side.id !== s.id)
                              : [...selectedSides, side]
                          )
                        }
                      />
                    }
                    label={side.name}
                  />
                  <Divider />
                </>
              );
            })}
          </FormGroup>
        </Stack>
      }
      buttonDetails={{
        primary: {
          text: "Add to Cart",
          position: "right",
          disabled:
            (selectedProteins.length == 0 && selectedSides.length == 0) ||
            (selectedProteins.length > combo.proteinCount &&
              selectedSides.length > combo.sideCount),
        },
        secondary: { text: "Cancel" },
      }}
      otherDialogTitleProps={{
        sx: {
          padding: 0,
        },
      }}
      otherDialogActionsProps={{
        sx: { backgroundColor: "#f8f8fc" },
      }}
    />
  );
}
