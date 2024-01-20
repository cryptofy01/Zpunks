import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

/**
 * @param children
 * @param sx
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
const DetailsValue = ({ children, sx, ...rest }) => {
  return (
    <Typography
      variant={"subtitle2"}
      sx={{
        fontWeight: 700,
        fontSize: "18px",
        lineHeight: "25px",
        color: (theme) => theme.palette.text.primary,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

DetailsValue.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  rest: PropTypes.object,
};

export default DetailsValue;
