import { doc, writeBatch } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { tvControlUtil } from "../util/tvControlUtil";
import { db, storage } from "./firebase";

function FirebaseListener(props) {
  const [src, setSrc] = useState("");
  const onReceiveHooking = (from, text) => {
    console.log("kks", "onReceiveHooking", from, text);
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
    setSrc("data:image/;base64,"+base64Image);
    //const listRef = ref(storage, "Device.tv");
  }

  useEffect(() => {
    window.onReceiveHooking = onReceiveHooking;
  }, [onReceiveHooking]);

  useEffect(() => {
    console.log("kks", "set onSelectImages");
    window.onSelectImages = onSelectImages;
  }, [onSelectImages]);

  return <>
    HI
    <img src={src} />
  </>;
}

export default FirebaseListener;
