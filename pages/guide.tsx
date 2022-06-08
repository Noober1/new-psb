import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { NextSeo } from "next-seo";
import Head from "next/head";
import React, { ReactElement } from "react";
import Link from "../components/atoms/Link";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";

const GuidePage: MainLayoutType = () => {
  return (
    <Container className="mt-6" maxWidth="xl" component="article">
      <Paper className="p-5" component="section">
        <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
          Panduan Pendaftaran
        </Typography>
        <Divider />
        <Box className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
          <Box>
            <Typography
              component="h2"
              variant="h5"
              fontWeight="bold"
              gutterBottom
            >
              Persyaratan Pendaftaran
            </Typography>
            <ul>
              <li>Mempunyai Nomor Induk Siswa Nasional(NISN)</li>
              <li>
                Mempunyai Email dan No. Telpon yang aktif dan dapat dihubungi
              </li>
            </ul>
          </Box>
          <Box>
            <Typography
              component="h2"
              variant="h5"
              fontWeight="bold"
              gutterBottom
            >
              Pendaftaran
            </Typography>
            <Typography textAlign="justify">
              Silahkan buka halaman pendaftaran(registrasi) pada halaman{" "}
              <Link href="/" title="Halaman utama">
                home
              </Link>{" "}
              atau{" "}
              <Link href="/register" title="Registrasi">
                click disini
              </Link>{" "}
              untuk melakukan pendaftaran. Setelah pendaftaran selesai, anda
              akan diarahkan ke halaman login.
            </Typography>
          </Box>
          <Box>
            <Typography
              component="h2"
              variant="h5"
              fontWeight="bold"
              gutterBottom
            >
              Pengisian Formulir
            </Typography>
            <Typography textAlign="justify">
              Setelah anda melakukan pendaftaran dan melakukan login, silahkan
              untuk melengkapi data-data pribadi anda pada halaman{" "}
              <Link href="/profile" title="Profile">
                profile
              </Link>
              . Pastikan untuk melengkapi data sesuai dengan kategori data yang
              ada.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

GuidePage.getLayout = (page: ReactElement) => (
  <>
    <NextSeo
      title="Panduan Pendaftaran Siswa Baru"
      description="Petunjuk dan informasi Pendaftaran Siswa Baru(PSB) di SMK Bina Taruna Jalancagak"
    />
    <MainLayout>{page}</MainLayout>
  </>
);

export default GuidePage;
