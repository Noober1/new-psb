import {
  Box,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { ReactElement } from "react";
import MainLayout, { MainLayoutType } from "../../components/layouts/Main";

const EditProfile: MainLayoutType = () => {
  return (
    <Container maxWidth="xl" className="mt-24">
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Edit Profile
      </Typography>
      <Paper className="py-5">
        <Typography className="px-5 mb-5">
          Silahkan untuk melengkapi data dibawah ini. Kolom isian yang mempunya
          tanda * harus diisi.
        </Typography>
        <Divider className="mb-5 font-bold">Identitas Dasar</Divider>
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          <TextField
            name="firstName"
            label="Nama depan"
            placeholder="Nama depan"
          />
          <TextField
            name="lastName"
            label="Nama belakang"
            placeholder="Nama belakang"
          />
          <TextField
            name="email"
            label="Alamat surel/email"
            placeholder="Email"
            helperText="Alamat surel tidak dapat dirubah"
            disabled
          />
          <TextField name="birthPlace" label="test" placeholder="Birth place" />
          <TextField name="birthDate" label="test" placeholder="Birth date" />
          <TextField
            name="sex"
            label="Jenis kelamin"
            placeholder="Jenis kelamin"
          />
          <TextField
            name="lastEducation"
            label="Pendidikan terakhir"
            placeholder="Pendidikan terakhir"
          />
          <TextField
            name="lastEducationSchool"
            label="Asal sekolah"
            placeholder="Asal sekolah"
          />
          <TextField
            name="selectedMajor"
            label="Jurusan yang dipilih"
            placeholder="Jurusan yang dipilih"
          />
        </Box>
        <Divider className="font-bold">Nomor Identitas</Divider>
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          <TextField
            name="nisn"
            label="No. Induk Siswa Nasional(NISN)"
            placeholder="NISN"
          />
          <TextField
            name="phone"
            label="No. Telpon/Handphone"
            placeholder="No. Telpon"
          />
          <TextField name="kipkps" label="No. KIP/KPS" placeholder="KIP/KPS" />
          <TextField
            name="examNumber"
            label="No. Ujian nasional"
            placeholder="No. Ujian nasional"
          />
          <TextField
            name="certificateNumber"
            label="No. Ijazah"
            placeholder="No. Ijazah"
          />
          <TextField
            name="skhun"
            label="No. Surat Keterangan Hasil Ujian Nasional(SKHUN)"
            placeholder="SKHUN"
          />
        </Box>
        <Divider className="font-bold">Lanjutan</Divider>
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          <TextField
            name="nickname"
            label="Nama panggilan"
            placeholder="nickname"
          />
          <TextField name="religion" label="Agama" placeholder="Agama" />
          <TextField
            name="nationality"
            label="Kewarganegaraan"
            placeholder="Kewarganegaraan"
          />
          <TextField
            name="childPosition"
            label="Anak ke?"
            placeholder="Jika anak ke 1, isi dengan 1"
          />
          <TextField
            name="siblingCount"
            label="Jumlah saudara kandung"
            placeholder="saudara kandung"
          />
          <TextField
            name="stepSiblingCount"
            label="Jumlah saudara tiri"
            placeholder="Saudara tiri"
          />
          <TextField
            name="adoptedSiblingCount"
            label="Jumlah saudara angkat"
            placeholder="Saudara angkat"
          />
          <TextField
            name="familyStatus"
            label="Status di keluarga"
            placeholder="Angkat, tiri, adopsi, dll"
          />
          <TextField
            name="motherLanguage"
            label="Bahasa yang digunakan dirumah"
            placeholder="Bahasa dirumah"
          />
        </Box>
        <Divider className="font-bold">Alamat</Divider>
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          <TextField
            name="addressStreet"
            label="Jalan/kampung/dusun"
            placeholder="Alamat jalan"
          />
          <TextField
            name="addressProvince"
            label="Provinsi"
            placeholder="Alamat provinsi"
          />
          <TextField
            name="addressCity"
            label="Kabupaten/Kota"
            placeholder="Alamat Kabupaten/Kota"
          />
          <TextField
            name="addressDistrict"
            label="Kecamatan"
            placeholder="Kecamatan"
          />
          <TextField
            name="addressVillage"
            label="Kampung/desa"
            placeholder="Alamat Kampung/Desa"
          />
          <TextField
            name="postalCode"
            label="Kode POS"
            placeholder="Kode POS"
          />
        </Box>
        <Divider className="font-bold">Tambahan</Divider>
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          <TextField
            name="livingWith"
            label="Tinggal bersama"
            placeholder="Contoh: sendiri, orang tua, saudara, dll"
          />
          <TextField
            name="height"
            label="Tinggi badan(CM)"
            placeholder="Dalam satuan sentimeter"
          />
          <TextField
            name="weight"
            label="Berat badan(KG)"
            placeholder="Dalam satuan kilogram"
          />
          <TextField
            name="homeToSchoolDistance"
            label="Jarak dari rumah ke sekolah"
            placeholder="Dalam satuan kilometer"
          />
          <TextField
            name="bloodType"
            label="Golongan darah"
            placeholder="goldar"
          />
          <TextField
            name="seriousDisease"
            label="Penyakit berat yang pernah diderita"
            placeholder="Penyakit berat"
          />
          <TextField
            name="relapsingDisease"
            label="Penyakit kambuhan"
            placeholder="Penyakit yang sering kambuh"
          />
        </Box>
        <Divider className="font-bold">Informasi Ayah</Divider>
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          <TextField
            name="fatherName"
            label="Nama lengkap ayah"
            placeholder="Nama lengkap ayah"
          />
        </Box>
      </Paper>
    </Container>
  );
};

EditProfile.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default EditProfile;
