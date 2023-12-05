import { ReactNode } from "react";

// @mui material components
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";

// Custom styles for the SidenavCollapse
import {
  collapseArrow,
  collapseIcon,
  collapseIconBox,
  collapseItem,
  collapseText,
} from "./styles/sidenavCollapse";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

// Declaring props types for SidenavCollapse
interface Props {
  icon: ReactNode;
  name: string;
  children?: ReactNode;
  active?: Boolean;
  noCollapse?: Boolean;
  open?: Boolean;
  [key: string]: any;
}

function SidenavCollapse({
  icon,
  name,
  children,
  active,
  noCollapse,
  open,
  ...rest
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;

  return (
    <>
      <ListItem component="li">
        <Box
          {...rest}
          sx={(theme: any) =>
            collapseItem(theme, { active, transparentSidenav, whiteSidenav, darkMode })
          }
        >
          <ListItemIcon
            sx={(theme) => collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode })}
          >
            {typeof icon === "string" ? (
              <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, {
                miniSidenav,
                transparentSidenav,
                whiteSidenav,
                active,
              })
            }
          />

          <Icon
            sx={(theme) =>
              collapseArrow(theme, {
                noCollapse,
                transparentSidenav,
                whiteSidenav,
                miniSidenav,
                open,
                active,
                darkMode,
              })
            }
          >
            expand_less
          </Icon>
        </Box>
      </ListItem>
      {children && (
        <Collapse in={Boolean(open)} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Declaring default props for SidenavCollapse
SidenavCollapse.defaultProps = {
  active: false,
  noCollapse: false,
  children: false,
  open: false,
};

export default SidenavCollapse;
