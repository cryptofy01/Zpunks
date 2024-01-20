import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const QuoteBlock = ({ children, sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "fit-content",
        ...sx,
      }}
    >
      <Box
        sx={{
          minWidth: "5px",
          height: "fill",
          backgroundColor: "red",

          background: `linear-gradient(134.29deg, #c69c6c 0%, #524741 100%)`,
          borderRadius: "2px",
          mr: "2em",
        }}
      />
      <Typography
        variant={"subtitle1"}
        sx={{
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "21px",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

QuoteBlock.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default QuoteBlock;
