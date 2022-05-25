import {
  Button,
  Link,
  Paper,
  PaperProps,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import ToggleLoginBoxButton from "../atoms/ToggleLoginBoxButton";

type LoginFormValues = {
  email?: string;
  password?: string;
};

const loginAuthFormValues: LoginFormValues = {
  email: "",
  password: "",
};

const loginAuthValidateHandler = (values: LoginFormValues) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = "Silahkan masukan email anda";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Format email salah";
  } else if (values.email.length > 50) {
    errors.email = "Email tidak boleh lebih dari 50 karakter";
  }

  if (!values.password) {
    errors.password = "Silahkan masukan kata sandi anda";
  } else if (values.password.length > 50 || values.password.length < 8) {
    errors.password = "Kata sandi antara 8 sampai dengan 50 karakter";
  }

  return errors;
};

const loginAuthSubmitHandler = (values: LoginFormValues, actions: any) => {
  setTimeout(() => {
    console.log({ values, actions });
    actions.setSubmitting(false);
  }, 400);
};

export type LoginBoxProps = PaperProps & {
  showCloseButton?: boolean;
};

const LoginBox = ({ showCloseButton, elevation }: LoginBoxProps) => {
  return (
    <Paper
      className="w-full p-1 login-box relative"
      data-testid="login-box"
      elevation={elevation}
    >
      <div className="grid grid-cols-1">
        {showCloseButton && (
          <div className="absolute right-2 top-2">
            <ToggleLoginBoxButton buttonType="icon" closeIcon />
          </div>
        )}
        <div className="h-28 text-center flex-1 flex items-center justify-center login-logo mt-2">
          <img src="/images/favicon.png" className="h-full" alt="Logo" />
        </div>
        <Typography align="center" variant="h5" fontWeight="bold">
          Log in
        </Typography>
        <div id="login-box-content" className="m-3">
          <Formik
            initialValues={loginAuthFormValues}
            validate={loginAuthValidateHandler}
            onSubmit={loginAuthSubmitHandler}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                data-testid="login-box-form"
                className="grid grid-cols-1 gap-4"
              >
                <TextField
                  name="email"
                  role="textbox"
                  data-testid="login-box-email"
                  placeholder="Email"
                  InputLabelProps={{
                    role: "label",
                  }}
                  error={errors.email ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  label={errors.email}
                  required
                  disabled={isSubmitting}
                />
                <TextField
                  type="password"
                  role="textbox"
                  data-testid="login-box-password"
                  name="password"
                  placeholder="Kata sandi"
                  InputLabelProps={{
                    role: "label",
                  }}
                  onChange={handleChange}
                  error={errors.password ? true : false}
                  onBlur={handleBlur}
                  value={values.password}
                  label={errors.password}
                  disabled={isSubmitting}
                  required
                />
                <Button
                  type="submit"
                  size="large"
                  disableElevation
                  data-testid="submit-login-input"
                  style={{
                    fontSize: 18,
                  }}
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  color="primary"
                  variant="contained"
                >
                  {isSubmitting ? "Memuat..." : "Login Akun"}
                </Button>
              </form>
            )}
          </Formik>
          <div className="grid grid-cols-2 mt-3">
            <span>
              <Link
                fontWeight="bold"
                className="cursor-pointer"
                data-testid="login-box-forget-pass-link"
              >
                Lupa kata sandi?
              </Link>
            </span>
            <span className="text-right">
              <Link
                fontWeight="bold"
                className="cursor-pointer"
                data-testid="login-box-register-link"
              >
                Registrasi sekarang
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Paper>
  );
};

LoginBox.defaultProps = {
  elevation: 0,
};

export default LoginBox;
