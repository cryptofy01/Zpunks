import { IconButton, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const CircleIconButton = ({ icon, onClick, sx, ...props }) => {
  const theme = useTheme();
  return (
    <IconButton
      onClick={onClick}
      sx={{
        color: (theme) => theme.palette.text.primary,
        height: "fit-content",
        width: "fit-content",
        padding: "12px",
        borderRadius: "50%",
        border: (theme) => "1px solid " + theme.palette.divider,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: (theme) => theme.palette.divider,
        },
        [theme.breakpoints.down("sm")]: {
          padding: "8px",
        },
        ...sx,
      }}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

CircleIconButton.propTypes = {
  icon: PropTypes.node,
  onClick: PropTypes.func,
  props: PropTypes.object,
  sx: PropTypes.object,
};

export default CircleIconButton;
