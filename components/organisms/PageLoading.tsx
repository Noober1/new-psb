import { Backdrop, Typography } from "@mui/material";
import LoadingLogo from "../atoms/LoadingLogo";
import useLoadingScreen from "../hooks/useLoadingScreen";

const PageLoading = () => {
  const [isLoading, , , text] = useLoadingScreen();
  useLoadingScreen;

  return (
    <Backdrop
      open={isLoading}
      className="flex items-center flex-col"
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}
    >
      <LoadingLogo enableDarkModeToggle />
      <Typography
        className="mt-5 cursor-default"
        variant="h5"
        textTransform="capitalize"
        sx={{
          color: (theme) => theme.palette.primary.contrastText,
        }}
      >
        {text}
      </Typography>
    </Backdrop>
  );
};

export default PageLoading;
