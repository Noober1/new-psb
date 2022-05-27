import {
  Alert,
  Button,
  IconButton,
  Link,
  Paper,
  PaperProps,
  TextField,
  Typography,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { Formik } from "formik";
import ToggleLoginBoxButton from "../atoms/ToggleLoginBoxButton";
import Logo from "../atoms/Logo";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { toggleLoginBox } from "../../lib/redux/slices/noPersistConfig";
import { runDevOnly } from "../../lib";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useRouter } from "next/router";

type LoginFormValues = {
  email?: string;
  password?: string;
};

const loginAuthFormValues: LoginFormValues = {
  email: "",
  password: "",
};

export type LoginBoxProps = PaperProps & {
  showCloseButton?: boolean;
  popupMode?: boolean;
  linkMenuCallback?: Function;
};

const LoginBox = ({
  showCloseButton,
  elevation,
  popupMode,
  linkMenuCallback,
}: LoginBoxProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openLoginErrorDialog, setopenLoginErrorDialog] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const loginAuthSubmitHandler = async (
    values: LoginFormValues,
    actions: any
  ) => {
    const result: any = await signIn("credentials", {
      redirect: false,
      username: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    });

    runDevOnly(() => {
      console.log(result);
    });

    if (result.ok) {
      if (popupMode) {
        dispatch(toggleLoginBox());
        actions.setSubmitting(false);
      } else {
        router.push("/");
      }
    } else {
      setopenLoginErrorDialog(true);
      if (result.status === 401) {
        setErrorMessage("Email atau kata sandi salah");
      } else {
        setErrorMessage("Error tidak diketahui");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setshowPassword(!showPassword);

  const handleAuthMenuLink = (event: MouseEvent<HTMLElement>, data: string) => {
    if (!popupMode) return true;
    event.preventDefault();
    if (typeof linkMenuCallback !== "undefined") linkMenuCallback(data);
  };

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
          <Logo className="h-full" />
        </div>
        <Typography align="center" variant="h5" fontWeight="bold">
          Log in
        </Typography>
        {errorMessage.length > 0 && (
          <Alert severity="error" variant="filled" className="mx-3 mt-3">
            {errorMessage}
          </Alert>
        )}
        <div id="login-box-content" className="m-3">
          <Formik
            initialValues={loginAuthFormValues}
            validationSchema={Yup.object({
              email: Yup.string()
                .max(50, "Email tidak lebih dari 50 karakter")
                .email("Format email salah")
                .required("Silahkan masukan email anda"),
              password: Yup.string()
                .max(50, "Kata sandi maksimal 50 karakter")
                .min(8, "Kata sandi minimal 8 karakter")
                .required("Silahkan masukan kata sandi anda"),
            })}
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
                <div className="flex items-center">
                  <TextField
                    className="flex-1"
                    type={showPassword ? "text" : "password"}
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
                  <IconButton className="m-1" onClick={toggleShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </div>
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
                  endIcon={
                    isSubmitting && <RotateRightIcon className="animate-spin" />
                  }
                >
                  {isSubmitting ? "Memproses" : "Login Akun"}
                </Button>
              </form>
            )}
          </Formik>
          <div className="grid grid-cols-2 mt-3">
            <span>
              <Link
                href="/forgot-password"
                onClick={(event) => handleAuthMenuLink(event, "forgot")}
                tabIndex={0}
                fontWeight="bold"
                className="cursor-pointer"
                data-testid="login-box-forget-pass-link"
              >
                Lupa kata sandi?
              </Link>
            </span>
            <span className="text-right">
              <Link
                href="/register"
                tabIndex={0}
                fontWeight="bold"
                className="cursor-pointer"
                data-testid="login-box-register-link"
              >
                Daftar sekarang
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
  popupMode: false,
  linkMenuCallback: () => {},
};

export default LoginBox;
