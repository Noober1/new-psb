import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Formik, FormikHelpers, useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";
import { runDevOnly } from "../../../lib";
import { basicSchema } from "../../../lib/formSchema";
import { formError } from "../../../lib/formUtils";
import { StudentBio } from "../../../types/bio";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import useSnackbar from "../../hooks/useSnackbar";
import DatePicker from "../../organisms/DatePicker";
import ServerSideSelect from "../../organisms/ServerSideSelect";
import { useMutation } from "../../../lib/mutation";

export interface BasicFormValues {
  firstName: StudentBio["name"]["firstName"];
  lastName: StudentBio["name"]["lastName"];
  email: StudentBio["email"];
  birthplace: StudentBio["birth"]["place"];
  birthdate: StudentBio["birth"]["date"];
  gender: StudentBio["body"]["sex"];
  schoolId: StudentBio["lastEducation"]["id"];
  schoolGraduateYear: StudentBio["lastEducation"]["graduateYear"];
  majorId: StudentBio["selectedMajor"]["id"];
}

const BasicForm = ({ data: userBio }: { data: StudentBio }) => {
  const router = useRouter();
  const { handleOpenSnackbar } = useSnackbar();

  const initialValues: BasicFormValues = {
    firstName: userBio?.name.firstName || "",
    lastName: userBio?.name.lastName || "",
    email: userBio?.email || "",
    birthplace: userBio?.birth.place || "",
    birthdate: userBio?.birth.date || new Date().toISOString(),
    gender: userBio?.body.sex || "MALE",
    schoolId: userBio?.lastEducation.id || 0,
    schoolGraduateYear:
      userBio?.lastEducation.graduateYear || new Date().getFullYear(),
    majorId: userBio?.selectedMajor.id || 0,
  };

  const [loadingScreen, openLoadingScreen, closeLoadingScreen] =
    useLoadingScreen();

  // updating functions
  const { data: session } = useSession();

  const mutation = useMutation("/api/student/" + session?.id, "edit", [
    "user-bio",
    "user-data",
  ]);

  const {
    handleSubmit,
    handleBlur,
    isSubmitting,
    handleChange,
    values,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: basicSchema,
    onSubmit: (values, actions) => {
      runDevOnly(() => {
        console.log(values);
      });
      openLoadingScreen("Menyimpan data");
      mutation.mutate(values, {
        onSuccess: () => {
          router.push("/profile");
          handleOpenSnackbar({
            message: "Data berhasil disimpan",
          });
          closeLoadingScreen();
        },
        onError: () => {
          handleOpenSnackbar({
            message: "Data gagal disimpan",
          });
          actions.setSubmitting(false);
          closeLoadingScreen();
        },
      });
    },
  });

  const { isError, helperText } = formError(errors, touched, initialValues);

  return (
    <Box
      component="form"
      className="grid grid-cols-4 gap-3 gap-y-5 p-5"
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
        required
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
        className="col-span-4 sm:col-span-2"
        label="Alamat surel(email)"
        name="email"
        value={values.email}
        disabled
        helperText="Email tidak dapat dirubah"
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
        required
      />
      <div className="col-span-4 sm:col-span-2">
        <DatePicker
          value={values.birthdate}
          error={isError("birthdate")}
          helperText={helperText("birthdate")}
          label="Tanggal lahir"
          onChange={(value) => setFieldValue("birthdate", value.toISOString())}
          required
        />
      </div>
      <FormControl className="col-span-4 sm:col-span-2">
        <InputLabel required>Jenis kelamin</InputLabel>
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
      <div className="col-span-4 md:col-span-2">
        <ServerSideSelect
          error={isError("schoolId")}
          helperText={helperText("schoolId")}
          value={values.schoolId}
          onBlur={handleBlur}
          label="Asal sekolah"
          placeholder="Silahkan pilih"
          valueSelector="name"
          labelSelector="label"
          url={process.env.NEXT_PUBLIC_API_URL + "/api/schools"}
          onChange={(event, value) => {
            setFieldValue("schoolId", value);
          }}
          required
        />
      </div>
      <FormControl className="col-span-4 md:col-span-2">
        <InputLabel required>Tahun lulus</InputLabel>
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
          {Array(new Date().getFullYear() + 1 - 1990)
            .fill(null)
            .map((item, index) => (
              <MenuItem value={1990 + index} key={index}>
                {1990 + index}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <div className="col-span-4 md:col-span-2">
        <ServerSideSelect
          error={isError("majorId")}
          helperText={helperText("majorId")}
          value={values.majorId}
          onBlur={handleBlur}
          label="Jurusan yang dipilih"
          placeholder="Silahkan pilih"
          valueSelector="name"
          labelSelector="label"
          url={process.env.NEXT_PUBLIC_API_URL + "/api/major"}
          onChange={(event, value) => {
            setFieldValue("majorId", value);
          }}
          required
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
          {isSubmitting ? "Memproses" : "Simpan"}
        </Button>
      </div>
    </Box>
  );
};

export default BasicForm;
