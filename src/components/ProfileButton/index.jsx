import { Avatar, Menu, MenuItem, useTheme } from "@mui/material";
import getShortenedWallet from "../../utils/StringUtils/shortWallet";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import useBlockies from "../../hooks/useBlockies";
import useWalletContext from "../../hooks/useWalletContext";
import { getAlphaInHex } from "../../themes/colors";

const logo = new URL(
  "../../../public/logo-no-text.png?as=webp",
  import.meta.url
).href;

const ProfileButton = () => {
  const theme = useTheme();
  const walletContext = useWalletContext();
  const [canvas, setCanvas] = useState(null);
  const blockies = useBlockies(walletContext?.address, canvas);
  const canvasRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(undefined);
  };

  useEffect(() => {
    setCanvas(canvasRef);
  }, [walletContext?.address, canvasRef]);

  return (
    <>
      <Box
        id="profile-button"
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          border: (theme) => "1px solid " + theme.palette.divider,
          padding: "4px",
          //paddingRight: "12px",
          borderRadius: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 1,
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            background: "#ffffff" + getAlphaInHex(0.2),
          },
          [theme.breakpoints.down("md")]: {
            fontSize: "0.7rem",
          },
        }}
      >
        <Avatar
          src={blockies}
          sx={{
            border: (theme) => "1px solid " + theme.palette.divider,
            width: "32px",
            height: "32px",
          }}
        />
        {getShortenedWallet(walletContext.address)}
        <Avatar
          src={logo}
          sx={{
            //border: (theme) => "1px solid " + theme.palette.divider,
            width: "34px",
            height: "34px",
          }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </Box>

      <Menu
        sx={{
          "& .MuiPaper-root": {
            minWidth: "240px",
            backgroundColor: (theme) =>
              theme.palette.background.default + getAlphaInHex(0.1),
            backdropFilter: "blur(4px)",
          },
        }}
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}
      >
        {/*<MenuItem onClick={handleClose}>Manage Factory</MenuItem>
                    <MenuItem onClick={handleClose}>Manage My Farms</MenuItem>*/}
        <MenuItem
          onClick={() => {
            handleClose();
            walletContext.requestDisconnect();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileButton;
