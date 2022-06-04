import { Button, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { ReactElement, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import PaperWithLoadingOverlay from "../components/atoms/PaperWithLoadingOverlay";
import ProfileIcon from "../components/atoms/ProfileIcon";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";
import ServerSideSelect from "../components/organisms/ServerSideSelect";
import { openSnackbar } from "../lib/redux/slices/noPersistConfig";

const TestPage: MainLayoutType = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [showBorderProfile, setshowBorderProfile] = useState<boolean>(false);
  const [getServerSideSelect, setgetServerSideSelect] = useState<any>("");
  const handleOpenSnackbar = () => {
    dispatch(
      openSnackbar({
        positionX: "center",
        message: "Hello World",
        severity: "success",
      })
    );
  };

  useEffect(() => {
    let profileTimeout = setTimeout(() => {
      setshowBorderProfile(false);
    }, 5000);

    return () => {
      clearTimeout(profileTimeout);
    };
  }, [showBorderProfile]);

  useEffect(() => {
    console.log(getServerSideSelect);
  }, [getServerSideSelect]);

  return (
    <div className="mt-24 mx-4">
      <PaperWithLoadingOverlay>
        tfsdfsdfsdff
        <br />
        tfsdfsdfsdff
        <br />
        tfsdfsdfsdff
        <br />
        tfsdfsdfsdff
        <br />
        tfsdfsdfsdff
        <br />
      </PaperWithLoadingOverlay>
      <ProfileIcon
        onClick={() => setshowBorderProfile(true)}
        showBorder={showBorderProfile}
      >
        T
      </ProfileIcon>
      <Button onClick={handleOpenSnackbar}>Open snackbar</Button>
      <ServerSideSelect
        fullWidth
        placeholder="Silahkan pilih"
        valueSelector="id"
        labelSelector="text"
        resultDataKey="results"
        url="https://sas.binataruna.sch.id/AJAX/PSB_getjurusan"
        onChange={(event, value) => setgetServerSideSelect(value)}
      />
      {/* <Typography>ServerSideSelect value: {getServerSideSelect}</Typography> */}
      <Button onClick={() => setgetServerSideSelect("Teknik Kendaraan Ringan")}>
        Testing
      </Button>
      <Button onClick={() => queryClient.removeQueries("user-data")}>
        remove user data
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const production = process.env.NODE_ENV === "production";
  if (production) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

TestPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default TestPage;
