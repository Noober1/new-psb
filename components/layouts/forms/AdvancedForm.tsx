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
import { useMutation } from "../../../lib/mutation";
import { runDevOnly } from "../../../lib";
import { advancedSchema } from "../../../lib/formSchema";
import { formError } from "../../../lib/formUtils";
import { StudentBio } from "../../../types/bio";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import useSnackbar from "../../hooks/useSnackbar";

export interface AdvancedFormValues {
  nickName?: StudentBio["name"]["nickname"];
  religion?: StudentBio["religion"];
  nationality?: StudentBio["nationality"];
  birthPosition?: StudentBio["family"]["childPosition"];
  siblingCount?: StudentBio["family"]["siblingCount"];
  stepSiblingCount?: StudentBio["family"]["stepSiblingCount"];
  fosterSiblingCount?: StudentBio["family"]["adoptedSiblingCount"];
  familyStatus?: StudentBio["family"]["familyStatus"];
  motherLanguage?: StudentBio["motherLanguage"];
}

const AdvancedForm = ({ data: userBio }: { data: StudentBio }) => {
  const router = useRouter();
  const { handleOpenSnackbar } = useSnackbar();

  const initialValues: AdvancedFormValues = {
    nickName: userBio?.name.nickname || "",
    religion: userBio?.religion || "islam",
    nationality: userBio?.nationality || "",
    birthPosition: userBio?.family.childPosition || 0,
    siblingCount: userBio?.family.siblingCount || 0,
    stepSiblingCount: userBio?.family.stepSiblingCount || 0,
    fosterSiblingCount: userBio?.family.adoptedSiblingCount || 0,
    familyStatus: userBio?.family.familyStatus || "kandung",
    motherLanguage: userBio?.motherLanguage || "",
  };

  const [loadingScreen, openLoadingScreen, closeLoadingScreen] =
    useLoadingScreen();

  // updating functions
  const { data: session } = useSession();
  const updateBio = async (data: AdvancedFormValues) => {
    if (!session?.accessToken) {
      throw new Error("access token not found");
    }
    const url = process.env.NEXT_PUBLIC_API_URL + "/ppdb/bio/advanced";
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
  const mutation = useMutation(`/api/student/${session?.id}/advance`, "edit");

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
    validationSchema: advancedSchema,
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
        error={isError("nickName")}
        label="Nama panggilan"
        name="nickName"
        helperText={helperText("nickName")}
        onBlur={handleBlur}
        value={values.nickName}
        onChange={handleChange}
      />
      <FormControl className="col-span-4 sm:col-span-2">
        <InputLabel>Agama</InputLabel>
        <Select
          label="Agama"
          name="religion"
          onBlur={handleBlur}
          value={values.religion}
          onChange={handleChange}
          required
        >
          {[
            "ISLAM",
            "KRISTEN",
            "HINDU",
            "BUDHA",
            "KATHOLIK",
            "KONGHUCHU",
            "LAINNYA",
          ].map((item) => (
            <MenuItem key={item} value={item}>
              <span className="capitalize">{item.toLowerCase()}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("nationality")}
        label="Kewarganegaraan"
        name="nationality"
        helperText={helperText("nationality")}
        onBlur={handleBlur}
        value={values.nationality}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("birthPosition")}
        label="Urutan kelahiran dalam keluarga"
        placeholder="Contoh: Jika anak pertama, isi dengan 1"
        name="birthPosition"
        helperText={helperText("birthPosition")}
        onBlur={handleBlur}
        value={values.birthPosition}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("siblingCount")}
        name="siblingCount"
        label="Jumlah anak kandung dalam keluarga"
        helperText={helperText("siblingCount")}
        onBlur={handleBlur}
        value={values.siblingCount}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("stepSiblingCount")}
        label="Jumlah saudara tiri"
        name="stepSiblingCount"
        helperText={helperText("stepSiblingCount")}
        onBlur={handleBlur}
        value={values.stepSiblingCount}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("fosterSiblingCount")}
        label="Jumlah saudara angkat"
        name="fosterSiblingCount"
        helperText={helperText("fosterSiblingCount")}
        onBlur={handleBlur}
        value={values.fosterSiblingCount}
        onChange={handleChange}
      />
      <FormControl className="col-span-4 sm:col-span-2">
        <InputLabel>Status dalam keluarga</InputLabel>
        <Select
          label="Status dalam keluarga"
          name="familyStatus"
          onBlur={handleBlur}
          value={values.familyStatus}
          onChange={handleChange}
          required
        >
          {[
            "ADOPSI",
            "ANGKAT",
            "KANDUNG",
            "PIATU",
            "YATIM",
            "YATIM_PIATU",
            "LAINNYA",
          ].map((item) => (
            <MenuItem key={item} value={item}>
              <span className="capitalize">{item.toLowerCase()}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("motherLanguage")}
        label="Bahasa yang digunakan di rumah"
        name="motherLanguage"
        helperText={helperText("motherLanguage")}
        onBlur={handleBlur}
        value={values.motherLanguage}
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

export default AdvancedForm;
