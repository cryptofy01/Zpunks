import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ROUTES_PATHS } from "../../routes";
import MySideBarItem from "./MySideBarItem";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PropTypes from "prop-types";

const sections = [
  {
    title: "Home",
    Icon: HomeIcon,
    href: ROUTES_PATHS.DAPP_HOME,
  },
  {
    title: "User",
    Icon: AccountCircle,
    href: ROUTES_PATHS.DAPP_USER,
    /*
        subItems: [
            {
                title: "Trader Joe",
                href: "https://testnet.bscscan.com/address/0xb0751f8abeaf2cc674803944a49f4579df808f98#readContract",
                AfterIcon: ArrowOutwardIcon,
            },
            {
                title: "Pangolin",
                href: "https://testnet.bscscan.com/address/0xb0751f8abeaf2cc674803944a49f4579df808f98#readContract",
                AfterIcon: ArrowOutwardIcon,
            },
        ],
         */
  },
  {
    title: "Launchpad",
    Icon: RocketLaunchIcon,
    href: ROUTES_PATHS.DAPP_LAUNCHPAD,
  },
];

const SideBar = ({ open, isMobile, setOpen }) => {
  return (
    <Box
      sx={{
        background: (theme) => theme.palette.background.paper,
        width: open ? 240 : isMobile ? 0 : 48,
        transition: "width 0.3s",
        overflowX: "hidden",
        borderRight: "1px solid",
        borderRightColor: "divider",
        height: "100%",
      }}
    >
      {sections.map((section, index, array) => (
        <MySideBarItem
          key={index}
          index={index}
          {...section}
          open={open}
          setOpen={setOpen}
          lastItem={index === array.length - 1}
        />
      ))}
    </Box>
  );
};

SideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default SideBar;
