import styled from "@emotion/styled";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import React from "react";
import MBAppBar from "../libs/components/MBAppBar";
import { tvControlUtil } from "../util/tvControlUtil";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function Gallery(props) {
  return (
    <>
      <MBAppBar title={"TV액자"} sub />
      <StyledPaper square>
        <List>
          <ListItem button onClick={() => startThinqGallery()}>
            <ListItemText primary={"사진 설정"} />
          </ListItem>
          <ListItem button onClick={() => tvControlUtil.connect()}>
            <ListItemText primary={"Connect to TV"} />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              tvControlUtil.launchWebApp("https://surnks.github.io/")
            }
          >
            <ListItemText primary={"Launch WebApp"} />
          </ListItem>
        </List>
      </StyledPaper>
    </>
  );
}

function startThinqGallery() {
  console.log("startThinqGallery");
  try {
    window.cordova.plugins.TVConnect.startThinqGallery(null, (result) => {
      console.log("startThinqGallery ok...", result);
    });
  } catch (error) {
    console.log("error:", error);
  }
}

export default Gallery;
