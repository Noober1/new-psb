import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputProps,
} from "@mui/material";
import { useState } from "react";

type PasswordTextFieldProps = InputProps & {
  "data-testid": string;
  label?: string;
};

const PasswordTextField = ({
  id,
  type,
  label,
  error,
  endAdornment,
  ...props
}: PasswordTextFieldProps) => {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setshowPassword(!showPassword);

  return (
    <FormControl variant="outlined" error={error}>
      <InputLabel htmlFor="password-textfield">{label}</InputLabel>
      <OutlinedInput
        id="password-textfield"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        {...props}
      />
    </FormControl>
  );
};

export default PasswordTextField;
