import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

function MBDrawerItem(props) {
  return (
    <ListItem button onClick={props.action}>
      {props.icon && <ListItemIcon>{props.icon}</ListItemIcon>}
      <ListItemText primary={props.title} />
    </ListItem>
  );
}

export default MBDrawerItem;
