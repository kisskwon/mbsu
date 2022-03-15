import styled from "@emotion/styled";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { doc, onSnapshot, setDoc, writeBatch } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../firebase/firebase";
import MBAppBar from "../libs/components/MBAppBar";
import { tvControlUtil } from "../util/tvControlUtil";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function Talk(props) {
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "video", "youtube"), (doc) => {
      console.log("kks", "onSnapshot", doc.data().on);
      if (doc.exists && doc.data().on) {
        tvControlUtil.launchYoutube();
        setDoc(doc(db, "video", "youtube"), {
          on: false,
        });
      }
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <MBAppBar title={"Talk"} sub />
      <StyledPaper square>
        <List>
          <ListItem button onClick={() => tvControlUtil.connect()}>
            <ListItemText primary={"Connect to TV"} />
          </ListItem>
          <ListItem button onClick={() => tvControlUtil.launchWebAppOverlay()}>
            <ListItemText primary={"Connect Talk Service"} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setDoc(doc(db, "messages", "type"), {
                type: "single",
              });
              tvControlUtil.launchWebAppOverlay("image");
            }}
          >
            <ListItemText primary={"Text + 태권도 Image"} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              const batch = writeBatch(db);
              const typeRef = doc(db, "messages", "type");
              batch.set(typeRef, { type: "youtube" });
              const youtubeRef = doc(db, "video", "youtube");
              batch.set(youtubeRef, { on: false });
              batch.commit();
              tvControlUtil.launchWebAppOverlay("youtube");
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
