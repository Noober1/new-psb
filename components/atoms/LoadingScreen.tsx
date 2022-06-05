import { Box, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/system";
import clsx from "clsx";
import LoadingLogo from "./LoadingLogo";
import { FunctionComponent } from "react";

interface LoadingScreen {
  backgroundOpacity?: number;
  position?: "initial" | "fixed";
  text?: string;
}

const LoadingScreen: FunctionComponent<LoadingScreen> = ({
  backgroundOpacity,
  position,
  text,
}) => {
  return (
    <Box
      className={clsx(
        position == "fixed" && "fixed inset-0",
        "w-screen h-screen flex items-center flex-col justify-center overflow-hidden m-0 p-0"
      )}
      bgcolor={(theme) =>
        alpha(theme.palette.background.paper, backgroundOpacity || 1)
      }
      zIndex={(theme) => theme.zIndex.appBar}
    >
      <LoadingLogo progress={0} enableDarkModeToggle />
      <Typography className="mt-5" variant="h4" textTransform="capitalize">
        {text}
      </Typography>
    </Box>
  );
};

LoadingScreen.defaultProps = {
  backgroundOpacity: 1,
  position: "initial",
  text: "",
};

export default LoadingScreen;
