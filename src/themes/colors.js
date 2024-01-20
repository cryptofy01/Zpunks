export const getAlphaInHex = (number) => {
  const hex = Math.round(number * 255).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

export const getColorWithAlpha = (color, number) => {
  return color + getAlphaInHex(number);
};

export const colors = {
  blueGradientStart: "#524741",
  blueGradientEnd: "#c69c6c",
  darkCard: "#000000",
  navButtonActive: "#0DE3F5",
  bronzeStart: "#A66948",
  bronzeEnd: "#E6CDB6",
  silverStart: "#929292",
  silverEnd: "#F1F2F8",
  goldStart: "#F2C400",
  goldEnd: "#FFF0B3",
};
