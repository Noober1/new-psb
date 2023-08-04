import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { runDevOnly } from "../../../lib";
import { parentSchema } from "../../../lib/formSchema";
import { formError } from "../../../lib/formUtils";
import { StudentBio } from "../../../types/bio";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import useSnackbar from "../../hooks/useSnackbar";
import { useMutation } from "../../../lib/mutation";
import DatePicker from "../../organisms/DatePicker";

export interface ParentFormValues {
  fatherFullname?: StudentBio["father"]["fullName"];
  fatherBirthdate?: StudentBio["father"]["birthDate"];
  fatherNationality?: StudentBio["father"]["nationality"];
  fatherLastEducation?: StudentBio["father"]["lastEducation"];
  fatherJob?: StudentBio["father"]["job"];
  fatherIncome?: StudentBio["father"]["income"];
  fatherAddress?: StudentBio["father"]["address"];
  motherFullname?: StudentBio["mother"]["fullName"];
  motherBirthdate?: StudentBio["mother"]["birthDate"];
  motherNationality?: StudentBio["mother"]["nationality"];
  motherLastEducation?: StudentBio["mother"]["lastEducation"];
  motherJob?: StudentBio["mother"]["job"];
  motherIncome?: StudentBio["mother"]["income"];
  motherAddress?: StudentBio["mother"]["address"];
}

const parentEducation = [
  "SD",
  "MI",
  "SMP",
  "MTS",
  "SMA",
  "SMK",
  "MA",
  "S1",
  "S2",
  "S3",
  "D3",
];

const ParentForm = ({ data: userBio }: { data: StudentBio }) => {
  const router = useRouter();
  const { handleOpenSnackbar } = useSnackbar();

  const initialValues: ParentFormValues = {
    fatherFullname: userBio?.father.fullName || "",
    fatherBirthdate: userBio?.father.birthDate || new Date().toISOString(),
    fatherNationality: userBio?.father.nationality || "",
    fatherLastEducation: userBio?.father.lastEducation || "",
    fatherJob: userBio?.father.job || "",
    fatherIncome: userBio?.father.income || 0,
    fatherAddress: userBio?.father.address || "",
    motherFullname: userBio?.mother.fullName || "",
    motherBirthdate: userBio?.mother.birthDate || new Date().toISOString(),
    motherNationality: userBio?.mother.nationality || "",
    motherLastEducation: userBio?.mother.lastEducation || "",
    motherJob: userBio?.mother.job || "",
    motherIncome: userBio?.mother.income || 0,
    motherAddress: userBio?.mother.address || "",
  };

  const [loadingScreen, openLoadingScreen, closeLoadingScreen] =
    useLoadingScreen();

  // updating functions
  const { data: session } = useSession();
  const mutation = useMutation(`/api/student/${session?.id}/parent`, "edit");

  const {
    handleSubmit,
    handleBlur,
    isSubmitting,
    handleChange,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: parentSchema,
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
      <Box className="col-span-4">
        <Alert severity="info">
          <AlertTitle>Tentang informasi wali</AlertTitle>
          <Typography>
            Jika anda ingin mengisi identitas wali sebagai perwakilan dari kedua
            orang tua, maka isi form ayah atau ibu sesuai jenis kelamin orang
            tua wali. Anda juga dapat ngisi kedua informasi ayah dan ibu sebagai
            wali
          </Typography>
        </Alert>
      </Box>
      <Box className="col-span-4 my-3">
        <Divider>
          <Button>Informasi Ayah</Button>
        </Divider>
      </Box>
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("fatherFullname")}
        label="Nama lengkap"
        name="fatherFullname"
        helperText={helperText("fatherFullname")}
        onBlur={handleBlur}
        value={values.fatherFullname}
        onChange={handleChange}
      />
      <div className="col-span-4 sm:col-span-2">
        <DatePicker
          value={values.fatherBirthdate}
          error={isError("fatherBirthdate")}
          helperText={helperText("fatherBirthdate")}
          label="Tanggal lahir"
          onChange={(value) =>
            setFieldValue("fatherBirthdate", value.toISOString())
          }
          required
        />
      </div>
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("fatherNationality")}
        label="Kewarganegaraan"
        name="fatherNationality"
        helperText={helperText("fatherNationality")}
        onBlur={handleBlur}
        value={values.fatherNationality}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("fatherJob")}
        label="Pekerjaan"
        name="fatherJob"
        helperText={helperText("fatherJob")}
        onBlur={handleBlur}
        value={values.fatherJob}
        onChange={handleChange}
      />
      <FormControl className="col-span-4 lg:col-span-2">
        <InputLabel>Pendidikan Terakhir</InputLabel>
        <Select
          label="Pendidikan Terakhir"
          name="fatherLastEducation"
          onBlur={handleBlur}
          value={values.fatherLastEducation}
          onChange={handleChange}
        >
          {parentEducation.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("fatherIncome")}
        label="Penghasilan perbulan"
        name="fatherIncome"
        helperText={helperText("fatherIncome")}
        onBlur={handleBlur}
        value={values.fatherIncome}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("fatherAddress")}
        label="Alamat lengkap"
        name="fatherAddress"
        helperText={helperText("fatherAddress")}
        onBlur={handleBlur}
        value={values.fatherAddress}
        onChange={handleChange}
      />
      <Box className="col-span-4 my-3">
        <Divider>
          <Button>Informasi Ibu</Button>
        </Divider>
      </Box>
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("motherFullname")}
        label="Nama lengkap"
        name="motherFullname"
        helperText={helperText("motherFullname")}
        onBlur={handleBlur}
        value={values.motherFullname}
        onChange={handleChange}
      />
      <div className="col-span-4 sm:col-span-2">
        <DatePicker
          value={values.motherBirthdate}
          error={isError("motherBirthdate")}
          helperText={helperText("motherBirthdate")}
          label="Tanggal lahir"
          onChange={(value) =>
            setFieldValue("motherBirthdate", value.toISOString())
          }
          required
        />
      </div>
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("motherNationality")}
        label="Kewarganegaraan"
        name="motherNationality"
        helperText={helperText("motherNationality")}
        onBlur={handleBlur}
        value={values.motherNationality}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("motherJob")}
        label="Pekerjaan"
        name="motherJob"
        helperText={helperText("motherJob")}
        onBlur={handleBlur}
        value={values.motherJob}
        onChange={handleChange}
      />
      <FormControl className="col-span-4 lg:col-span-2">
        <InputLabel>Pendidikan Terakhir</InputLabel>
        <Select
          label="Pendidikan Terakhir"
          name="motherLastEducation"
          onBlur={handleBlur}
          value={values.motherLastEducation}
          onChange={handleChange}
        >
          {parentEducation.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("motherIncome")}
        label="Penghasilan perbulan"
        name="motherIncome"
        helperText={helperText("motherIncome")}
        onBlur={handleBlur}
        value={values.motherIncome}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("motherAddress")}
        label="Alamat lengkap"
        name="motherAddress"
        helperText={helperText("motherAddress")}
        onBlur={handleBlur}
        value={values.motherAddress}
        onChange={handleChange}
      />
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

export default ParentForm;
