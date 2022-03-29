import styled from "@emotion/styled";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../firebase/firebase";
import MBAppBar from "../libs/components/MBAppBar";
import { tvControlUtil } from "../util/tvControlUtil";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function Talk(props) {
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "thinq_talk"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const changed = change.doc;
        switch (changed.id) {
          case "application":
            if (!changed.data().poweron) {
              tvControlUtil.closeWebAppOverlay();
              setDoc(doc(db, "thinq_talk", "application"), {
                poweron: true,
              });
            }
            break;
          case "youtube":
            if (change.type !== "added" && changed.data().play) {
              tvControlUtil.launchYoutube();
              setDoc(doc(db, "thinq_talk", "youtube"), {
                play: false,
              });
            }
            break;
          case "message_type":
            if (change.type !== "added" && changed.data().type === "gallery") {
              tvControlUtil.launchOneshotOverlay("image", () => {
                setDoc(doc(db, "thinq_talk", "message_type"), {
                  type: "slider",
                });
              });
            }
            break;
        }
      });
    });
    return unsubscribe;
  }, []);
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
