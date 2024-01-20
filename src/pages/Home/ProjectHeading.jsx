import Box from "@mui/material/Box";
import TitleHeading from "../../components/Typography/TitleHeading";
import SubTitleHeading from "../../components/Typography/SubTitleHeading";
import PropTypes from "prop-types";
import { useMediaQuery, useTheme } from "@mui/material";

const ProjectHeading = ({ imgUrl, title, subtitle, sx, ...rest }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        p: 1,
        pl: 0,
        display: "flex",
        alignItems: "start",
        gap: 2,
        ...sx,
      }}
      {...rest}
    >
      <img
        src={imgUrl}
        alt={title}
        width={!isMobile ? 48 : 32}
        height={!isMobile ? 48 : 32}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          justifyItems: "start",
        }}
      >
        <TitleHeading sx={{ pt: 0 }}>{title}</TitleHeading>
        <SubTitleHeading>{subtitle}</SubTitleHeading>
      </Box>
    </Box>
  );
};

ProjectHeading.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  sx: PropTypes.object,
  rest: PropTypes.object,
};

export default ProjectHeading;
