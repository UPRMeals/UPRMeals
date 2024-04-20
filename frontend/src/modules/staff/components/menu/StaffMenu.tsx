import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { Menu } from "../../../../../../backend/src/menu/menu.dto";
import ComboCard from "./ComboCard";
import { ItemCard } from "./ItemCard";
import NoFoodIcon from "@mui/icons-material/NoFood";
import { Colors } from "@/styles/theme";
import AddIcon from "@mui/icons-material/Add";
import { indigo, lightGreen } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import AddItemDialog from "../AddItemDialog";
import AddComboDialog from "../AddComboDialog";

const MenuDetails = ({ label, value }: { label: string; value: string }) => {
  return (
    <Stack direction="row">
      <Typography variant="h6" fontWeight={600}>
        {label}:&nbsp;
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </Stack>
  );
};

const EmptyState = ({ itemType }: { itemType: string }) => {
  return (
    <Stack display="flex" alignItems={"center"} width={"100%"} py={3}>
      <NoFoodIcon sx={{ color: Colors.Teal + "bb", fontSize: 64 }} />
      <Typography fontWeight={600}>No hay {itemType}</Typography>
    </Stack>
  );
};

const MenuSection = ({
  handleOpenDialog,
  sectionTitle,
  sectionContent,
}: {
  handleOpenDialog: () => void;
  sectionTitle: string;
  sectionContent: JSX.Element | null;
}) => {
  return (
    <>
      <Stack
        direction="row"
        width="100%"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h5">{sectionTitle}</Typography>
        <Button startIcon={<AddIcon />} onClick={handleOpenDialog}>
          Añadir
        </Button>
      </Stack>
      <Divider sx={{ width: "100%" }} />

      <Stack
        direction={{ md: "column", lg: "row" }}
        width="100%"
        spacing={{ xs: 2, md: 3 }}
        useFlexGap
        flexWrap="wrap"
        mt={3}
        mb={2}
        px="2%"
      >
        {sectionContent ? (
          <>{sectionContent}</>
        ) : (
          <EmptyState itemType={sectionTitle.toLocaleLowerCase()} />
        )}
      </Stack>
    </>
  );
};

const StaffMenu = ({ menu }: { menu: Menu }) => {
  const [openAddComboDialog, setOpenAddComboDialog] = useState<boolean>(false);
  const [openAddProteinDialog, setOpenAddProteinDialog] =
    useState<boolean>(false);
  const [openAddSideDialog, setOpenAddSideDialog] = useState<boolean>(false);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="start"
      alignItems="start"
      width={"100%"}
      pb={3}
    >
      <Stack my={3} width={"100%"}>
        <Stack direction="row" width={"100%"} justifyContent={"space-between"}>
          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <Typography variant="h3" fontWeight={600}>
              {menu.name}
            </Typography>
            <Chip
              label={menu.isActive ? "Activo" : "Inactivo"}
              sx={{
                ml: 1,
                backgroundColor: menu.isActive ? lightGreen[500] : indigo[400],
                color: "white",
                fontWeight: 600,
              }}
            />
          </Stack>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Stack>
        <MenuDetails
          label="Fecha"
          value={new Date(menu.date).toLocaleDateString()}
        />
        {!!menu.description && (
          <MenuDetails label="Descripción" value={menu.description} />
        )}
      </Stack>

      <MenuSection
        handleOpenDialog={() => {
          setOpenAddProteinDialog(true);
        }}
        sectionTitle={"Proteinas"}
        sectionContent={
          menu?.proteins?.length > 0 ? (
            <>
              {menu?.proteins?.map((protein: any, index) => (
                <ItemCard key={index} item={protein} />
              ))}
            </>
          ) : null
        }
      />
      <MenuSection
        handleOpenDialog={() => setOpenAddSideDialog(true)}
        sectionTitle={"Acompañantes"}
        sectionContent={
          menu?.sides?.length > 0 ? (
            <>
              {menu?.sides?.map((protein: any, index) => (
                <ItemCard key={index} item={protein} />
              ))}
            </>
          ) : null
        }
      />

      <MenuSection
        handleOpenDialog={() => {
          setOpenAddComboDialog(true);
        }}
        sectionTitle={"Combinaciones"}
        sectionContent={
          menu?.combos?.length > 0 ? (
            <>
              {menu?.combos?.map((combo: any, index) => (
                <ComboCard key={index} combo={combo} />
              ))}
            </>
          ) : null
        }
      />

      <AddItemDialog
        open={openAddSideDialog}
        handleClose={async () => {
          setOpenAddSideDialog(false);
        }}
        menuId={menu.id}
        itemType={"SIDE"}
      />
      <AddItemDialog
        open={openAddProteinDialog}
        handleClose={async () => {
          setOpenAddProteinDialog(false);
        }}
        menuId={menu.id}
        itemType={"PROTEIN"}
      />
      <AddComboDialog
        open={openAddComboDialog}
        handleClose={async () => {
          setOpenAddComboDialog(false);
        }}
        menuId={menu.id}
        menuProteins={menu.proteins}
        menuSides={menu.sides}
      />
    </Box>
  );
};

export default StaffMenu;
