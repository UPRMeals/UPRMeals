import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import BaseDialog from "../../../shared/components/baseDialog";
import TextInput from "../../../shared/inputs/TextInput";
import { useFormik } from "formik";
import { Schema } from "yup";
import * as yup from "yup";
import FastfoodIcon from "@mui/icons-material/Fastfood";

import toast from "react-hot-toast";
import { useComboService } from "@/shared/hooks/useComboService";
import { Colors } from "@/styles/theme";
import { CreateMenuCombo } from "../../../../../backend/src/combo/combo.dto";
import { Item } from "../../../../../backend/src/item/item.dto";
import { Combo } from "../../../../../backend/src/menu/menu.dto";

export interface MenuComboFormType {
  name: string;
  description?: string | null | undefined;
  price: number | null;
  proteinIds: number[];
  sideIds: number[];
  proteinCount: number | null;
  sideCount: number | null;
}

const comboValidationSchema: Schema<MenuComboFormType> = yup.object().shape({
  name: yup.string().required("El nombre es requerido."),
  description: yup.string().notRequired(),
  price: yup
    .number()
    .required("El precio es requerido.")
    .moreThan(0, "El precio no puede ser negativo."),
  sideIds: yup
    .array()
    .of(yup.number().required())
    .min(
      yup.ref("sideCount"),
      ({ min }) => `Debe añadir al menos ${min ?? 1} proteína(s).`
    )
    .required("Debe añadir al menos un acompañante."),
  proteinIds: yup
    .array()
    .of(yup.number().required())
    .min(
      yup.ref("proteinCount"),
      ({ min }) => `Debe añadir al menos ${min ?? 1} proteína(s).`
    )
    .required("Debe añadir al menos una proteína."),
  proteinCount: yup
    .number()
    .required("La cantidad de proteinas es requerida.")
    .moreThan(0, "La cantidad de proteinas no puede ser negativa.")
    .integer("La cantidad de proteinas debe ser un numero entero."),
  sideCount: yup
    .number()
    .required("La cantidad de acompañantes es requerida.")
    .moreThan(0, "La cantidad de acompañantes no puede ser negativa.")
    .integer("La cantidad de acompañantes debe ser un numero entero."),
});

export default function HandleComboDialog({
  open,
  handleClose,
  menuId,
  menuProteins,
  menuSides,
  existingCombo,
}: {
  open: boolean;
  handleClose: () => void;
  menuId: number;
  menuProteins: Item[];
  menuSides: Item[];
  existingCombo?: Combo;
}) {
  const { createCombo } = useComboService();

  let proteinIds: number[] = [];
  let sideIds: number[] = [];
  if (existingCombo) {
    proteinIds = existingCombo.proteins.flatMap((protein) => {
      return protein.id;
    });
    sideIds = existingCombo.sides.flatMap((side) => {
      return side.id;
    });
  }

  const comboInitialValues: MenuComboFormType = {
    name: existingCombo?.name ?? "",
    description: existingCombo?.description ?? null,
    price: existingCombo?.price ?? null,
    proteinIds,
    sideIds,
    proteinCount: existingCombo?.proteinCount ?? null,
    sideCount: existingCombo?.sideCount ?? null,
  };

  const formik = useFormik<MenuComboFormType>({
    initialValues: comboInitialValues,
    validationSchema: comboValidationSchema,
    onSubmit: handleCreateMenu,
  });

  async function handleCreateMenu(values: MenuComboFormType) {
    const {
      name,
      description,
      price,
      proteinCount,
      sideCount,
      sideIds,
      proteinIds,
    } = values;

    if (!sideCount || !proteinCount || !price) return; // TODO

    const comboData: CreateMenuCombo = {
      name,
      sideCount,
      proteinCount,
      menuId,
      description: description ?? "",
      price,
    };

    const itemIds = [...sideIds, ...proteinIds];
    const comboRes = await createCombo(comboData, itemIds);
    if (comboRes.id) {
      toast.success("Combo creado.");
    }
    handleClose();
  }

  function proteinOnChange(itemId: number) {
    let selectedProteins = Array.from(formik.values.proteinIds);

    if (selectedProteins.includes(itemId)) {
      selectedProteins = selectedProteins.filter(
        (proteinId) => proteinId !== itemId
      );
    } else {
      selectedProteins.push(itemId);
    }

    formik.setFieldValue("proteinIds", selectedProteins);
  }

  function sideOnChange(itemId: number) {
    let selectedSides = Array.from(formik.values.sideIds);

    if (selectedSides.includes(itemId)) {
      selectedSides = selectedSides.filter((proteinId) => proteinId !== itemId);
    } else {
      selectedSides.push(itemId);
    }

    formik.setFieldValue("sideIds", selectedSides);
  }

  const MenuModal = (
    <Stack py={3} gap={3} mb={2}>
      <Stack width="100%" gap={2}>
        <Stack direction="row" justifyContent={"space-between"}>
          <TextInput
            variant="filled"
            formik={formik}
            name="name"
            label="Nombre"
            required
            restProps={{ sx: { width: "75%" } }}
          />
          <TextInput
            variant="filled"
            formik={formik}
            name="price"
            label="Precio"
            type="number"
            required
            restProps={{ sx: { width: "20%" } }}
          />
        </Stack>

        <TextInput
          variant="filled"
          formik={formik}
          name="description"
          label="Descripción"
        />

        <Stack
          width={"100%"}
          direction="row"
          justifyContent={"space-between"}
          alignItems="end"
        >
          <Box>
            <Typography>
              ¿Cuantas <b>proteinas</b> puede escoger el cliente?
            </Typography>
            {formik.touched.proteinCount &&
              formik.errors.proteinCount &&
              formik.errors.proteinCount && (
                <Typography color="error" variant="caption">
                  {formik.errors.proteinCount}
                </Typography>
              )}
          </Box>
          <Box width="9%">
            <TextInput
              variant="standard"
              formik={formik}
              name="proteinCount"
              label=""
              type="number"
              required
              restProps={{
                sx: {
                  input: { textAlign: "center" },
                },
                helperText: "",
              }}
            />
          </Box>
        </Stack>
        <Stack
          width={"100%"}
          direction="row"
          justifyContent={"space-between"}
          alignItems="end"
        >
          <Box>
            <Typography>
              ¿Cuantos <b>acompañantes</b> puede escoger el cliente?
            </Typography>
            {formik.touched.sideCount &&
              formik.errors.sideCount &&
              formik.errors.sideCount && (
                <Typography color="error" variant="caption">
                  {formik.errors.sideCount}
                </Typography>
              )}
          </Box>
          <Box width="9%">
            <TextInput
              variant="standard"
              formik={formik}
              name="sideCount"
              label=""
              type="number"
              required
              restProps={{
                sx: {
                  input: { textAlign: "center" },
                },
                helperText: "",
              }}
            />
          </Box>
        </Stack>
      </Stack>
      <Divider />

      <Stack gap={1}>
        <Stack>
          <Typography variant="h5" fontWeight={600}>
            Proteinas
          </Typography>
          {formik.touched.proteinIds && formik.errors.proteinIds && (
            <Typography variant="caption" sx={{ color: Colors.Red }}>
              *{formik.errors.proteinIds}
            </Typography>
          )}
        </Stack>

        {menuProteins?.length > 0 && (
          <FormGroup sx={{ ml: 1.5 }}>
            {menuProteins?.map((protein, index) => {
              const selectedProteins = Array.from(formik.values.proteinIds);

              return (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        key={protein.id}
                        checked={selectedProteins.includes(protein.id)}
                        onChange={() => proteinOnChange(protein.id)}
                      />
                    }
                    label={protein.name}
                  />
                  <Divider />
                </>
              );
            })}
          </FormGroup>
        )}
      </Stack>
      <Stack gap={1}>
        <Stack>
          <Typography variant="h5" fontWeight={600}>
            Acompañantes
          </Typography>
          {formik.touched.sideIds && formik.errors.sideIds && (
            <Typography variant="caption" sx={{ color: Colors.Red }}>
              *{formik.errors.sideIds}
            </Typography>
          )}
        </Stack>
        {menuSides?.length > 0 && (
          <FormGroup sx={{ ml: 1.5 }}>
            {menuSides?.map((side, index) => {
              const selectedSides = Array.from(formik.values.sideIds);
              return (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        key={side.id}
                        checked={selectedSides.includes(side.id)}
                        onChange={() => sideOnChange(side.id)}
                      />
                    }
                    label={side.name}
                  />
                  <Divider />
                </>
              );
            })}
          </FormGroup>
        )}
      </Stack>
    </Stack>
  );

  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={formik.submitForm}
      dialogTitle={
        <Stack direction="row" gap={1}>
          <FastfoodIcon sx={{ fontSize: 32 }} />
          <Typography variant="h4" fontWeight={500}>
            Añadir Combo
          </Typography>
        </Stack>
      }
      dialogContent={MenuModal}
      buttonDetails={{
        primary: { text: "Crear", position: "right" },
        secondary: { text: "Cancelar" },
      }}
    />
  );
}
