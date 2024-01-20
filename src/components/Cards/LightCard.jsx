import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { getColorWithAlpha } from "../../themes/colors";

const LightCard = ({ children, sx, ...rest }) => {
  return (
    <Box
      sx={{
        backgroundColor: getColorWithAlpha("#FFFFFF", 0.1),
        borderRadius: "8px",
        backdropFilter: "blur(15px)",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

LightCard.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  rest: PropTypes.object,
};

export default LightCard;
