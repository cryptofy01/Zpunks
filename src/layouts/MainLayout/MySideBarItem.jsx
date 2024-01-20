import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTheme } from "@mui/system";
import { useSnackbar } from "notistack";
import { Collapse, List, ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import * as PropTypes from "prop-types";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
/**
 * @param title {String}
 * @param open {Boolean}
 * @param setOpen {Function}
 * @param lastItem {Boolean}
 * @param Icon {JSX.Element}
 * @param href {String}
 * @param subItems {Array}
 * @param compact {Boolean}
 * @param AfterIcon {JSX.Element}
 * @param isSubItem {Boolean}
 * @returns {JSX.Element}
 * @constructor
 */
const MySideBarItem = ({
  title,
  open,
  setOpen,
  // lastItem,
  Icon,
  href,
  subItems,
  compact,
  AfterIcon,
  //isSubItem,
}) => {
  const [expend, setExpend] = useState(false);

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const location = useLocation();
  useEffect(() => {
    if (!open) {
      setExpend(false);
    }
  }, [open, expend]);
  return (
    <ListItem
      sx={{
        width: "100%",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor:
            subItems && expend ? "" : theme.palette.secondary.main,
          color: subItems && expend ? "" : theme.palette.secondary.contrastText,
        },
      }}
      disableGutters
      key={title}
    >
      <Button
        sx={{
          paddingTop: compact ? 1 : 1,
          paddingBottom: compact ? 1 : 1,
          paddingLeft: open ? (compact ? 3 : 2) : "auto",
          paddingRight: open ? (compact ? 3 : 2) : "auto",
          minWidth: "100%",
          borderRadius: 0,
          justifyContent: open ? "left" : "center",
          alignItems: "center",
          textTransform: "none",
          transition: "all 0.3s ease",
          color:
            location.pathname === href
              ? theme.palette.secondary.main
              : theme.palette.text.main,
          "&:hover": {
            color:
              subItems && expend ? "" : theme.palette.secondary.contrastText,
          },
        }}
        onClick={() => {
          if (subItems) {
            if (!open) {
              setOpen(true);
            }
            setExpend(!expend);
            return;
          }
          if (!href || href === "#") {
            // return
            enqueueSnackbar("Coming Soon", {
              variant: "warning",
              autoHideDuration: 1000,
            });
          } else if (href.startsWith("https://")) {
            // external
            const win = window.open(href, "_blank");
            win.focus();
          } else {
            history.push(href);
          }
        }}
      >
        {Icon && (
          <Icon
            id={"mysvg"}
            size={compact ? "24" : "28"}
            style={{
              width: compact ? 24 : 28,
              height: compact ? 24 : 28,
            }}
          />
        )}
        {open && (
          <span
            style={{
              marginLeft: 12,
              //fontSize: compact ? 13 : 15,
              fontWeight: 400,
              fontSize: compact ? 16 : 18,
            }}
          >
            {title}
          </span>
        )}
        {open && AfterIcon && (
          <AfterIcon style={{ marginLeft: 4, width: 18, height: 18 }} />
        )}

        {open && <span style={{ flexGrow: 1 }} />}
        {subItems && open && (expend ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
      </Button>
      {subItems && open && (
        <Collapse
          in={expend}
          style={{
            justifyContent: open ? "left" : "center",
            minWidth: "100%",
          }}
        >
          <List>
            {subItems.map((item, index) => {
              return (
                <MySideBarItem
                  key={index}
                  {...item}
                  open
                  setOpen
                  compact
                  isSubItem
                />
              );
            })}
          </List>
        </Collapse>
      )}
    </ListItem>
  );
};

MySideBarItem.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  lastItem: PropTypes.bool,
  Icon: PropTypes.element,
  href: PropTypes.string,
  subItems: PropTypes.array,
  compact: PropTypes.bool,
  AfterIcon: PropTypes.element,
  isSubItem: PropTypes.bool,
};

export default MySideBarItem;
