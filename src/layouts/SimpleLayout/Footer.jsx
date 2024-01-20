import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
//import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
//import CircleIconButton from "../../components/Buttons/CircleIconButton";
//import FeatherIcon from "feather-icons-react";
//import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";

const FooterTitle = ({ title }) => {
  return (
    <Typography
      sx={{
        fontFamily: "Poppins",
        fontSize: "16px",
        lineHeight: "28px",
        color: "#D9DBE1",
        fontWeight: 500,
        mb: 2,
        textAlign: "center",
      }}
    >
      {title}
    </Typography>
  );
};

FooterTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

const FooterLink = ({ title, href }) => {
  return (
    <Typography
      component={"a"}
      href={href || "#"}
      sx={{
        textDecoration: "none",
        fontFamily: "Dm Sans",
        fontSize: "14px",
        lineHeight: "16px",
        color: "#777E91",
        fontWeight: 700,
        mb: 1,
      }}
    >
      {title}
    </Typography>
  );
};

FooterLink.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
};
/*
const logo = new URL("../../../public/images/logo.png?as=webp", import.meta.url)
  .href;
*/
const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#212430", color: "white", width: "100%" }}>
      <Container
        maxWidth={"lg"}
        sx={{
          pt: "3rem",
          pb: "3rem",
        }}
      >
        {/*<Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                  <img src={logo} alt={"logo"}/>
                  <Typography
                      sx={{
                          fontFamily: "Manrope",
                          fontSize: "11px",
                          lineHeight: "20px",
                          color: "#D9DBE1",
                      }}
                  >
                      Zpunk Token is the World&rsquo;s first uniquely designed
                      revolutionary NFT Marketplace that integrates a dynamic pricing
                      protocol empowered by the $ZPT token. Zpunk Token will
                      completely revolutionize the traditional mechanism of buying and
                      selling NFT products.
                  </Typography>
                  <Box
                      sx={{
                          p: 1,
                          pl: 0,
                          gap: 1,
                          display: "flex",
                          justifyContent: "start",
                      }}
                  >
                      <CircleIconButton
                          sx={{p: "8px"}}
                          icon={<FeatherIcon icon={"send"} size={16}/>}
                      />
                      <CircleIconButton
                          sx={{p: "8px"}}
                          icon={<FeatherIcon icon={"twitter"} size={16}/>}
                      />
                      <CircleIconButton
                          sx={{p: "8px"}}
                          icon={<FeatherIcon icon={"youtube"} size={16}/>}
                      />
                  </Box>
              </Grid>

              <Grid item xs={6} sm={6} md={2} sx={{textAlign: "center"}}>
                  {false && (
                      <>
                          <FooterTitle title={"Products"}/>
                          <Box
                              sx={{
                                  p: 1,
                                  pl: 0,
                                  gap: 1,
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "start",
                              }}
                          >
                              <FooterLink title={"Stake Zpunk Token"} href={"#"}/>
                              <FooterLink title={"Stake Tokens"} href={"#"}/>
                              <FooterLink title={"Stake NFTs"} href={"#"}/>
                          </Box>
                      </>
                  )}
              </Grid>

              <Grid item xs={6} sm={6} md={2} sx={{textAlign: "center"}}>
                  {false && (
                      <>
                          <FooterTitle title={"Resources"}/>
                          <Box
                              sx={{
                                  p: 1,
                                  pl: 0,
                                  gap: 1,
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "start",
                              }}
                          >
                              <FooterLink title={"Marketplace"} href={"#"}/>
                              <FooterLink title={"Certik Audit"} href={"#"}/>
                              <FooterLink title={"WhitePaper"} href={"#"}/>
                          </Box>
                      </>
                  )}
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                  <FooterTitle title={"Join Newsletter"}/>
                  <Typography
                      sx={{
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          lineHeight: "20px",
                          fontWeight: 400,
                          color: "#E6E8EC",
                      }}
                  >
                      Subscribe our newsletter to get more info and insights
                  </Typography>

                  <Box
                      sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          mt: 2,
                      }}
                  >
                      <TextField
                          id="email-newsletter"
                          placeholder="Email"
                          variant="outlined"
                          sx={{
                              p: 0,
                              backgroundColor: "#2B2D3A",
                              borderRadius: "32px",
                              width: "100%",
                              "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                      p: 0,
                                      borderRadius: "32px",
                                      borderColor: "#2B2D3A",
                                  },
                                  "&:hover fieldset": {
                                      borderColor: "#2B2D3A",
                                  },
                                  "&.Mui-focused fieldset": {
                                      borderColor: "#2B2D3A",
                                  },
                              },
                          }}
                          InputProps={{
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton
                                          variant="contained"
                                          sx={{
                                              backgroundColor: "#3772FF",
                                              borderRadius: "32px",
                                              width: "100%",
                                              "&:hover": {
                                                  backgroundColor: "#3772FF",
                                              },
                                          }}
                                      >
                                          <FeatherIcon
                                              stroke={"white"}
                                              icon={"arrow-right"}
                                              size={26}
                                          />
                                      </IconButton>
                                  </InputAdornment>
                              ),
                          }}
                      />
                  </Box>
              </Grid>
          </Grid>
              <Divider sx={{mt: 2, mb: 2}} />*/}
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: "14px",
            color: "#777E91",
          }}
        >
          © {new Date().getFullYear()} Zpunk Token. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
