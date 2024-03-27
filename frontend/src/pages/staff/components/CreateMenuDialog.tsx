import { Stack } from "@mui/material";
import BaseDialog from "../../../shared/components/baseDialog";
import { useMenuService } from "../../../shared/hooks/useMenuService";
import TextInput from "../../../shared/components/inputs/TextInput";
import { useFormik } from "formik";
import { Schema } from "yup";
import * as yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import toast from "react-hot-toast";

export interface MenuFormType {
  name: string;
  date: string;
  description?: string | null;
}

const menuInitialValues: MenuFormType = {
  name: "",
  date: "",
  description: null,
};

const menuValidationSchema: Schema<MenuFormType> = yup.object().shape({
  name: yup.string().required("Name is required."),
  date: yup.string().required("Date is required."),
  description: yup.string().notRequired(),
});

export default function MenuDialog({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const { createMenu } = useMenuService();

  const formik = useFormik<MenuFormType>({
    initialValues: menuInitialValues,
    validationSchema: menuValidationSchema,
    onSubmit: handleCreateMenu,
  });

  async function handleCreateMenu(values: MenuFormType) {
    const menu = await createMenu({ ...values, date: new Date(values.date) });

    if (menu.id) {
      toast.success("Menú creado.");
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
          value={formik.values.date}
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

  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={formik.submitForm}
      dialogTitle="Crear un Menú"
      dialogContent={MenuModal}
      buttonDetails={{
        primary: { text: "Crear", position: "right" },
        secondary: { text: "Cancelar" },
      }}
    />
  );
}
