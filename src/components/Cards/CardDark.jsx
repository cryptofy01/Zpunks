import PropTypes from "prop-types";
import { colors, getColorWithAlpha } from "../../themes/colors";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

const CardDark = ({ children, sx }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 2,
        width: "100%",
        backgroundColor: getColorWithAlpha(colors.darkCard, 0.35),
        boxShadow: "12px 12px 20px " + getColorWithAlpha(colors.darkCard, 0.2),
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        [theme.breakpoints.down("sm")]: {
          p: 1,
          borderRadius: "16px",
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

CardDark.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default CardDark;
