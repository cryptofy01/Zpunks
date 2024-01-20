import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/system";

const Footer = () => {
  const theme = useTheme();
  return (
    <Paper
      elevation={1}
      component={"footer"}
      sx={{
        display: "flex",
        minHeight: 32,
        padding: 2,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 0,
        borderTopColor: "divider",
        borderTopWidth: 1,
        borderTopStyle: "solid",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
      }}
    >
      <Typography>
        {process.env.SITE_TITLE}
        {` © ${new Date().getFullYear()}`}
      </Typography>
      <Typography>
        built with ❤️ by{" "}
        <Link href="https://github.com/humanshield89">@humanshield89</Link>
      </Typography>
    </Paper>
  );
};
export default Footer;
