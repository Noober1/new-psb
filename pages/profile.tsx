import {
  Avatar,
  Box,
  Container,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { ReactElement } from "react";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";

const ProfilePage: MainLayoutType = () => {
  return (
    <Container className="mt-5 grid grid-cols-1 gap-4">
      <Paper className="px-1">
        <Box
          alignItems="center"
          className="flex items-center justify-between p-2"
        >
          <Box className="flex items-center gap-1">
            <IconButton>
              <BackIcon />
            </IconButton>
            <Typography variant="h6">Profile</Typography>
          </Box>

          <Box>
            <Avatar>A</Avatar>
          </Box>
        </Box>
      </Paper>
      <Paper>ccc</Paper>
    </Container>
  );
};

ProfilePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const hasSession = await getSession(context);

  if (!hasSession) {
    return {
      redirect: {
        destination: "/login?redirectTo=" + encodeURI(context.resolvedUrl),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ProfilePage;
