import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { IconButton, Tooltip, useMediaQuery } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import useConfigs from "../../hooks/useConfigs";
import ConnectButton from "../../components/ConnectButton";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/system";

const Header = ({ toggleOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { configs, saveConfigs } = useConfigs();
  const { themeMode } = configs;
  return (
    <AppBar
      position={"static"}
      color={"secondary"}
      elevation={0}
      sx={{
        borderBottomColor: "divider",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
      }}
    >
      <Toolbar color={"primary.main"}>
        <IconButton sx={{ mr: 2 }} onClick={toggleOpen ? toggleOpen : () => {}}>
          <MenuIcon sx={{ color: "primary.contrastText" }} />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {!isMobile ? process.env.SITE_TITLE : ""}
        </Typography>
        <ConnectButton color={"primary"} />
        <IconButton
          //color={"text.main"}
          edge="end"
          aria-label="menu"
          onClick={() => {
            saveConfigs({
              themeMode: themeMode === "light" ? "dark" : "light",
            });
          }}
        >
          {themeMode === "dark" ? (
            <Tooltip title={"Switch to light mode"}>
              <LightModeOutlinedIcon color={"text"} />
            </Tooltip>
          ) : (
            <Tooltip title={"Switch to dark mode"}>
              <DarkModeOutlinedIcon color={"text"} />
            </Tooltip>
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  toggleOpen: PropTypes.func,
};

export default Header;
