import { FormikProps, getIn } from "formik";
import TextField, {
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField";

interface TextInputProps {
  formik: FormikProps<any>;
  name: string;
  label: string;
  required?: boolean;
  variant?: TextFieldVariants;
  type?: string;
  restProps?: TextFieldProps;
}

const TextInput = ({
  formik,
  name,
  label,
  required = false,
  variant = "outlined",
  type = "text",
  restProps,
}: TextInputProps) => {
  const touched = Boolean(getIn(formik.touched, name));
  const error = getIn(formik.errors, name);
  const value = getIn(formik.values, name);

  return (
    <TextField
      id={name}
      name={name}
      value={value}
      label={label}
      error={required && touched && Boolean(error)}
      helperText={required && touched && Boolean(error) && error}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      required={required}
      variant={variant}
      type={type}
      fullWidth
      {...restProps}
    />
  );
};

export default TextInput;
