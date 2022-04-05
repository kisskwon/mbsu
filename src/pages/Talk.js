import styled from "@emotion/styled";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { doc, setDoc, writeBatch } from "firebase/firestore";
import React from "react";
import { db } from "../firebase/firebase";
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
          <ListItem
            button
            onClick={() => {
              tvControlUtil.launchOneshotOverlay("image", () => {
                setDoc(doc(db, "thinq_talk", "message_type"), {
                  type: "single",
                });
              });
            }}
          >
            <ListItemText primary={"Text + 태권도 Image"} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              tvControlUtil.launchOneshotOverlay("youtube", () => {
                const batch = writeBatch(db);
                batch.set(doc(db, "thinq_talk", "message_type"), {
                  type: "youtube",
                });
                batch.set(doc(db, "thinq_talk", "youtube"), { play: false });
                batch.commit();
              });
            }}
          >
            <ListItemText primary={"Text + Youtube"} />
          </ListItem>
          <ListItem button onClick={() => tvControlUtil.closeWebAppOverlay()}>
            <ListItemText primary={"close webapp"} />
          </ListItem>
        </List>
      </StyledPaper>
    </>
  );
}

export default Talk;
