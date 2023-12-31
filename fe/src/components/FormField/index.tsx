import Input from "components/Input";

// Declaring props types for FormField
type Props = {
  label?: string;
  [key: string]: any;
};

function FormField({ label, ...rest }: Props): JSX.Element {
  return (
    <Input
      variant="standard"
      label={label}
      fullWidth
      InputLabelProps={{ shrink: true }}
      {...rest}
    />
  );
}

// Declaring default props for FormField
FormField.defaultProps = {
  label: " ",
};

export default FormField;
