import {
  Box,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  Table,
  ButtonBase,
  Chip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DropdownMenu, {
  DropdownMenuOptionType,
} from "../../../shared/components/DropdownMenu";
import { useUserService } from "../../../shared/hooks/useUserService";
import { UserProfile } from "../../../../../backend/src/user/user.dto";
import SetEmployeeDialog from "@/modules/staff/components/SetEmployeeDialog";
import FlagCustomerDialog from "@/modules/staff/components/FlagCustomerDialog";
import toast from "react-hot-toast";

export default function CustomerProfilesPage() {
  const { getCustomerProfiles, unflagCustomer } = useUserService();
  const [openSuspendCustomerDialog, setOpenSuspendCustomerDialog] =
    useState(false);
  const [openSetEmployeeDialog, setOpenSetEmployeeDialog] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number>();
  const [allCustomers, setAllCustomers] = useState<UserProfile[] | null>();
  const router = useRouter();

  useEffect(() => {
    const getCustomers = async () => {
      const customerProfiles = await getCustomerProfiles();
      setAllCustomers(customerProfiles);
    };

    if (!allCustomers) {
      getCustomers();
    }
  }, [getCustomerProfiles, allCustomers]);

  const tableHeaders = ["Nombre", "Email", "", "", ""];

  async function handleRemovingCustomerFlag(customerId: number) {
    if (!customerId) {
      toast.error("No se pudo levantar la suspensión.");
      return;
    }
    const unflaggedUser = await unflagCustomer(customerId);
    setAllCustomers(null);
    if (unflaggedUser.id && !unflaggedUser.isFlagged) {
      toast.success("Suspensión removida exitosamente.");
    }
  }

  function handleMenuOptionsClick(
    selectedOption: "suspendCustomer" | "setEmployee" | "removeSuspension",
    customerId: number
  ) {
    setSelectedCustomerId(customerId);
    switch (selectedOption) {
      case "suspendCustomer":
        setOpenSuspendCustomerDialog(true);
        break;
      case "removeSuspension":
        handleRemovingCustomerFlag(customerId);
        break;
      case "setEmployee":
        setOpenSetEmployeeDialog(true);
        break;
    }
  }

  const Row = ({ customer }: { customer: UserProfile }) => {
    const rand = Math.random(); // TODO

    const dropdownMenuOptions: DropdownMenuOptionType[] = [
      {
        title: "Marcar como Empleado",
        onClick: () => handleMenuOptionsClick("setEmployee", customer.id),
      },
    ];

    if (customer.isFlagged) {
      dropdownMenuOptions.push({
        title: "Remover Suspensión",
        onClick: () => handleMenuOptionsClick("removeSuspension", customer.id),
        color: "error.main",
      });
    } else if (!customer.isFlagged) {
      dropdownMenuOptions.push({
        title: "Suspender Cliente",
        onClick: () => handleMenuOptionsClick("suspendCustomer", customer.id),
        color: "error.main",
      });
    }

    return (
      <>
        <TableRow
          key={customer.firstName}
          sx={{
            "& > *": {
              borderBottom: "unset",
            },
          }}
        >
          <TableCell sx={{ fontWeight: 600 }}>
            {customer.firstName} {customer.lastName}
          </TableCell>
          <TableCell>{customer.email}</TableCell>
          <TableCell>
            {customer.isFlagged ? (
              <Chip
                label={"Suspendido"}
                sx={{
                  backgroundColor: "error.main",
                  color: "white",
                }}
              />
            ) : (
              <></>
            )}
          </TableCell>
          <TableCell>
            <ButtonBase
              onClick={() => {
                router.push(`clients/${customer.id}/`);
              }}
              sx={{
                fontWeight: 700,
                fontFamily: "Poppins",
                fontSize: 16,
                textDecoration: "underline",
                color: "info.main",
              }}
            >
              Acceder Perfil
            </ButtonBase>
          </TableCell>
          <TableCell sx={{ width: 4 }}>
            <DropdownMenu menuItems={dropdownMenuOptions} />
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
              {allCustomers && allCustomers?.length > 0 ? (
                allCustomers.map((customer: UserProfile) => (
                  <Row key={customer.id} customer={customer} />
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {selectedCustomerId ? (
        <>
          <SetEmployeeDialog
            open={openSetEmployeeDialog}
            handleClose={async () => {
              setOpenSetEmployeeDialog(false);
              setAllCustomers(await getCustomerProfiles());
            }}
            userId={selectedCustomerId}
          />
          <FlagCustomerDialog
            open={openSuspendCustomerDialog}
            handleClose={async () => {
              setOpenSuspendCustomerDialog(false);
              setAllCustomers(await getCustomerProfiles());
            }}
            userId={selectedCustomerId}
          />
        </>
      ) : null}
    </Box>
  );
}
