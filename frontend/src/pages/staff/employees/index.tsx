import {
  Box,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  Table,
  ButtonBase,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DropdownMenu, {
  DropdownMenuOptionType,
} from "../../../shared/components/DropdownMenu";
import { useUserService } from "../../../shared/hooks/useUserService";
import { UserProfile } from "../../../../../backend/src/user/user.dto";
import RemoveEmployeeDialog from "../../../modules/staff/components/RemoveEmployeeDialog";
import { JWTUtils } from "../../../shared/utils/jwtUtils";

export default function CustomerProfilesPage() {
  const { getEmployeeProfiles } = useUserService();
  const [openSuspendEmployeeDialog, setOpenSuspendEmployeeDialog] =
    useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();
  const [allEmployees, setAllEmployees] = useState<UserProfile[]>();
  const [currUserId, setCurrUserId] = useState<number>();
  const router = useRouter();

  const getCurrUserId = JWTUtils.getUserId;

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("token");
      const userIdFromToken = getCurrUserId(token);

      setCurrUserId(userIdFromToken);
    };
    fetchUserId();
  }, [getCurrUserId, router]);

  useEffect(() => {
    const getEmployees = async () => {
      const employeeProfiles = await getEmployeeProfiles();
      setAllEmployees(employeeProfiles);
    };

    if (!allEmployees) {
      getEmployees();
    }
  }, [getEmployeeProfiles]);

  const tableHeaders = ["Nombre", "Email", "", ""];

  function handleMenuOptionsClick(
    selectedOption: "suspendEmployee",
    employeeId: number
  ) {
    setSelectedEmployeeId(employeeId);
    switch (selectedOption) {
      case "suspendEmployee":
        setOpenSuspendEmployeeDialog(true);
        break;
    }
  }

  const Row = ({ employee }: { employee: UserProfile }) => {
    const dropdownMenuOptions: DropdownMenuOptionType[] =
      currUserId === employee.id
        ? []
        : [
            {
              title: "Suspender Empleado",
              onClick: () =>
                handleMenuOptionsClick("suspendEmployee", employee.id),
              color: "error.main",
            },
          ];

    return (
      <>
        <TableRow
          key={employee.firstName}
          sx={{
            "& > *": {
              borderBottom: "unset",
            },
          }}
        >
          <TableCell sx={{ fontWeight: 600 }}>
            {employee.firstName} {employee.lastName}
          </TableCell>
          <TableCell>{employee.email}</TableCell>

          <TableCell>
            <ButtonBase
              onClick={() => {
                router.push(`employees/${employee.id}/`);
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
            <DropdownMenu
              menuItems={dropdownMenuOptions}
              disabled={dropdownMenuOptions.length === 0}
            />
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
              {allEmployees && allEmployees?.length > 0 ? (
                allEmployees.map((employee: UserProfile) => (
                  <Row key={employee.id} employee={employee} />
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {selectedEmployeeId ? (
        <RemoveEmployeeDialog
          open={openSuspendEmployeeDialog}
          handleClose={async () => {
            setOpenSuspendEmployeeDialog(false);
            setAllEmployees(await getEmployeeProfiles());
          }}
          userId={selectedEmployeeId}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}
