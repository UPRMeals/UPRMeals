import { Stack } from "@mui/material";
import BaseDialog from "../../../shared/components/baseDialog";
import TextInput from "../../../shared/inputs/TextInput";
import { useFormik } from "formik";
import { Schema } from "yup";
import * as yup from "yup";

import toast from "react-hot-toast";
import { useItemService } from "../../../shared/hooks/useItemService";

export interface SideItemFormType {
  price: number;
  name: string;
}

const itemInitialValues: SideItemFormType = {
  price: 0,
  name: "",
};

const itemValidationSchema: Schema<SideItemFormType> = yup.object().shape({
  name: yup.string().required("Name is required."),
  price: yup.number().required("Price is required."),
});

export default function AddItemDialog({
  open,
  handleClose,
  menuId,
  itemType,
}: {
  open: boolean;
  handleClose: () => void;
  menuId: number;
  itemType: "SIDE" | "PROTEIN";
}) {
  const { createItem } = useItemService();
  const itemText = itemType === "SIDE" ? "Acompañante" : "Proteina";

  const formik = useFormik<SideItemFormType>({
    initialValues: itemInitialValues,
    validationSchema: itemValidationSchema,
    onSubmit: handleCreateMenu,
  });

  async function handleCreateMenu(values: SideItemFormType) {
    const item = await createItem({
      ...values,
      menuId: menuId,
      type: itemType,
      status: "available",
    });
    if (item.id) {
      const successMessage = `${itemText} ${
        itemType === "SIDE" ? "creado." : "creada."
      }  `;
      toast.success(successMessage);
    }

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
      dialogTitle={`Añadir ${itemText}`}
      dialogContent={MenuModal}
      buttonDetails={{
        primary: { text: "Crear", position: "right" },
        secondary: { text: "Cancelar" },
      }}
    />
  );
}
