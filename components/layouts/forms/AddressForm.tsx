import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { runDevOnly } from "../../../lib";
import { addressSchema } from "../../../lib/formSchema";
import { formError } from "../../../lib/formUtils";
import { StudentBio } from "../../../types/bio";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import ServerSideSelect from "../../organisms/ServerSideSelect";

export interface AddressFormValues {
  street?: string;
  village?: string;
  district?: string;
  city?: string;
  province?: string;
  postalCode?: number | "";
}

const AddressForm = ({ data: userBio }: { data: StudentBio }) => {
  // address form states
  const [provinces, setprovinces] = useState<string | null>(
    userBio?.address.province.code || null
  );
  const [city, setcity] = useState<string | null>(
    userBio?.address.city.code || null
  );
  const [district, setdistrict] = useState<string | null>(
    userBio?.address.district.code || null
  );

  const initialValues: AddressFormValues = {
    street: userBio?.address.street || "",
    province: userBio?.address.province.code || "",
    village: userBio?.address.village.code || "",
    district: userBio?.address.district.code || "",
    city: userBio?.address.city.code || "",
    postalCode: userBio?.address.postalCode || "",
  };

  const [loadingScreen, openLoadingScreen, closeLoadingScreen] =
    useLoadingScreen();

  const submitForm = (
    values: AddressFormValues,
    action: FormikHelpers<AddressFormValues>
  ) => {
    runDevOnly(() => {
      console.log(values);
    });
    openLoadingScreen("Menyimpan data");
    setTimeout(() => {
      closeLoadingScreen();
      action.setSubmitting(false);
    }, 5000);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addressSchema}
      onSubmit={submitForm}
    >
      {({
        handleSubmit,
        handleBlur,
        isSubmitting,
        handleChange,
        values,
        errors,
        setFieldValue,
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
              error={isError("street")}
              label="Jalan/kampung/dusun"
              name="street"
              helperText={helperText("street")}
              placeholder="Contoh:Jl. Semanggi No. 1 RT. 001/RW. 001"
              onBlur={handleBlur}
              value={values.street}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("postalCode")}
              label="Kode POS"
              name="postalCode"
              helperText={helperText("postalCode")}
              placeholder="Kode POS"
              onBlur={handleBlur}
              value={values.postalCode}
              onChange={handleChange}
            />
            <Box className="col-span-4">
              <Typography>
                Catatan: Silahkan untuk mengisi Provinsi terlebih dahulu.
              </Typography>
            </Box>
            <div className="col-span-4 md:col-span-2">
              <ServerSideSelect
                error={isError("province")}
                helperText={helperText("province")}
                value={values.province}
                onBlur={handleBlur}
                label="Provinsi"
                placeholder="Provinsi"
                valueSelector="id"
                labelSelector="text"
                resultDataKey="results"
                url="https://sas.binataruna.sch.id/AJAX/Address_provinces"
                onChange={(event, value) => {
                  setFieldValue("province", value);
                  setprovinces(value);
                }}
                required
              />
            </div>
            {provinces && (
              <div className="col-span-4 md:col-span-2">
                <ServerSideSelect
                  error={isError("city")}
                  helperText={helperText("city")}
                  value={values.city}
                  onBlur={handleBlur}
                  label="Kota/Kabupaten"
                  placeholder="Kota/Kabupaten"
                  valueSelector="id"
                  labelSelector="text"
                  resultDataKey="results"
                  url={`https://sas.binataruna.sch.id/AJAX/Address_regencies?id=${provinces}`}
                  onChange={(event, value) => {
                    setFieldValue("city", value);
                    setcity(value);
                  }}
                  required
                />
              </div>
            )}
            {city && (
              <div className="col-span-4 md:col-span-2">
                <ServerSideSelect
                  error={isError("district")}
                  helperText={helperText("district")}
                  value={values.district}
                  onBlur={handleBlur}
                  label="Desa/Kecamatan"
                  placeholder="Desa/Kecamatan"
                  valueSelector="id"
                  labelSelector="text"
                  resultDataKey="results"
                  url={`https://sas.binataruna.sch.id/AJAX/Address_districts?id=${city}&province=${provinces}`}
                  onChange={(event, value) => {
                    setFieldValue("district", value);
                    setdistrict(value);
                  }}
                  required
                />
              </div>
            )}
            {district && (
              <div className="col-span-4 md:col-span-2">
                <ServerSideSelect
                  error={isError("village")}
                  helperText={helperText("village")}
                  value={values.village}
                  onBlur={handleBlur}
                  label="Kampung/Desa"
                  placeholder="Kampung/Desa"
                  valueSelector="id"
                  labelSelector="text"
                  resultDataKey="results"
                  url={`https://sas.binataruna.sch.id/AJAX/Address_villages?id=${district}&city=${city}&province=${provinces}`}
                  onChange={(event, value) => {
                    setFieldValue("village", value);
                  }}
                  required
                />
              </div>
            )}
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

export default AddressForm;
