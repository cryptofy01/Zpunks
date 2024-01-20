import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";

const SubTitleHeading = ({ children, sx, ...props }) => {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        fontWeight: 400,
        fontSize: "15px",
        lineHeight: "8.25px",
        color: (theme) => theme.palette.stripio.subtitle,
        [theme.breakpoints.down("sm")]: {
          fontSize: "14px",
          lineHeight: "7px",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

SubTitleHeading.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  props: PropTypes.object,
};

export default SubTitleHeading;
