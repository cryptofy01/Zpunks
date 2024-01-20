import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { truncNumber } from "../../utils/NumberUtils/formatNumbers";

const CardToken = ({ imgUrl, title, minDeposit, symbol }) => {
  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(6px)",
        p: "1em",
        textAlign: "center",
      }}
    >
      <img src={imgUrl} height={38} />
      <Typography
        sx={{
          fontSize: "21px",
          lineHeight: "28px",
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: 300,
        }}
      >
        Min Deposit ({truncNumber(minDeposit, 2)} {symbol})
      </Typography>
    </Box>
  );
};

CardToken.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  minDeposit: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
};

export default CardToken;
