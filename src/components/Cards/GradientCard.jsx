import Box from "@mui/material/Box";
import { getColorWithAlpha } from "../../themes/colors";
import PropTypes from "prop-types";

const GradientCard = ({ children, sx, startColor, endColor }) => {
  const startWithAlpha = getColorWithAlpha(startColor, 0.1);
  const endWithAlpha = getColorWithAlpha(endColor, 0.1);

  return (
    <Box
      sx={{
        p: "4px",
        ...sx,
      }}
    >
      <Box
        sx={{
          p: 1,
          pr: "12px",
          background: `linear-gradient(134.29deg, ${startWithAlpha} 0%, ${endWithAlpha} 100%)`,
          height: "100%",
          width: "100%",
          borderRadius: "16px",
          position: "relative",
          "&:before": {
            height: "100%",
            width: "100%",
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: -1,
            padding: "2px",
            margin: "-2px" /* !importanté */,
            borderRadius: "inherit" /* !importanté */,
            background: `linear-gradient(134.29deg, ${startColor} 0%, ${endColor} 100%)`,
            "-webkit-mask":
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            mask: "linear-gradient(#fff 0 0) content-box,                linear-gradient(#fff 0 0)",
            "-webkit-mask-composite": "xor",
            "mask-composite": "exclude",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

GradientCard.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  startColor: PropTypes.string,
  endColor: PropTypes.string,
  rest: PropTypes.object,
};

export default GradientCard;
