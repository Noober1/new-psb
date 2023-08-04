import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikProps, useFormik } from "formik";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import LoadingScreen from "../components/atoms/LoadingScreen";
import mediaQuery from "../components/hooks/mediaQuery";
import useLoginPopup from "../components/hooks/useLoginPopup";
import useUserData from "../components/hooks/useUserData";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";
import useLoadingScreen from "../components/hooks/useLoadingScreen";
import ServerSideSelect from "../components/organisms/ServerSideSelect";
import DatePicker from "../components/organisms/DatePicker";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import fetchApi from "../lib/fetchApi";
import axios from "axios";
import useSnackbar from "../components/hooks/useSnackbar";
import { BasicFormValues } from "../components/layouts/forms/BasicForm";
import { registerSchema } from "../lib/formSchema";
import { formError } from "../lib/formUtils";
import { NextSeo } from "next-seo";
import { useQueryClient } from "react-query";
import { MainConfig } from "../components/atoms/UserDataProvider";
import { useMutation } from "../lib/mutation";
import NextLink from "../components/atoms/Link";

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

const RegisterPage: MainLayoutType = () => {
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
  const [, underSmScreen] = mediaQuery("md");
  const [handleOpenLogin] = useLoginPopup();
  const [, userStatus] = useUserData();
  const isAuthenticated = userStatus == "authenticated";
  const [, openLoadingScreen, hideLoadingScreen] = useLoadingScreen();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isSubmitting,
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

  useEffect(() => {
    if (userStatus == "authenticated") {
      router.push("/");
    }
  }, [userStatus]);

  if (isAuthenticated) return <LoadingScreen position="fixed" />;

  if (!getMainData?.isActive || isNotOpenYet || isClosed) {
    return (
      <Container maxWidth="md" className="my-6">
        <Paper className="p-5">
          <Typography variant="h4" gutterBottom>
            Pendaftaran ditutup
          </Typography>
          <Typography>
            {!getMainData?.isActive && (
              <>
                Saat ini sistem pendaftaran siswa baru dari sedang ditutup.
                Silahkan untuk menghubungi administrator untuk informasi lebih
                lanjut
              </>
            )}
            {isNotOpenYet && (
              <>
                Saat ini pendaftaran belum dibuka. Pendaftaran akan dibuka pada
                tanggal{" "}
                {dateOpen.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </>
            )}
            {isClosed && (
              <>
                Pendaftaran telah ditutup. Silahkan kunjungi halaman{" "}
                <NextLink href="/announcement">Pengumuman</NextLink> untuk
                informasi lebih lanjut.
              </>
            )}
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <GoogleReCaptchaProvider
      language="id"
      reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
    >
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
    </GoogleReCaptchaProvider>
  );
};

RegisterPage.getLayout = (page: ReactElement) => (
  <>
    <NextSeo
      title="Pendaftaran"
      description="Halaman pendaftaran Pendaftaran Siswa Baru(PSB) SMK Bina Taruna Jalancagak"
    />
    <MainLayout>{page}</MainLayout>
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const checkSession = await getSession(context);

  if (checkSession) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: checkSession,
    },
  };
};

export default RegisterPage;
