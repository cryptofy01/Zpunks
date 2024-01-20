import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";

const TitleHeading = ({ children, sx, ...props }) => {
  const theme = useTheme();

  return (
    <Typography
      component={"h1"}
      sx={{
        fontFamily: "Poppins",
        fontWeight: 600,
        fontSize: "18px",
        lineHeight: "31.5px",
        letterSpacing: "-0.005em",
        textTransform: "capitalize",
        [theme.breakpoints.down("md")]: {
          fontSize: "16px",
          lineHeight: "26px",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

TitleHeading.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  props: PropTypes.object,
};

export default TitleHeading;
