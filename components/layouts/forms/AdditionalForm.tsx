import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { runDevOnly } from "../../../lib";
import { additionalSchema, addressSchema } from "../../../lib/formSchema";
import { formError } from "../../../lib/formUtils";
import { StudentBio } from "../../../types/bio";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import useSnackbar from "../../hooks/useSnackbar";
import ServerSideSelect from "../../organisms/ServerSideSelect";

export interface AdditionalFormValues {
  livingWith?: StudentBio["livingWith"];
  weight?: StudentBio["body"]["weight"];
  height?: StudentBio["body"]["height"];
  homeToSchoolDistance?: StudentBio["homeToSchoolDistance"];
  bloodType?: StudentBio["body"]["bloodType"];
  relapsingDisease?: StudentBio["disease"]["relapsingDisease"];
  seriousDisease?: StudentBio["disease"]["seriousDisease"];
}

const AdditionalForm = ({ data: userBio }: { data: StudentBio }) => {
  const router = useRouter();
  const { handleOpenSnackbar } = useSnackbar();

  const initialValues: AdditionalFormValues = {
    bloodType: userBio?.body?.bloodType || "",
    weight: userBio?.body?.weight || 0,
    height: userBio?.body?.height || 0,
    homeToSchoolDistance: userBio?.homeToSchoolDistance || 0,
    livingWith: userBio?.livingWith || "",
    relapsingDisease: userBio?.disease?.relapsingDisease || "-",
    seriousDisease: userBio?.disease?.seriousDisease || "-",
  };

  const [loadingScreen, openLoadingScreen, closeLoadingScreen] =
    useLoadingScreen();

  const { data: session } = useSession();
  const updateBio = async (data: AdditionalFormValues) => {
    if (!session?.accessToken) {
      throw new Error("access token not found");
    }
    const url = process.env.NEXT_PUBLIC_API_URL + "/ppdb/bio/additional";
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
    values: AdditionalFormValues,
    action: FormikHelpers<AdditionalFormValues>
  ) => {
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
        action.setSubmitting(false);
        closeLoadingScreen();
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={additionalSchema}
      onSubmit={submitForm}
    >
      {({
        handleSubmit,
        handleBlur,
        isSubmitting,
        handleChange,
        values,
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
              error={isError("homeToSchoolDistance")}
              label="Jarak dari tempat tinggal ke sekolah(KM)"
              name="homeToSchoolDistance"
              helperText={helperText("homeToSchoolDistance")}
              onBlur={handleBlur}
              value={values.homeToSchoolDistance}
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
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                )}
              </Select>
              <FormHelperText>{helperText("bloodType")}</FormHelperText>
            </FormControl>
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("seriousDisease")}
              label="Penyakit berat yang pernah diderita"
              name="seriousDisease"
              helperText={helperText("seriousDisease")}
              placeholder="Isi dengan simbol strip(-) jika tidak ada"
              onBlur={handleBlur}
              value={values.seriousDisease}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("relapsingDisease")}
              label="Penyakit kambuhan"
              name="relapsingDisease"
              helperText={helperText("relapsingDisease")}
              placeholder="Isi dengan simbol strip(-) jika tidak ada"
              onBlur={handleBlur}
              value={values.relapsingDisease}
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
      }}
    </Formik>
  );
};

export default AdditionalForm;
