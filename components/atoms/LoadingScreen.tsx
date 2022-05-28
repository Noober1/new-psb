import { Box, Paper } from "@mui/material";
import LoadingLogo from "./LoadingLogo";

const LoadingScreen = () => {
  return (
    <Paper className="rounded-none">
      <Box className="w-screen h-screen flex items-center justify-center overflow-hidden">
        <LoadingLogo progress={0} />
      </Box>
    </Paper>
  );
};

export default LoadingScreen;
