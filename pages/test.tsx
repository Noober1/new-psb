import { Button, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PaperWithLoadingOverlay from "../components/atoms/PaperWithLoadingOverlay";
import ProfileIcon from "../components/atoms/ProfileIcon";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";
import ServerSideSelect from "../components/organisms/ServerSideSelect";
import { openSnackbar } from "../lib/redux/slices/noPersistConfig";

const TestPage: MainLayoutType = () => {
  const dispatch = useDispatch();
  const [showBorderProfile, setshowBorderProfile] = useState<boolean>(false);
  const [getServerSideSelect, setgetServerSideSelect] = useState<any>("");
  const handleOpenSnackbar = () => {
    dispatch(
      openSnackbar({
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
    </div>
  );
};

TestPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default TestPage;
