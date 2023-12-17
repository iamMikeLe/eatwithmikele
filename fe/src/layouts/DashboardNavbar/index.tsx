import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import { Badge, Box, Typography } from "components";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarDesktopMenu,
  navbarIconButton,
  navbarMobileMenu,
  navbarRow,
} from "layouts/DashboardNavbar/styles";

// Material Dashboard 2 PRO React context
import { setMiniSidenav, useMaterialUIController } from "context";

//store
import { setShowSettingsModal } from "store/appSettingsSlice";
import { useAppDispatch } from "store/hooks";

// Declaring prop types for DashboardNavbar
type Props = {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
};

//TODO optimize this component
function DashboardNavbar({ absolute, light, isMini }: Props): JSX.Element {
  const { t } = useTranslation();
  const [controller, dispatch] = useMaterialUIController();
  const dispatchRedux = useAppDispatch();
  const { miniSidenav, transparentNavbar, darkMode } = controller;
  const route = useLocation().pathname.split("/").slice(1);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }: {
    palette: any;
    functions: any;
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar sx={navbarContainer}>
        <Box
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <Box mr={{ xs: 0, xl: 8 }}>
            <Typography
              fontWeight="bold"
              textTransform="capitalize"
              variant="h6"
              color={light ? "white" : "dark"}
              noWrap
            >
              {t(
                route[route.length - 1].replace("-", " ").toUpperCase() +
                  "_CUSTOM_TRANS"
              )}
            </Typography>
          </Box>
          <IconButton
            sx={navbarDesktopMenu}
            onClick={handleMiniSidenav}
            size="small"
            disableRipple
          >
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </Box>
        {isMini ? null : (
          <Box sx={(theme) => navbarRow(theme, { isMini })}>
            <Box color={light ? "white" : "inherit"}>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <Link to="/authentication/sign-in/basic">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
              </Link>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={() => dispatchRedux(setShowSettingsModal(true))}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={() => console.log("click")}
              >
                <Badge badgeContent={9} color="error" size="xs" circular>
                  <Icon sx={iconsStyle}>notifications</Icon>
                </Badge>
              </IconButton>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Declaring default props for DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

export default DashboardNavbar;
