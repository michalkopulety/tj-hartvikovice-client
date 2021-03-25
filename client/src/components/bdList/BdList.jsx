import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function BdList({ list }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {Object.keys(list).map((month) => (
        <>
          <ListSubheader>{month}</ListSubheader>
          {list[month] &&
            list[month].map((item) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Image />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.primary}
                  secondary={item.secondary}
                />
              </ListItem>
            ))}
        </>
      ))}
    </List>
  );
}
