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
import { Formik, FormikHelpers } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { runDevOnly } from "../../../lib";
import { basicSchema } from "../../../lib/formSchema";
import { formError } from "../../../lib/formUtils";
import { StudentBio } from "../../../types/bio";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import useSnackbar from "../../hooks/useSnackbar";
import DatePicker from "../../organisms/DatePicker";
import ServerSideSelect from "../../organisms/ServerSideSelect";

export interface BasicFormValues {
  firstName: StudentBio["name"]["firstName"];
  lastName: StudentBio["name"]["lastName"];
  email: StudentBio["email"];
  birthPlace: StudentBio["birth"]["place"];
  birthDate: StudentBio["birth"]["date"];
  sex: StudentBio["body"]["sex"];
  lastEducation: StudentBio["lastEducation"]["grade"];
  lastEducationSchool: StudentBio["lastEducation"]["school"]["code"];
  graduateYear: StudentBio["lastEducation"]["graduateYear"];
  selectedMajor: StudentBio["selectedMajor"];
}

const BasicForm = ({ data: userBio }: { data: StudentBio }) => {
  const router = useRouter();
  const { handleOpenSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const initialValues: BasicFormValues = {
    firstName: userBio?.name.firstName || "",
    lastName: userBio?.name.lastName || "",
    email: userBio?.email || "",
    birthPlace: userBio?.birth.place || "",
    birthDate: userBio?.birth.date || new Date().toISOString(),
    sex: userBio?.body.sex || "L",
    lastEducation: userBio?.lastEducation.grade || "SMP",
    lastEducationSchool: userBio?.lastEducation.school.code || "",
    graduateYear:
      userBio?.lastEducation.graduateYear || new Date().getFullYear(),
    selectedMajor: userBio?.selectedMajor || "",
  };

  const [loadingScreen, openLoadingScreen, closeLoadingScreen] =
    useLoadingScreen();

  // updating functions
  const { data: session } = useSession();
  const updateBio = async (data: BasicFormValues) => {
    if (!session?.accessToken) {
      throw new Error("access token not found");
    }
    const url = process.env.NEXT_PUBLIC_API_URL + "/ppdb/bio/basic";
    const response = await axios
      .put(url, data, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((result) => result.data);

    if (!response) {
      throw new Error("Error updating bio");
    }

    return response;
  };

  const mutation = useMutation(updateBio);

  const submitForm = (
    values: BasicFormValues,
    action: FormikHelpers<BasicFormValues>
  ) => {
    runDevOnly(() => {
      console.log(values);
    });
    openLoadingScreen("Menyimpan data");
    mutation.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries("user-data");
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
        action.setSubmitting(false);
        closeLoadingScreen();
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={basicSchema}
      onSubmit={submitForm}
    >
      {({
        handleSubmit,
        handleBlur,
        isSubmitting,
        handleChange,
        values,
        setFieldValue,
        errors,
        touched,
      }) => {
        const { isError, helperText } = formError(
          errors,
          touched,
          initialValues
        );
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
              error={isError("birthPlace")}
              label="Tempat lahir"
              name="birthPlace"
              helperText={helperText("birthPlace")}
              onBlur={handleBlur}
              value={values.birthPlace}
              onChange={handleChange}
              required
            />
            <div className="col-span-4 sm:col-span-2">
              <DatePicker
                value={values.birthDate}
                error={isError("birthDate")}
                helperText={helperText("birthDate")}
                label="Tanggal lahir"
                onChange={(value) =>
                  setFieldValue("birthDate", value.toISOString())
                }
                required
              />
            </div>
            <FormControl className="col-span-4 sm:col-span-2">
              <InputLabel required>Jenis kelamin</InputLabel>
              <Select
                label="Jenis kelamin"
                name="sex"
                onBlur={handleBlur}
                value={values.sex}
                onChange={handleChange}
                required
              >
                <MenuItem value="L">Laki-laki</MenuItem>
                <MenuItem value="P">Perempuan</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="col-span-4 lg:col-span-2">
              <InputLabel required>Pendidikan Terakhir</InputLabel>
              <Select
                label="Pendidikan Terakhir"
                name="lastEducation"
                onBlur={handleBlur}
                value={values.lastEducation}
                onChange={handleChange}
                required
              >
                <MenuItem value="SMP">Sekolah Menengah Pertama(SMP)</MenuItem>
                <MenuItem value="MTS">Madrasah Tsanawiyah(MTs)</MenuItem>
              </Select>
            </FormControl>
            <div className="col-span-4 md:col-span-2">
              <ServerSideSelect
                error={isError("lastEducationSchool")}
                helperText={helperText("lastEducationSchool")}
                value={values.lastEducationSchool}
                onBlur={handleBlur}
                label="Asal sekolah"
                placeholder="Silahkan pilih"
                valueSelector="kode"
                labelSelector="nama_sekolah"
                url={process.env.NEXT_PUBLIC_API_URL + "/ppdb/sekolah"}
                onChange={(event, value) => {
                  setFieldValue("lastEducationSchool", value);
                }}
                required
              />
            </div>
            <FormControl className="col-span-4 md:col-span-2">
              <InputLabel required>Tahun lulus</InputLabel>
              <Select
                label="Tahun lulus"
                name="graduateYear"
                onBlur={handleBlur}
                value={values.graduateYear}
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
                error={isError("selectedMajor")}
                helperText={helperText("selectedMajor")}
                value={values.selectedMajor}
                onBlur={handleBlur}
                label="Jurusan yang dipilih"
                placeholder="Silahkan pilih"
                valueSelector="name"
                labelSelector="name"
                url={process.env.NEXT_PUBLIC_API_URL + "/ppdb/jurusan"}
                onChange={(event, value) => {
                  setFieldValue("selectedMajor", value);
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
      }}
    </Formik>
  );
};

export default BasicForm;
