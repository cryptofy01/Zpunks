import Header from "./Header";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import { useState } from "react";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import SideBar from "./SideBar";

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((old) => !old);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Header toggleOpen={toggleOpen} />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <SideBar
          open={open}
          toggleOpen={toggleOpen}
          isMobile={isMobile}
          setOpen={setOpen}
        />
        <Container maxWidth={"lg"} sx={{ flexGrow: 1 }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
