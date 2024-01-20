import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ConnectButton from "../../components/ConnectButton";
import useWalletContext from "../../hooks/useWalletContext";
import ProfileButton from "../../components/ProfileButton";
import PropTypes from "prop-types";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getAlphaInHex } from "../../themes/colors";
import { useState } from "react";

const logo = new URL(
  "../../../public/logo-no-text.png?as=webp",
  import.meta.url
).href;

const PageHeader = () => {
  const walletContext = useWalletContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        pt: 2,
        pb: 2,
        height: "100px",
        backdropFilter: "blur(6px)",
        borderBottom: (theme) => "1px solid " + theme.palette.divider,
        display: "flex",
        color: (theme) => theme.palette.stripio.navPrimary,
      }}
    >
      <Container
        maxWidth={"lg"}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "center",
          [theme.breakpoints.down("sm")]: {
            paddingLeft: "8px",
            paddingRight: "8px",
          },
        }}
      >
        {
          <img
            src={logo}
            alt={"logo"}
            style={{
              height: "100%",
              objectFit: "contain",
              marginTop: "auto",
              marginBottom: "auto",
              borderRadius: "50%",
            }}
            /*width={isMobile ? 120 : 200}*/ height={60}
          />
        }
        {!isMobile && false && (
          <Divider
            orientation={"vertical"}
            flexItem
            sx={{
              height: "100%",
              pl: 2,
              pr: 2,
              marginTop: "auto",
              marginBottom: "auto",
            }}
          />
        )}
        {!isMobile && false && <NavBar />}
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        {!walletContext.isConnected || !walletContext.isCorrectNetwork ? (
          <ConnectButton
            sx={{
              backgroundColor: "transparent",
            }}
            variant={"contained"}
          />
        ) : (
          <ProfileButton />
        )}
        {isMobile && false && (
          <>
            <Box sx={{ minWidth: 10 }} />
            <NavMenuMobile />
          </>
        )}
      </Container>
    </Box>
  );
};

export default PageHeader;

const navItems = [
  {
    label: "Marketplace",
    href: "#",
  },
  {
    label: "Zpunk Token Staking",
    href: "#",
  },
  {
    label: "Token Staking",
    href: "#",
  },
  {
    label: "NFT Staking",
    href: "#",
  },
];

const NavBar = () => {
  return (
    <Box
      sx={{
        ml: 2,
        height: "100%",
        marginTop: "auto",
        marginBottom: "auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      {navItems.map((item, index) => {
        return <NavLink key={index} {...item} />;
      })}
    </Box>
  );
};

const NavLink = ({ href, label }) => {
  return (
    <Box sx={{}}>
      <Box
        component={"a"}
        href={href}
        sx={{
          height: "100%",
          fontSize: "14px",
          lineHeight: "21px",
          padding: 2,
          textDecoration: "none",
          fontWeight: 700,
          color: (theme) => theme.palette.stripio.navPrimary,
          transition: "all 0.5s ease",
          "&:hover": {
            borderRadius: "24px",
            color: (theme) => theme.palette.stripio.navHoverColor,
            backgroundColor: (theme) => theme.palette.stripio.navHoverBg,
          },
        }}
      >
        {label}
      </Box>
    </Box>
  );
};

NavLink.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
};

function MobileDrawer({ open, onClose }) {
  const list = () => {
    return (
      <Box
        sx={{
          width: 250,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          height: "100%",
          overflow: "auto",
          p: 2,
        }}
        role="nav menu"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <img src={logo} alt={"logo"} width={200} />
        <Divider
          orientation={"horizontal"}
          sx={{
            width: "100%",
            mt: 2,
            mb: 2,
          }}
        />
        <List
          sx={{
            width: "100%",
          }}
        >
          {navItems.map((item, index) => {
            return (
              <>
                <ListItem
                  key={index}
                  disablePadding
                  sx={{
                    borderBottom: "1px solid " + "#80808055",
                    borderTop:
                      index === 0 ? "1px solid " + "#80808055" : "none",
                  }}
                >
                  <ListItemButton
                    sx={{
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              </>
            );
          })}
        </List>
      </Box>
    );
  };

  return (
    <div>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            background: (theme) =>
              theme.palette.background.paper + getAlphaInHex(0.5),
            backdropFilter: "blur(6px)",
          },
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
}

MobileDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

const NavMenuMobile = () => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  return (
    <Box
      sx={{
        ml: 2,
        height: "100%",
        marginTop: "auto",
        marginBottom: "auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyItems: "center",
        alignContent: "center",
        justifyContent: "center",
        marginLeft: "0px",
      }}
    >
      <IconButton
        size={"large"}
        sx={{
          color: (theme) => theme.palette.stripio.navPrimary,
          borderRadius: "4px",
          transition: "all 0.3s ease-in-out",
          [theme.breakpoints.down("md")]: {
            borderRadius: "0px 32px 32px 0px",
          },
          "&:hover": {
            //background: !connectButtonShowing ? "" : colors.blueGradientEnd,
          },
        }}
        aria-label="toggle menu button"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <MobileDrawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};
