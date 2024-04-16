import {
  Box,
  Button,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  Table,
  ButtonBase,
  Chip,
  IconButton,
  Collapse,
  Typography,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import CreateMenuDialog from "../../../modules/staff/components/CreateMenuDialog";
import { useMenuService } from "../../../shared/hooks/useMenuService";
import { GetAllMenusResponse } from "../../../../../backend/src/menu/menu.dto";
import { useRouter } from "next/router";
import DropdownMenu, { MenuOptionType } from "@/shared/components/DropdownMenu";
import DeleteMenuDialog from "../../../modules/staff/components/DeleteMenuDialog";
import { lightGreen } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { indigo } from "@mui/material/colors";
import ActivateMenuDialog from "../../../modules/staff/components/ActivateMenuDialog";

export default function MenusPage() {
  const { getAllMenus } = useMenuService();
  const [openCreateMenuDialog, setOpenCreateMenuDialog] = useState(false);
  const [openDeleteMenuDialog, setOpenDeleteMenuDialog] = useState(false);
  const [openActivateMenuDialog, setOpenActivateMenuDialog] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<number>();
  const [allMenus, setAllMenus] = useState<GetAllMenusResponse[]>();
  const router = useRouter();

  useEffect(() => {
    const getMenus = async () => {
      const menus = await getAllMenus();
      setAllMenus(menus);
    };

    if (!allMenus) {
      getMenus();
    }
  }, [getAllMenus]);

  const tableHeaders = ["", "Nombre", "Fecha", "Status", "", ""];

  function handleMenuOptionsClick(
    selectedOption: "delete" | "activate",
    menuId: number
  ) {
    setSelectedMenuId(menuId);
    switch (selectedOption) {
      case "delete":
        setOpenDeleteMenuDialog(true);
        break;
      case "activate":
        setOpenActivateMenuDialog(true);
        break;
    }
  }

  const Row = ({ menu }: { menu: GetAllMenusResponse }) => {
    const [openRow, setOpenRow] = useState(false);
    const selectedGrey = "#f1f1f166";

    const dropdownMenuOptions: MenuOptionType[] = [
      {
        title: "Delete Menu",
        onClick: () => handleMenuOptionsClick("delete", menu.id),
        color: "error.main",
      },
    ];

    if (!menu.isActive) {
      dropdownMenuOptions.push({
        title: "Marcar como activo",
        onClick: () => handleMenuOptionsClick("activate", menu.id),
      });
    }

    return (
      <>
        <TableRow
          key={menu.name}
          sx={{
            "& > *": {
              borderBottom: "unset",
            },
            backgroundColor: openRow ? selectedGrey : null,
          }}
        >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenRow(!openRow)}
            >
              {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell sx={{ fontWeight: 600 }}>{menu.name}</TableCell>
          <TableCell>{new Date(menu.date).toLocaleDateString()}</TableCell>
          <TableCell>
            <Chip
              label={menu.isActive ? "Activo" : "Inactivo"}
              sx={{
                backgroundColor: menu.isActive ? lightGreen[500] : indigo[400],
                color: "white",
              }}
            />
          </TableCell>
          <TableCell>
            <ButtonBase
              onClick={() => {
                router.push(`menus/${menu.id}`); //TODO
              }}
              sx={{
                fontWeight: 700,
                fontFamily: "Poppins",
                fontSize: 16,
                textDecoration: "underline",
                color: "info.main",
              }}
            >
              Ver Menu
            </ButtonBase>
          </TableCell>
          <TableCell sx={{ width: 4 }}>
            <DropdownMenu menuItems={dropdownMenuOptions} />
          </TableCell>
        </TableRow>
        <TableRow sx={{ backgroundColor: openRow ? selectedGrey : null }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={openRow} timeout="auto" unmountOnExit>
              <Box sx={{ my: 2, pl: "10%" }} width="90%">
                {menu?.description?.length > 0 ? (
                  <Stack direction="row" pb={2} mt={-1}>
                    <Typography
                      component="div"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Descripción: &nbsp;
                    </Typography>
                    <Typography component="div" variant="body2">
                      {menu.description}
                    </Typography>
                  </Stack>
                ) : (
                  <></>
                )}

                {menu.items.length > 0 && (
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell align="right">Precio</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {menu.items.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell component="th" scope="row">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell align="right">{item.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                {menu.combos.length > 0 && (
                  <Box sx={{ pt: 4 }}>
                    <Typography sx={{ fontWeight: 600, mb: 1 }}>
                      Combinaciones:
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Nombre</TableCell>
                          <TableCell># Proteínas</TableCell>
                          <TableCell># Acompañantes</TableCell>
                          <TableCell align="right">Precio</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {menu.combos.map((combo) => (
                          <TableRow key={combo.name}>
                            <TableCell component="th" scope="row">
                              {combo.name}
                            </TableCell>
                            <TableCell>{combo.proteinCount}</TableCell>
                            <TableCell>{combo.sideCount}</TableCell>
                            <TableCell align="right">{combo.price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                )}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <Box
      mt={8}
      pt={5}
      pb={10}
      px={5}
      display="flex"
      flexDirection={"column"}
      width={"100%"}
    >
      <Box
        sx={{
          border: 1,
          borderColor: "lightgrey",
          backgroundColor: "#ffffff66",
          mt: 3,
          pt: 3,
          pb: 5,
          px: 5,
          borderRadius: 5,
          width: "80%",
          alignSelf: "center",
        }}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box display="flex" alignSelf={"flex-end"}>
          <Button
            onClick={() => {
              setOpenCreateMenuDialog(true);
            }}
            endIcon={<AddIcon fontSize="large" />}
          >
            Crear menu
          </Button>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => {
                  return (
                    <TableCell key={header} variant="head">
                      <Typography variant="h6"> {header}</Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {allMenus && allMenus?.length > 0 ? (
                allMenus.map((menu: GetAllMenusResponse) => (
                  <Row key={menu.id} menu={menu} />
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <CreateMenuDialog
        open={openCreateMenuDialog}
        handleClose={async () => {
          setOpenCreateMenuDialog(false);
          setAllMenus(await getAllMenus());
        }}
      />
      {selectedMenuId ? (
        <>
          <DeleteMenuDialog
            open={openDeleteMenuDialog}
            handleClose={async () => {
              setOpenDeleteMenuDialog(false);
              setAllMenus(await getAllMenus());
            }}
            menuId={selectedMenuId}
          />
          <ActivateMenuDialog
            open={openActivateMenuDialog}
            handleClose={async () => {
              setOpenActivateMenuDialog(false);
              setAllMenus(await getAllMenus());
            }}
            menuId={selectedMenuId}
          />
        </>
      ) : null}
    </Box>
  );
}
