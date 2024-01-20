import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import PageHeader from "./PageHeader";
import Footer from "./Footer";
/*
const bg = new URL(
  "../../../public/images/bg.png?as=webp&width=1920",
  import.meta.url
).href;

const mobile = new URL(
  "../../../public/images/bg.png?as=webp&width=1920",
  import.meta.url
).href;
*/
const SimpleLayout = ({ children }) => {
  //const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#151825!important",
        //
        backgroundImage: "linear-gradient(180deg, #151825 0%, #1E1E2F 100%)", //`url(${isMobile ? bg : mobile})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "scroll",
        overflowY: "scroll",
      }}
    >
      <PageHeader />
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

SimpleLayout.propTypes = {
  children: PropTypes.node,
};

export default SimpleLayout;
