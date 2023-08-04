import * as Yup from "yup";

const graduateYearMin = 1990;
const currentYear = new Date().getFullYear();

const parentEducationList = [
  "PAUD",
  "TK",
  "SD",
  "MI",
  "SMP",
  "MTS",
  "SMK",
  "SMA",
  "MA",
  "D1",
  "D2",
  "D3",
  "S1",
  "S2",
  "S3",
];

// template basic schema
const _basicSchema = {
  firstName: Yup.string()
    .max(45, "Panjang maksimal 45 karakter")
    .required("Nama depan harus diisi"),
  lastName: Yup.string().max(45, "Panjang maksimal 45 karakter"),
  email: Yup.string()
    .email("Format alamat surel(email) tidak valid")
    .max(50, "Panjang maksimal 50 karakter")
    .required("Email wajib diisi"),
  birthplace: Yup.string()
    .max(15, "Panjang maksimal 15 karakter")
    .required("Tempat lahir wajib diisi"),
  birthdate: Yup.date().required("Tanggal lahir wajib diisi"),
  schoolGraduateYear: Yup.number()
    .min(graduateYearMin)
    .max(currentYear)
    .required("Tahun lulus wajib diisi"),
  schoolId: Yup.number()
    .min(1, "Asal sekolah wajib diisi")
    .required("Asal sekolah wajib diisi"),
  majorId: Yup.number()
    .min(1, "Jurusan yang dipilih wajib diisi")
    .required("Jurusan yang dipilih wajib diisi"),
};

// basic profile schema
export const basicSchema = Yup.object().shape(_basicSchema);

// registration form schema
export const registerSchema = Yup.object().shape({
  ..._basicSchema,
  NISNNumber: Yup.string()
    .min(8, "Panjang digit minimal 8 digit")
    .max(10, "Panjang maksimal 10 karakter")
    .required("NISN wajib diisi"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]*$/, "Nomor telpon invalid")
    .max(15, "Panjang maksimal 15 digit angka tanpa simbol ataupun huruf")
    .required("Nomor telpon wajib diisi"),
});

// number form schema
export const numberSchema = Yup.object().shape({
  NISNNumber: Yup.string()
    .min(8, "Panjang digit minimal 8 digit")
    .max(10, "Panjang maksimal 10 karakter"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]*$/, "Nomor telpon invalid")
    .max(15, "Panjang maksimal 15 digit angka tanpa simbol ataupun huruf")
    .required("Nomor telpon wajib diisi"),
  KIPKPSNumber: Yup.string().max(14, "Panjang maksimal 14 karakter"),
  examNumber: Yup.string().max(25, "Panjang maksimal 25 karakter"),
  ijazahNumber: Yup.string().max(20, "Panjang maksimal 20 karakter"),
  SKHUNNumber: Yup.string().max(20, "Panjang maksimal 20 karakter"),
});

// andvance form schema
export const advancedSchema = Yup.object().shape({
  nickname: Yup.string().max(10, "Panjang maksimal 10 karakter"),
  religion: Yup.string().oneOf([
    "ISLAM",
    "KRISTEN",
    "HINDU",
    "BUDHA",
    "KATHOLIK",
    "KONGHUCHU",
    "LAINNYA",
  ]),
  nationality: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  fosterSiblingCount: Yup.number()
    .min(0, "Data tidak boleh negatif")
    .typeError("Data harus berupa angka"),
  birthPosition: Yup.number()
    .min(0, "Data tidak boleh negatif")
    .typeError("Data harus berupa angka"),
  familyStatus: Yup.string().oneOf([
    "ADOPSI",
    "ANGKAT",
    "KANDUNG",
    "PIATU",
    "YATIM",
    "YATIM_PIATU",
    "LAINNYA",
  ]),
  motherLanguage: Yup.string().max(20, "Panjang maksimal 20 karakter"),
  siblingCount: Yup.number()
    .typeError("Data harus berupa angka")
    .min(0, "Data tidak boleh negatif"),
  stepSiblingCount: Yup.number()
    .typeError("Data harus berupa angka")
    .min(0, "Data tidak boleh negatif"),
});

// address form schema
export const addressSchema = Yup.object().shape({
  street: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  village: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  district: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  city: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  province: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  postalCode: Yup.number()
    .typeError("Data harus berupa angka")
    .min(10000, "Kode POS terdiri dari 5 digit angka")
    .max(99999, "Kode POS terdiri dari 5 digit angka"),
});

// additional schema
export const additionalSchema = Yup.object().shape({
  livingWith: Yup.string().max(20, "Panjang maksimal 20 karakter"),
  weight: Yup.number()
    .typeError("Data harus berupa angka")
    .min(0, "Data tidak boleh negatif"),
  height: Yup.number()
    .typeError("Data harus berupa angka")
    .min(0, "Data tidak boleh negatif"),
  schoolDistance: Yup.number().min(0, "Data tidak boleh negatif"),
  bloodType: Yup.string()
    .oneOf(["A", "B", "AB", "O"], "Data tidak valid")
    .required("Data wajib diisi"),
  seriousIllness: Yup.string()
    .typeError("Data harus berupa angka")
    .max(50, "Panjang maksimal 50 karakter"),
  relapsingIllness: Yup.string()
    .typeError("Data harus berupa angka")
    .max(50, "Panjang maksimal 50 karakter"),
});

const _parentSchema = {
  fullname: Yup.string().max(50, "Panjang maksimal 50 karakter"),
  birthDate: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  nationality: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  education: Yup.string().oneOf(parentEducationList, "Data invalid"),
  job: Yup.string().max(20, "Panjang maksimal 20 karakter"),
  income: Yup.number()
    .max(9999999999, "Data tidak boleh lebih dari 999,999,999,999")
    .min(0, "Data tidak boleh negatif"),
  address: Yup.string().max(75, "Panjang maksimal 75 karakter"),
};

export const parentSchema = Yup.object().shape({
  fatherFullname: _parentSchema.fullname,
  fatherBirthDate: _parentSchema.birthDate,
  fatherNationality: _parentSchema.nationality,
  fatherLastEducation: _parentSchema.education,
  fatherJob: _parentSchema.job,
  fatherIncome: _parentSchema.income,
  fatherAddress: _parentSchema.address,
  motherFullname: _parentSchema.fullname,
  motherBirthDate: _parentSchema.birthDate,
  motherNationality: _parentSchema.nationality,
  motherLastEducation: _parentSchema.education,
  motherJob: _parentSchema.job,
  motherIncome: _parentSchema.income,
  motherAddress: _parentSchema.address,
});
