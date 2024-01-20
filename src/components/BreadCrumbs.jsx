import { Breadcrumbs, Typography, useTheme } from "@mui/material";
import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";

const BreadCrumbs = ({ path }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 2,
        pt: "1rem",
        pb: "1rem",
        borderBottom: (theme) => "1px solid " + theme.palette.divider,
        [theme.breakpoints.down("sm")]: {
          pt: "0.8rem",
          pb: "0.8rem",
        },
      }}
    >
      <Container maxWidth={"lg"}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="medium" color={"text"} />}
        >
          {path?.map((p, i, array) => {
            if (i === array.length - 1 || !p.href)
              return (
                <Typography
                  key={p.toString()}
                  //variant={"h6"}
                  sx={{
                    color:
                      i === array.length - 1
                        ? (theme) => theme.palette.stripio.navHoverColor
                        : (theme) => theme.palette.text.primary,
                    fontSize: "1rem",
                  }}
                >
                  {p.title}
                </Typography>
              );
            else
              return (
                <Link
                  sx={{
                    fontWeight: 600,
                    color: (theme) => theme.palette.text.primary,
                    textDecoration: "none",
                    "&:hover": {
                      //color: (theme) => theme.palette.stripio.navHoverColor,
                      textDecoration: "none",
                    },
                  }}
                  key={p.toString()}
                  underline="hover"
                  color="inherit"
                  href={p.href}
                >
                  {p.title}
                </Link>
              );
          })}
        </Breadcrumbs>
      </Container>
    </Box>
  );
};

BreadCrumbs.propTypes = {
  path: PropTypes.array,
};

export default BreadCrumbs;
