import {
  Alert,
  Button,
  Collapse,
  IconButton,
  Paper,
  PaperProps,
  TextField,
  Typography,
} from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { Formik } from "formik";
import ToggleLoginBoxButton from "../atoms/ToggleLoginBoxButton";
import Logo from "../atoms/Logo";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { closeLoginPopup } from "../../lib/redux/slices/noPersistConfig";
import { runDevOnly } from "../../lib";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import PaperWithLoadingOverlay from "../atoms/PaperWithLoadingOverlay";
import Link from "../atoms/Link";
import useSnackbar from "../hooks/useSnackbar";
import { useRouter } from "next/router";

type LoginFormValues = {
  email?: string;
  password?: string;
};

export type LoginBoxProps = PaperProps & {
  showCloseButton?: boolean;
  popupMode?: boolean;
};

const LoginBox = ({ showCloseButton, popupMode }: LoginBoxProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const redirectTo = router.query.redirectTo as string;
  const [redirectToState, setredirectToState] = useState<boolean>(
    redirectTo ? true : false
  );
  useEffect(() => {
    if (redirectToState) {
      setTimeout(() => {
        setredirectToState(false);
      }, 6000);
    }
  }, [redirectToState]);

  const loginAuthFormValues: LoginFormValues = {
    email: (router.query?.email as string) || "",
    password: (router.query?.phone as string) || "",
  };
  const { handleOpenSnackbar: openSnackbar } = useSnackbar();
  const [openLoginErrorDialog, setopenLoginErrorDialog] =
    useState<boolean>(false);
  const [lockLoginBox, setlockLoginBox] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const loginAuthSubmitHandler = async (
    values: LoginFormValues,
    actions: any
  ) => {
    setlockLoginBox(true);
    const result: any = await signIn("credentials", {
      redirect: redirectTo ? true : false,
      username: values.email,
      password: values.password,
      callbackUrl: redirectTo ? redirectTo : undefined,
    });

    runDevOnly(() => {
      console.log(result);
    });

    if (result.ok) {
      actions.setSubmitting(false);
      dispatch(closeLoginPopup());
      // TODO: mutate user data
      openSnackbar({
        positionX: "center",
        message: "Berhasil login",
        severity: "success",
      });
    } else {
      setlockLoginBox(false);
      setopenLoginErrorDialog(true);
      if (result.status === 401) {
        setErrorMessage("Email atau kata sandi salah");
      } else {
        setErrorMessage("Error tidak diketahui");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setshowPassword(!showPassword);

  return (
    <Formik
      initialValues={loginAuthFormValues}
      validationSchema={Yup.object({
        email: Yup.string()
          .max(50, "Email tidak lebih dari 50 karakter")
          .email("Format email salah")
          .required("Silahkan masukan email anda"),
        password: Yup.string()
          .max(15, "No. Telpon maksimal 15 karakter")
          .min(8, "No. Telpon minimal 8 karakter")
          .required("Silahkan masukan No. Telpon anda"),
      })}
      onSubmit={loginAuthSubmitHandler}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <PaperWithLoadingOverlay
          className="w-full p-1 login-box relative"
          data-testid="login-box"
          elevation={popupMode ? 0 : 4}
          showOverlay={isSubmitting || lockLoginBox}
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
            {router.query.registerSuccess && (
              <Alert severity="success" variant="filled" className="mx-3 mt-3">
                Pendaftaran berhasil, silahkan untuk melakukan login
              </Alert>
            )}
            {redirectTo && (
              <Collapse in={redirectToState}>
                <Alert severity="info" variant="filled" className="mx-3 mt-3">
                  Silahkan login untuk melanjutkan
                </Alert>
              </Collapse>
            )}
            <Collapse in={errorMessage.length > 0} orientation="vertical">
              <Alert severity="error" variant="filled" className="mx-3 mt-3">
                {errorMessage}
              </Alert>
            </Collapse>
            <div id="login-box-content" className="m-3">
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
                    placeholder="No. Telpon"
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
                  <IconButton className="m-1 ml-3" onClick={toggleShowPassword}>
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
              <div className="flex mt-3">
                <Typography>Belum mendaftar?</Typography>
                <Link
                  href="/register"
                  onClick={() => dispatch(closeLoginPopup())}
                  tabIndex={0}
                  fontWeight="bold"
                  className="cursor-pointer ml-1"
                  data-testid="login-box-register-link"
                >
                  Daftar sekarang
                </Link>
              </div>
            </div>
          </div>
        </PaperWithLoadingOverlay>
      )}
    </Formik>
  );
};

LoginBox.defaultProps = {
  elevation: 0,
  popupMode: false,
};

export default LoginBox;
