import { Box, IconButton, Avatar, CircularProgress } from "@mui/material";
import React, { ReactElement, FunctionComponent } from "react";

export interface ProfileIcon {
  showBorder?: boolean;
  children?: ReactElement | string | null;
  onClick?: () => void;
}

const ProfileIcon: FunctionComponent<ProfileIcon> = ({
  showBorder,
  children,
  onClick,
}) => {
  return (
    <Box>
      <IconButton className="relative" onClick={onClick}>
        <Avatar
          sx={{
            backgroundColor: (theme) => theme.palette.secondary.main,
            color: (theme) => theme.palette.primary.main,
          }}
          className="font-bold"
        >
          {children}
        </Avatar>
        <CircularProgress
          thickness={2.5}
          color="secondary"
          className="absolute"
          variant="determinate"
          value={showBorder ? 100 : 0}
          size={50}
        />
      </IconButton>
    </Box>
  );
};

ProfileIcon.defaultProps = {
  showBorder: false,
};

export default ProfileIcon;
