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
        <ListItem
          button
          onClick={() => {
            onNavigationClick("/players");
          }}>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Players" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            onNavigationClick("/trainings");
          }}>
          <ListItemIcon>
            <EventAvailable />
          </ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            onNavigationClick("/birthdays");
          }}>
          <ListItemIcon>
            <Cake />
          </ListItemIcon>
          <ListItemText primary="Birthday" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
}
