import React from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { ChevronLeft, People, EventAvailable, Cake } from "@material-ui/icons";
import { closeLeftPanel } from "../../reducers/layout";
import { useDispatch, useSelector } from "react-redux";
import RoleBasedAccessComponent from "../../auth/RoleBasedAccessComponent";
import { PREDEFINED_PERMISIONS } from "../../auth/rbac-rules";
const menuItems = [
  {
    path: "/players",
    icon: <People />,
    text: "Players",
    requiredActions: PREDEFINED_PERMISIONS.PLAYERS.READ,
  },
  {
    path: "/trainings",
    icon: <EventAvailable />,
    text: "Attendance",
    requiredActions: PREDEFINED_PERMISIONS.TRAININGS.READ,
  },
  {
    path: "/birthdays",
    icon: <Cake />,
    text: "Birthday",
    requiredActions: PREDEFINED_PERMISIONS.PLAYERS.READ,
  },
];

const MenuItem = (onNavigationClick, icon, text, path) => {
  return (
    <ListItem
      button
      onClick={() => {
        onNavigationClick(path);
      }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default function LeftMenu({ classes }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLeftMenuOpen } = useSelector((state) => state.layout);
  let onNavigationClick = (route) => {
    history.push(route);
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !isLeftMenuOpen && classes.drawerPaperClose
        ),
      }}
      open={isLeftMenuOpen}>
      <div className={classes.toolbarIcon}>
        <IconButton
          onClick={() => {
            dispatch(closeLeftPanel());
          }}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <RoleBasedAccessComponent
            component={MenuItem(
              onNavigationClick,
              item.icon,
              item.text,
              item.path
            )}
            requiredActions={item.requiredActions}
          />
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
