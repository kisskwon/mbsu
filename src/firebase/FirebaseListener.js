import { doc, writeBatch } from "firebase/firestore";
import React, { useEffect } from "react";
import { tvControlUtil } from "../util/tvControlUtil";
import { db } from "./firebase";

function FirebaseListener(props) {
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

  useEffect(() => {
    window.onReceiveHooking = onReceiveHooking;
  }, [onReceiveHooking]);
  return null;
}

export default FirebaseListener;
