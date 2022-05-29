import { Box, Fab, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import useToggleDarkMode from "../hooks/useToggleDarkMode";
import Logo from "./Logo";

const LoadingLogo = ({
  progress: progressValue,
  enableDarkModeToggle = false,
}: {
  progress?: number;
  enableDarkModeToggle?: boolean;
}) => {
  const [progress, setProgress] = useState<number>(10);
  const [themeType, handleToggleDarkMode] = useToggleDarkMode();
  const isDarkMode = themeType === "dark";

  useEffect(() => {
    const timer = setInterval(() => {
      const random = Math.floor(Math.random() * 20) + 5;
      setProgress((prevProgress) => {
        const addProgress = prevProgress + random;
        const newProgress = addProgress > 100 ? 100 : addProgress;
        return prevProgress >= 100 ? 0 : newProgress;
      });
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (progressValue) {
      setProgress(progressValue);
    }
  }, [progressValue]);

  const handleClickLogo = () => {
    if (enableDarkModeToggle) {
      handleToggleDarkMode();
    }
  };

  return (
    <Box className="relative">
      <Fab
        size="large"
        className="shadow-none"
        color="primary"
        onClick={handleClickLogo}
      >
        <Logo className="h-10 -mt-1" />
      </Fab>
      <CircularProgress
        color={isDarkMode ? "secondary" : "primary"}
        size={80}
        className="absolute -top-3 -left-3"
        variant="determinate"
        value={progress}
      />
    </Box>
  );
};

export default LoadingLogo;
