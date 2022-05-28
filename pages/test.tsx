import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import PaperWithLoadingOverlay from "../components/atoms/PaperWithLoadingOverlay";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";
import { openSnackbar } from "../lib/redux/slices/noPersistConfig";

const TestPage: MainLayoutType = () => {
  const dispatch = useDispatch();
  const handleOpenSnackbar = () =>
    dispatch(
      openSnackbar({
        message: "Hello World",
        severity: "success",
      })
    );
  return (
    <div className="w-full h-screen flex items-center justify-center">
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
    </div>
  );
};

TestPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default TestPage;
