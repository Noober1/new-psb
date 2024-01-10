// import { DatePicker } from "@mui/lab";
import {
  Link,
  Container,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
// import { values } from "cypress/types/lodash"
import React from "react";
import { isError, useQueryClient } from "react-query";
import ServerSideSelect from "../../organisms/ServerSideSelect";
import mediaQuery from "../../hooks/mediaQuery";
import useLoginPopup from "../../hooks/useLoginPopup";
import { formError } from "../../../lib/formUtils";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { registerSchema } from "../../../lib/formSchema";
import { MainConfig } from "../../atoms/UserDataProvider";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import useSnackbar from "../../hooks/useSnackbar";
import useUserData from "../../hooks/useUserData";
import { MainLayoutType } from "../Main";
import DatePicker from "../../organisms/DatePicker";
import { useMutation } from "../../../lib/mutation";

interface RegisterFormValues {
  firstName: string;

  lastName: string;

  phoneNumber: string;

  email: string;

  birthplace: string;

  birthdate: string;

  gender: "MALE" | "FEMALE";

  NISNNumber: string;

  schoolId: number;

  schoolGraduateYear: number;

  majorId: number;

  captchaToken: string;
}
const RegisterForm = () => {
  const [, underSmScreen] = mediaQuery("md");

  const [handleOpenLogin] = useLoginPopup();

  const registerFormInitialValues: RegisterFormValues = {
    firstName: "",
    lastName: "",
    NISNNumber: "",
    birthdate: new Date().toISOString(),
    birthplace: "",
    email: "",
    schoolGraduateYear: new Date().getFullYear(),
    schoolId: 0,
    phoneNumber: "",
    majorId: 0,
    gender: "MALE",
    captchaToken: "",
  };

  const graduateYearMin = 1990;
  const currentYear = new Date().getFullYear();
  const graduateYearOptions = currentYear - graduateYearMin + 1;
  const router = useRouter();
  const mutation = useMutation("/api/register");
  const queryClient = useQueryClient();
  const getMainData = queryClient.getQueryData<MainConfig>("config");
  const dateOpen =
    typeof getMainData?.date.open == "string"
      ? new Date(getMainData?.date.open)
      : new Date();
  const dateClose =
    typeof getMainData?.date.close == "string"
      ? new Date(getMainData?.date.close)
      : new Date();
  const currentDate = new Date();
  const isNotOpenYet = currentDate.getTime() < dateOpen.getTime();
  const isClosed = currentDate.getTime() > dateClose.getTime();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { handleOpenSnackbar: openSnackbar } = useSnackbar();

  const [, userStatus] = useUserData();
  const isAuthenticated = userStatus == "authenticated";
  const [, openLoadingScreen, hideLoadingScreen] = useLoadingScreen();

  const {
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    values,
  } = useFormik({
    initialValues: registerFormInitialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      openLoadingScreen("Memproses");
      if (!executeRecaptcha) {
        throw new Error("Google reCaptcha is not ready yet");
      }
      executeRecaptcha("register").then((token) => {
        values.captchaToken = token;
        mutation.mutate(values, {
          onSuccess: () => {
            router.push(
              {
                pathname: "/login",
                query: {
                  registerSuccess: true,
                  email: values.email,
                  phone: values.phoneNumber,
                },
              },
              "login"
            );
            hideLoadingScreen();
          },
          onError: (error) => {
            if (axios.isAxiosError(error) && error.response) {
              let errorResponse = error.response?.data as {
                message: string;
                code: string;
              };
              openSnackbar({
                message: errorResponse.message || "Terjadi kesalahan",
                severity: "error",
              });
            } else {
              openSnackbar({
                message: "Terjadi kesalahan",
                severity: "error",
              });
              hideLoadingScreen();
              actions.setSubmitting(false);
            }
          },
        });
      });
    },
  });
  const { isError, helperText } = formError(
    errors,
    touched,
    registerFormInitialValues
  );
  return (
    <Container className="my-6">
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign={underSmScreen ? "center" : "left"}
      >
        Pendaftaran
      </Typography>
      <Paper className="my-5 p-5">
        <Typography className="mb-10">
          Silahkan untuk mengisi form dibawah ini.
          <br />
          Sudah pernah mendaftar?{" "}
          <Link onClick={handleOpenLogin} className="cursor-pointer">
            Login disini
          </Link>
        </Typography>
        <form
          className="grid grid-cols-4 gap-3 gap-y-5"
          onSubmit={handleSubmit}
        >
          <TextField
            className="col-span-4 sm:col-span-2 capitalize"
            error={isError("firstName")}
            label="Nama depan"
            name="firstName"
            helperText={helperText("firstName")}
            onBlur={handleBlur}
            value={values.firstName}
            onChange={handleChange}
          />
          <TextField
            className="col-span-4 sm:col-span-2 capitalize"
            error={isError("lastName")}
            label="Nama belakang"
            name="lastName"
            helperText={helperText("lastName")}
            onBlur={handleBlur}
            value={values.lastName}
            onChange={handleChange}
          />
          <TextField
            className="col-span-4 sm:col-span-2 capitalize"
            error={isError("phoneNumber")}
            label="Nomor Telpon/Handphone"
            name="phoneNumber"
            helperText={helperText("phoneNumber")}
            onBlur={handleBlur}
            value={values.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            className="col-span-4 sm:col-span-2"
            error={isError("email")}
            label="Alamat surel(email)"
            name="email"
            helperText={helperText("email")}
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
          />
          <TextField
            className="col-span-4 sm:col-span-2 capitalize"
            error={isError("birthplace")}
            label="Tempat lahir"
            name="birthplace"
            helperText={helperText("birthplace")}
            onBlur={handleBlur}
            value={values.birthplace}
            onChange={handleChange}
          />
          <div className="col-span-4 sm:col-span-2">
            <DatePicker
              value={values.birthdate}
              error={isError("birthdate")}
              helperText={helperText("birthdate")}
              label="Tanggal lahir"
              onChange={(value) =>
                setFieldValue("birthdate", value.toISOString())
              }
            />
          </div>
          <FormControl className="col-span-4 md:col-span-2">
            <InputLabel>Jenis kelamin</InputLabel>
            <Select
              label="Jenis kelamin"
              name="gender"
              onBlur={handleBlur}
              value={values.gender}
              onChange={handleChange}
              required
            >
              <MenuItem value="MALE">Laki-laki</MenuItem>
              <MenuItem value="FEMALE">Perempuan</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className="col-span-4 md:col-span-2"
            error={isError("NISNNumber")}
            label="NISN"
            name="NISNNumber"
            helperText={helperText("NISNNumber")}
            onBlur={handleBlur}
            value={values.NISNNumber}
            onChange={handleChange}
          />
          <div className="col-span-4 md:col-span-2">
            <ServerSideSelect
              error={isError("schoolId")}
              helperText={helperText("schoolId")}
              onBlur={handleBlur}
              value={values.schoolId}
              label="Asal sekolah"
              placeholder="Silahkan pilih"
              valueSelector="name"
              labelSelector="label"
              url={process.env.NEXT_PUBLIC_API_URL + "/api/schools"}
              onChange={(event, value) => {
                setFieldValue("schoolId", value);
              }}
            />
          </div>
          <FormControl className="col-span-4 md:col-span-2">
            <InputLabel>Tahun lulus</InputLabel>
            <Select
              label="Tahun lulus"
              name="schoolGraduateYear"
              onBlur={handleBlur}
              value={values.schoolGraduateYear}
              MenuProps={{
                style: {
                  maxHeight: 300,
                },
              }}
              onChange={handleChange}
              required
            >
              {Array(graduateYearOptions)
                .fill(null)
                .map((item, index) => (
                  <MenuItem value={graduateYearMin + index} key={index}>
                    {graduateYearMin + index}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <div className="col-span-4 md:col-span-2">
            <ServerSideSelect
              error={isError("majorId")}
              helperText={helperText("majorId")}
              onBlur={handleBlur}
              value={values.majorId}
              label="Jurusan yang dipilih"
              placeholder="Silahkan pilih"
              valueSelector="name"
              labelSelector="label"
              url={process.env.NEXT_PUBLIC_API_URL + "/api/major"}
              onChange={(event, value) => {
                setFieldValue("majorId", value);
              }}
            />
          </div>
          <div className="flex items-center justify-center col-span-4 md:col-span-2">
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses" : "Registrasi"}
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
