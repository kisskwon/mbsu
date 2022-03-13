import styled from "@emotion/styled";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import React from "react";
import MBAppBar from "../libs/components/MBAppBar";
import { tvControlUtil } from "../util/tvControlUtil";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function Talk(props) {
  return (
    <>
      <MBAppBar title={"Talk"} sub />
      <StyledPaper square>
        <List>
          <ListItem button onClick={() => tvControlUtil.connect()}>
            <ListItemText primary={"Connect to TV"} />
          </ListItem>
          <ListItem button onClick={() => tvControlUtil.launchWebAppOverlay()}>
            <ListItemText primary={"Text Only"} />
          </ListItem>
          <ListItem button onClick={() => tvControlUtil.closeWebAppOverlay()}>
            <ListItemText primary={"close webapp"} />
          </ListItem>
          <ListItem button onClick={() => tvControlUtil.launchYoutube()}>
            <ListItemText primary={"Text + Youtube"} />
          </ListItem>
        </List>
      </StyledPaper>
    </>
  );
}

export default Talk;
