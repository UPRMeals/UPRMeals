import { Stack } from "@mui/material";
import BaseDialog from "../../../shared/components/baseDialog";
import TextInput from "../../../shared/inputs/TextInput";
import { useFormik } from "formik";
import { Schema } from "yup";
import * as yup from "yup";

import toast from "react-hot-toast";
import { useComboService } from "@/shared/hooks/useComboService";

export interface MenuComboFormType {
  name: string;
  description?: string | null | undefined;
  price: number;
}

const comboInitialValues: MenuComboFormType = {
  name: "",
  description: null,
  price: 0,
};

const comboValidationSchema: Schema<MenuComboFormType> = yup.object().shape({
  name: yup.string().required("Name is required."),
  description: yup.string().notRequired(),
  price: yup.number().required("Price is required."),
});

export default function AddItemDialog({
  open,
  handleClose,
  menuId,
}: {
  open: boolean;
  handleClose: () => void;
  menuId: number;
}) {
  const { createCombo } = useComboService();

  const formik = useFormik<MenuComboFormType>({
    initialValues: comboInitialValues,
    validationSchema: comboValidationSchema,
    onSubmit: handleCreateMenu,
  });

  async function handleCreateMenu(values: MenuComboFormType) {
    handleClose();
  }

  const MenuModal = (
    <Stack py={3} gap={3}>
      <TextInput formik={formik} name="name" label="Nombre" required />
      <TextInput formik={formik} name="description" label="Descripción" />
      <TextInput formik={formik} name="price" label="Precio" type="number" />
    </Stack>
  );

  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={formik.submitForm}
      dialogTitle={`Añadir Combo`}
      dialogContent={MenuModal}
      buttonDetails={{
        primary: { text: "Crear", position: "right" },
        secondary: { text: "Cancelar" },
      }}
    />
  );
}
