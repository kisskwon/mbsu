import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { tvControlUtil } from "../util/tvControlUtil";
import { db, storage } from "./firebase";

function FirebaseListener(props) {
  const [src, setSrc] = useState("");
  const onReceiveHooking = (from, text) => {
    console.log("onReceiveHooking", from, text);
    tvControlUtil.launchOneshotOverlay("kakaotalk", () => {
      const batch = writeBatch(db);
      batch.set(doc(db, "thinq_talk", "contents"), {
        from: from,
        text: text,
      });
      batch.set(doc(db, "thinq_talk", "message_type"), {
        type: "kakaotalk",
      });
      batch.commit();
    });
  };

  const onSelectImages = (base64Image) => {
    window.cordova.plugins.TVConnect.toast(
      "onSelectImages" + (base64Image ? JSON.stringify(base64Image) : "")
    );
    setSrc("data:image/;base64," + base64Image);
    //const listRef = ref(storage, "Device.tv");
  };

  useEffect(() => {
    window.onReceiveHooking = onReceiveHooking;
  }, [onReceiveHooking]);

  useEffect(() => {
    console.log("kks", "set onSelectImages");
    window.onSelectImages = onSelectImages;
  }, [onSelectImages]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "thinq_talk"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          return;
        }
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
            if (changed.data().play) {
              tvControlUtil.launchYoutube();
              setDoc(doc(db, "thinq_talk", "youtube"), {
                play: false,
              });
            }
            break;
          case "message_type":
            if (changed.data().type === "gallery") {
              tvControlUtil.launchOneshotOverlay("image", () => {
                setDoc(doc(db, "thinq_talk", "message_type"), {
                  type: "slider",
                });
              });
            }
            break;
          case "message_type":
            if (changed.data().type === "draw") {
              tvControlUtil.launchOneshotOverlay("image", () => {
                setDoc(doc(db, "thinq_talk", "message_type"), {
                  type: "drawmemo",
                });
              });
            }
            break;
        }
      });
    });
    return unsubscribe;
  }, []);
  return null;
}

export default FirebaseListener;
