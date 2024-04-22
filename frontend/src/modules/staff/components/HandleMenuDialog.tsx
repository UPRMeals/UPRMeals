import { Stack } from "@mui/material";
import BaseDialog from "../../../shared/components/baseDialog";
import { useMenuService } from "../../../shared/hooks/useMenuService";
import TextInput from "../../../shared/inputs/TextInput";
import { useFormik } from "formik";
import { Schema } from "yup";
import * as yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import toast from "react-hot-toast";
import { UpdateMenuInput } from "../../../../../backend/src/menu/menu.dto";

export interface MenuFormType {
  name: string;
  date: string;
  description?: string | null;
}

const menuValidationSchema: Schema<MenuFormType> = yup.object().shape({
  name: yup.string().required("Name is required."),
  date: yup.string().required("Date is required."),
  description: yup.string().notRequired(),
});

export default function HandleMenuDialog({
  open,
  handleClose,
  existingMenu,
}: {
  open: boolean;
  handleClose: () => void;
  existingMenu?: UpdateMenuInput & { id: number };
}) {
  const { createMenu, updateMenu } = useMenuService();

  const initialDateValue = existingMenu?.date
    ? new Date(existingMenu?.date).toISOString()
    : "";

  const menuInitialValues: MenuFormType = {
    name: existingMenu?.name ?? "",
    date: initialDateValue,
    description: existingMenu?.description ?? null,
  };

  const formik = useFormik<MenuFormType>({
    initialValues: menuInitialValues,
    validationSchema: menuValidationSchema,
    onSubmit: handleCreateMenu,
  });

  async function handleCreateMenu(values: MenuFormType) {
    const updateValues = {
      ...values,
      date: new Date(values.date),
    };

    let successMessage = "Menú creado.";
    let menu;
    if (existingMenu) {
      menu = await updateMenu(existingMenu.id, updateValues);
      successMessage = "Menú editado.";
    } else {
      menu = await createMenu(updateValues);
    }

    if (menu.id) {
      toast.success(successMessage);
    }

    handleClose();
  }

  const MenuModal = (
    <Stack py={3} gap={3}>
      <TextInput formik={formik} name="name" label="Nombre" required />
      <TextInput formik={formik} name="description" label="Descripción" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Fecha del Menú"
          value={dayjs(formik.values.date)}
          onChange={(newValue) => formik.setFieldValue("date", newValue)}
          slotProps={{
            textField: {
              name: "date",
              onBlur: formik.handleBlur,
              error: !!(formik.touched.date && formik.errors.date),
              helperText:
                !!(formik.touched.date && formik.errors.date) &&
                formik.errors.date,
            },
          }}
        />
      </LocalizationProvider>
    </Stack>
  );

  const submitButtonText = existingMenu ? "Guardar" : "Crear";
  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={formik.submitForm}
      dialogTitle={`${existingMenu ? "Editar" : "Crear"} Menú`}
      dialogContent={MenuModal}
      buttonDetails={{
        primary: { text: submitButtonText, position: "right" },
        secondary: { text: "Cancelar" },
      }}
    />
  );
}
