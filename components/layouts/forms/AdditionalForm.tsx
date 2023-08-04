import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { runDevOnly } from "../../../lib";
import { additionalSchema } from "../../../lib/formSchema";
import { formError } from "../../../lib/formUtils";
import { StudentBio } from "../../../types/bio";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import useSnackbar from "../../hooks/useSnackbar";
import { useMutation } from "../../../lib/mutation";

export interface AdditionalFormValues {
  livingWith?: StudentBio["livingWith"];
  weight?: StudentBio["body"]["weight"];
  height?: StudentBio["body"]["height"];
  schoolDistance?: StudentBio["schoolDistance"];
  bloodType?: StudentBio["body"]["bloodType"];
  bloodRhesus?: StudentBio["body"]["bloodRhesus"];
  relapsingIllness?: StudentBio["disease"]["relapsingDisease"];
  seriousIllness?: StudentBio["disease"]["seriousDisease"];
}

const AdditionalForm = ({ data: userBio }: { data: StudentBio }) => {
  const router = useRouter();
  const { handleOpenSnackbar } = useSnackbar();

  const initialValues: AdditionalFormValues = {
    bloodType: userBio?.body?.bloodType || "A",
    weight: userBio?.body?.weight || 0,
    height: userBio?.body?.height || 0,
    schoolDistance: userBio?.schoolDistance || 0,
    livingWith: userBio?.livingWith || "",
    relapsingIllness: userBio?.disease?.relapsingDisease || "-",
    seriousIllness: userBio?.disease?.seriousDisease || "-",
    bloodRhesus: userBio?.body?.bloodRhesus || "UNKNOWN",
  };

  const [loadingScreen, openLoadingScreen, closeLoadingScreen] =
    useLoadingScreen();

  const { data: session } = useSession();
  const mutation = useMutation(
    `/api/student/${session?.id}/additional`,
    "edit"
  );

  const {
    handleSubmit,
    handleBlur,
    isSubmitting,
    handleChange,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: additionalSchema,
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
        className="col-span-4 sm:col-span-2"
        error={isError("livingWith")}
        label="Tinggal bersama?"
        name="livingWith"
        helperText={helperText("livingWith")}
        placeholder="Contoh:Orang tua, sendiri, atau lainnya"
        onBlur={handleBlur}
        value={values.livingWith}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("height")}
        label="Tinggi badan(CM)"
        name="height"
        helperText={helperText("height")}
        onBlur={handleBlur}
        value={values.height}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("weight")}
        label="Berat badan(KG)"
        name="weight"
        helperText={helperText("weight")}
        onBlur={handleBlur}
        value={values.weight}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("schoolDistance")}
        label="Jarak dari tempat tinggal ke sekolah(KM)"
        name="schoolDistance"
        helperText={helperText("schoolDistance")}
        onBlur={handleBlur}
        value={values.schoolDistance}
        onChange={handleChange}
      />
      <FormControl
        className="col-span-4 lg:col-span-2"
        error={isError("bloodType")}
      >
        <InputLabel>Golongan darah</InputLabel>
        <Select
          label="Golongan darah"
          name="bloodType"
          onBlur={handleBlur}
          value={values.bloodType}
          onChange={handleChange}
          required
        >
          {["A", "B", "AB", "O"].map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText("bloodType")}</FormHelperText>
      </FormControl>
      <FormControl className="col-span-4" error={isError("bloodRhesus")}>
        <InputLabel>Rhesus darah</InputLabel>
        <Select
          label="Golongan darah"
          name="bloodRhesus"
          onBlur={handleBlur}
          value={values.bloodRhesus}
          onChange={handleChange}
          className="capitalize"
          required
        >
          {["PLUS", "MINUS", "UNKNOWN"].map((item) => (
            <MenuItem key={item} value={item} className="capitalize">
              {item === "UNKNOWN" ? "Tidak diketahui" : item.toLowerCase()}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText("bloodRhesus")}</FormHelperText>
      </FormControl>
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("seriousIllness")}
        label="Penyakit berat yang pernah diderita"
        name="seriousIllness"
        helperText={helperText("seriousIllness")}
        placeholder="Isi dengan simbol strip(-) jika tidak ada"
        onBlur={handleBlur}
        value={values.seriousIllness}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("relapsingIllness")}
        label="Penyakit kambuhan"
        name="relapsingIllness"
        helperText={helperText("relapsingIllness")}
        placeholder="Isi dengan simbol strip(-) jika tidak ada"
        onBlur={handleBlur}
        value={values.relapsingIllness}
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

export default AdditionalForm;
