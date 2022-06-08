import { Container, Paper, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";

const About: MainLayoutType = () => {
  return (
    <Container className="pt-6">
      <Paper className="p-5">
        <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
          Tentang SMK Bina Taruna Jalancagak
        </Typography>
        <Typography component="p" variant="body1" className="mb-5">
          <strong>SMK Bina Taruna Jalancagak</strong> adalah sekolah menengah
          kejuruan yang berada di Kota Subang. Kami mempunyai{" "}
          <strong>5 kompetensi keahlian</strong>, yaitu:{" "}
          <strong>Teknik Kendaraan Ringan</strong>,{" "}
          <strong>Teknik Komputer dan Jaringan</strong>,{" "}
          <strong>Kuliner</strong>, <strong>Teknik Perkapalan</strong> dan{" "}
          <strong>Teknik dan Bisnis Sepeda Motor</strong> dan juga{" "}
          <strong>Akomodasi Perhotelan</strong>.
        </Typography>
        <Typography component="p" variant="body1" className="mb-5">
          Sekolah yang berdiri <strong>sejak tahun 2001</strong> ini telah
          menciptakan <strong>tenaga kerja professional</strong> yang
          berkualitas dan berpengalaman untuk <strong>berwirausaha</strong> dan
          mampu bersaing di dunia industri yang semakin maju.
        </Typography>
        <Typography component="h2" variant="h5" fontWeight="bold" gutterBottom>
          Situs Pendaftaran Siswa Baru
        </Typography>
        <Typography>
          Situs ini diciptakan untuk mempermudah siswa baru untuk melakukan
          pendaftaran secara daring.
        </Typography>
      </Paper>
    </Container>
  );
};

About.getLayout = (page: ReactElement) => (
  <>
    <NextSeo
      title="Tentang kami"
      description="Informasi tentang SMK Bina Taruna Jalancagak dan situs pendaftaran siswa baru"
    />
    <MainLayout>{page}</MainLayout>
  </>
);

export default About;
