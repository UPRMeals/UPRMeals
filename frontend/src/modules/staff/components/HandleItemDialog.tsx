import { Stack, Typography } from "@mui/material";
import BaseDialog from "../../../shared/components/baseDialog";
import TextInput from "../../../shared/inputs/TextInput";
import { useFormik } from "formik";
import { Schema } from "yup";
import * as yup from "yup";

import toast from "react-hot-toast";
import { useItemService } from "../../../shared/hooks/useItemService";
import { Item } from "../../../../../backend/src/item/item.dto";

export interface MenuItemFormType {
  price: number | null;
  name: string;
}

const itemValidationSchema: Schema<MenuItemFormType> = yup.object().shape({
  name: yup.string().required("El nombre es requerido."),
  price: yup
    .number()
    .required("El precio es requerido.")
    .moreThan(0, "El precio no puede ser negativo."),
});

export default function HandleItemDialog({
  open,
  handleClose,
  menuId,
  itemType,
  existingItem,
}: {
  open: boolean;
  handleClose: () => void;
  menuId: number;
  itemType: "SIDE" | "PROTEIN";
  existingItem?: Item;
}) {
  const { createItem, updateItem } = useItemService();
  const itemText = itemType === "SIDE" ? "Acompañante" : "Proteina";

  const itemInitialValues: MenuItemFormType = {
    price: existingItem?.price ?? null,
    name: existingItem?.name ?? "",
  };

  const formik = useFormik<MenuItemFormType>({
    initialValues: itemInitialValues,
    validationSchema: itemValidationSchema,
    onSubmit: handleCreateMenu,
  });

  async function handleCreateMenu(values: MenuItemFormType) {
    const { name, price } = values;

    if (!price) return;

    let item;
    if (existingItem) {
      item = await updateItem({ ...existingItem, name, price });
    } else {
      item = await createItem({
        name,
        price,
        menuId: menuId,
        type: itemType,
        status: "available",
      });
    }

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
      <TextInput
        formik={formik}
        name="price"
        label="Precio"
        type="number"
        required
      />
    </Stack>
  );

  const continueButtonText = existingItem ? "Guardar" : "Crear";
  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={formik.submitForm}
      dialogTitle={
        <Typography variant="h4" fontWeight={500}>
          {`${existingItem ? "Editar" : "Añadir"} ${itemText}`}
        </Typography>
      }
      dialogContent={MenuModal}
      buttonDetails={{
        primary: { text: continueButtonText, position: "right" },
        secondary: { text: "Cancelar" },
      }}
    />
  );
}
