import { alpha, Fade, Paper, PaperProps } from "@mui/material";
import clsx from "clsx";
import { FunctionComponent, ReactElement, ReactNode, useState } from "react";
import LoadingLogo from "./LoadingLogo";

export type PaperWithLoadingOverlay = PaperProps & {
  children: ReactElement | ReactNode | string;
  className?: string;
  showOverlay?: boolean;
};

const PaperWithLoadingOverlay: FunctionComponent<PaperWithLoadingOverlay> = ({
  children,
  className,
  showOverlay = false,
}) => {
  return (
    <Paper className={clsx("relative", className)}>
      {children}
      <Fade in={showOverlay}>
        <Paper
          className="absolute inset-0 flex items-center justify-center overflow-hidden none"
          sx={{
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.75),
          }}
        >
          <LoadingLogo progress={showOverlay ? 0 : 100} />
        </Paper>
      </Fade>
    </Paper>
  );
};

export default PaperWithLoadingOverlay;
