import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import BarredProgress from "../Progress/BarredProgress";
import { useTheme } from "@mui/material";
import { colors } from "../../themes/colors";

const BlueButton = ({
  children,
  onClick,
  disabled,
  busy,
  sx,
  animate,
  ...rest
}) => {
  const theme = useTheme();
  //busy = busy || true;
  return (
    <Button
      onClick={onClick}
      disabled={disabled || busy}
      sx={{
        height: "fit-content",
        background: `linear-gradient(134.29deg, ${colors.blueGradientStart} 0%, ${colors.blueGradientEnd} 100%)`,
        color: (theme) => theme.palette.text.primary,
        //border: 'none',
        fontSize: "14px",
        lineHeight: "14px",
        border: `1px solid ${colors.blueGradientStart}`,
        p: "10px 20px",
        backgroundColor: colors.blueGradientStart,
        transition: "all 0.3s",
        [theme.breakpoints.down("sm")]: {
          p: "10px 15px",
        },
        "&:hover": {
          transform: animate ? 'scale("0.9,0.9")' : "unset",
          background: "unset",
          color: (theme) => theme.palette.text.primary,
          backgroundColor: "transparent",
          p: "10px 20px",
        },
        ...sx,
      }}
      {...rest}
    >
      {busy && <BarredProgress width={14} sx={{ mr: 1 }} />} {children}
    </Button>
  );
};

BlueButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  sx: PropTypes.object,
  busy: PropTypes.bool,
  rest: PropTypes.object,
  animate: PropTypes.bool,
};

export default BlueButton;
