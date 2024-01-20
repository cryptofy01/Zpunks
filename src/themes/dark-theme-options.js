// Colors

import { colors, getAlphaInHex } from "./colors";

const neutral = {
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",
  500: "#6B7280",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
};
const background = {
  default: neutral[900],
  paper: neutral[800],
  contrast: neutral[200],
  contrastText: neutral[900],
};

const divider = "rgba(255,255,255,0.2)";

const primary = {
  light: colors.blueGradientEnd,
  main: colors.blueGradientStart,
  dark: "#f5c547",
  contrastText: neutral[200],
};

const secondary = {
  main: "#479E6A",
  light: "#A0D6B6",
  dark: "#70BA8F",
  contrastText: neutral[100],
};

const success = {
  main: "#14B8A6",
  light: "#43C6B7",
  dark: "#0E8074",
  contrastText: neutral[900],
};

const info = {
  main: "#2196F3",
  light: "#64B6F7",
  dark: "#0B79D0",
  contrastText: neutral[900],
};

const warning = {
  main: "#FFB020",
  light: "#FFBF4C",
  dark: "#B27B16",
  contrastText: neutral[900],
};

const error = {
  main: "#F44336",
  light: "#E57373",
  dark: "#D32F2F",
  contrastText: neutral[100],
};

const text = {
  main: "#EDF2F7",
  primary: "#EDF2F7",
  secondary: "#A0AEC0",
  disabled: "rgba(255, 255, 255, 0.48)",
  contrastText: "#2e2e2e",
  buttonText: "#EDF2F7",
};

const darkThemeOptions = {
  palette: {
    stripio: {
      subtitle: "#9D9AA7",
      navPrimary: "#969AA4",
      navHoverColor: colors.navButtonActive,
      navHoverBg: colors.navButtonActive + getAlphaInHex(0.1),
    },
    action: {
      active: neutral[400],
      hover: "rgba(255, 255, 255, 0.04)",
      selected: "rgba(255, 255, 255, 0.08)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabled: "rgba(255, 255, 255, 0.26)",
    },
    background,
    divider,
    error,
    info,
    mode: "dark",
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: background.default,
          //backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // background: `linear-gradient(134.29deg, #c69c6c 0%, #524741 100%)`,
          borderRadius: "32px",
          fontWeight: 400,
          fontSize: "12px",
          textTransform: "none",
          border: `1px solid ${divider}`,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: text.primary,
            transform: "scale(0.9, 0.9)",
            color: text.contrastText,
          },
        },
      },
    },
  },
};

export default darkThemeOptions;
