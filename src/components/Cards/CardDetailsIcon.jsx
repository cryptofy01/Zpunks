import Box from "@mui/material/Box";
import DetailsTitle from "../Typography/DetailsTitle";
import DetailsValue from "../Typography/DetailsValue";
import PropTypes from "prop-types";

const CardDetailsIcon = ({ icon, title, value, tooltip, dolarValue, sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        ...sx,
      }}
    >
      {icon && (
        <Box
          sx={{
            p: 1,
            borderRadius: "50%",
            backgroundColor: (theme) => theme.palette.divider,
            color: (theme) => theme.palette.text.primary,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            display: "flex",
            alignItems: "center",
            height: "fit-content",
            width: "fit-content",
          }}
        >
          {icon}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DetailsTitle size={"medium"} sx={{ mb: "2px" }} tooltip={tooltip}>
          {title}
        </DetailsTitle>
        <DetailsValue
          sx={{
            fontSize: "15.75px",
          }}
        >
          {value}
        </DetailsValue>
        {dolarValue && (
          <DetailsTitle size={"small"}>
            {typeof dolarValue === "string" ? `($${dolarValue})` : dolarValue}
          </DetailsTitle>
        )}
      </Box>
    </Box>
  );
};

CardDetailsIcon.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  dolarValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  sx: PropTypes.object,
};

export default CardDetailsIcon;
