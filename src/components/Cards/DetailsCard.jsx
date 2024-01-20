import LightCard from "./LightCard";
import DetailsTitle from "../Typography/DetailsTitle";
import DetailsValue from "../Typography/DetailsValue";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";

const DetailsCard = ({ title, value, tooltip, sx, ...rest }) => {
  const theme = useTheme();
  return (
    <LightCard
      sx={{
        padding: "12px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
          padding: "16px",
        },
        ...sx,
      }}
      {...rest}
    >
      <DetailsTitle sx={{ mb: "12px" }} tooltip={tooltip}>
        {title}
      </DetailsTitle>
      <DetailsValue>{value}</DetailsValue>
    </LightCard>
  );
};

DetailsCard.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
  sx: PropTypes.object,
  rest: PropTypes.object,
  tooltip: PropTypes.string,
};

export default DetailsCard;
