import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Tooltip, useTheme } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Box from "@mui/material/Box";

const sizes = {
  small: "10px",
  medium: "12px",
  large: "14px",
};
const lineHeight = {
  small: "8px",
  medium: "8.75px",
  large: "12px",
};

const DetailsTitle = ({ children, tooltip, sx, size }) => {
  const fontSize = sizes[size] || sizes["large"];
  const lineHeights = lineHeight[size] || lineHeight["large"];

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        gap: "4px",
        alignItems: "center",
        ...sx,
      }}
    >
      <Typography
        variant={"subtitle1"}
        sx={{
          fontWeight: 400,
          fontSize: fontSize,
          lineHeight: lineHeights,
          color: (theme) => theme.palette.stripio.subtitle,
          p: 0,
        }}
      >
        {children}
      </Typography>
      {tooltip && (
        <Tooltip title={tooltip} placement={"right"}>
          <Box sx={{ height: "100%", display: "flex" }}>
            <FeatherIcon
              style={{ margin: "auto" }}
              stroke={theme.palette.stripio.subtitle}
              icon={"info"}
              size={16}
            />
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

DetailsTitle.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  tooltip: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default DetailsTitle;
