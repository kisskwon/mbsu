import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { collection, doc, getDocs, onSnapshot, setDoc, writeBatch } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { NetflixData, WebCrawlData } from "../data/CrawlData";
import { db } from "../firebase/firebase";
import Lottie from "../libs/components/Lottie";
import MBAppBar from "../libs/components/MBAppBar";
import MBSubCard from "../libs/components/MBSubCard";
import NetflixInformation from "../libs/components/NetflixInformation";
import WebInformation from "../libs/components/WebInformation";
import { REMINDER_MODE } from "../libs/constant/Constant";
import { tvControlUtil } from "../util/tvControlUtil";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function AddReminder(props) {
  const navigate = useNavigate();
  const state = useLocation().state;
  const mode = state?.mode || REMINDER_MODE.NORMAL;
  const defaultUrl = "https://www.netflix.com/kr/title/81517168?s=a&trkid=13747225&t=cp&vlang=ko&clip=81564946"; //25 21
  const webDefaulturl = "https://namu.wiki/w/%EA%B9%80%EA%B1%B4%ED%9D%AC/%EB%85%BC%EB%9E%80#s-2";
  const netflixData = useRecoilValue(NetflixData);
  const webCrawlData = useRecoilValue(WebCrawlData);
  const [showProgress, setShowProgress] = useState(false);

  console.log("mode : " + state?.mode);

  const existActivity = () => {
    try {
      console.log("existActivity try");
      navigator.app.exitApp();
      console.log("existActivity try 2222");
    } catch(e) {
      console.log("existActivity catch e :" + e);
      navigate(-1);
      console.log("existActivity catch2222 e :" + e);
    }
  }

  const handleSave = () => {
    let type = "shopping";
    let data = {
      summary : webCrawlData.description,
      title: webCrawlData.title,
      url: webCrawlData.url,
    };
    if (mode === REMINDER_MODE.NETFLIX) {
      console.log("netflix data :" + JSON.stringify(netflixData));
      type = "netflix";
      data = {
        summary: netflixData.summary,
        title: netflixData.title,
        titleid: netflixData.titleid,
        url: netflixData.url
      };
    }

    setShowProgress(true);
    tvControlUtil.launchOneshotOverlay(type, () => {
      const batch = writeBatch(db);
      const messageTypeRef = doc(db, "thinq_talk", "message_type");
      batch.set(messageTypeRef, { type: type });

      const contentsRef = doc(db, "thinq_talk", "contents");
      batch.set(contentsRef, data);

      const shoppingMode = mode == REMINDER_MODE.NORMAL;

      const playRef = doc(db, "thinq_talk", shoppingMode ? "browser": "netflix");
      batch.set(playRef, shoppingMode ? {show: false} : {play: false});
      batch.commit();
    }, () => {
      console.log("launchOneshotOverlay error...");
      window.cordova?.plugins?.TVConnect.toast("TV 연결에 실패하여 종료합니다.");

      existActivity();
    });
  };

  useEffect(() => {
    const logging = async () => {
      //firestore logging
      const querySnapshot = await getDocs(collection(db, "thinq_talk"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("----------------------DOCUMENT NAME ", doc.id, "----------------------");
        console.table(doc.data());
      });
    };
    logging();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "thinq_talk"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const changed = change.doc;
        switch (changed.id) {
          case "browser":
            if (change.type !== "added" && changed.data().show) {
              tvControlUtil.launchBrowser(state?.url);
              setDoc(doc(db, "thinq_talk", "browser"), {
                show: false,
              });
              existActivity();
            }
            break;
          case "netflix":
            if (change.type !== "added" && changed.data().play) {
              tvControlUtil.launchNetflix(netflixData.titleid);
              setDoc(doc(db, "thinq_talk", "netflix"), {
                play: false,
              });
              existActivity();
            }
            break;
        }
      });
    });
    return unsubscribe;
  }, [netflixData]);

  return (
    <>
      <MBAppBar title={"알림이 추가"} sub reminder/>
      <StyledPaper square>
        <div style={{ padding: "20px", backgroundColor: "#272727" }}>
          <Typography variant="h5" color="#90caf9" fontWeight="bold">
          {showProgress === true ? "TV에 전송중입니다. 잠시만 기다려주세요":"알림 받을 내용을 추가하세요."}
          </Typography>
        </div>

        <MBSubCard>
          {showProgress === true ?
            <div
              style={{
                display: "grid",
                width: "90%",
                height:"500",
                margin: "auto",
                marginBottom: "15px",
                marginTop: "15px",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Lottie/>
            </div>

          :  mode === REMINDER_MODE.NETFLIX ? (
            <div
              style={{
                display: "grid",
                width: "90%",
                margin: "auto",
                marginBottom: "15px",
                marginTop: "15px",
              }}
            >
              <NetflixInformation url={state?.url || defaultUrl} />
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                width: "90%",
                margin: "auto",
                marginBottom: "15px",
                marginTop: "15px",
              }}
            >
              <WebInformation url={state?.url || webDefaulturl} />
            </div>

          )}
        </MBSubCard>
      </StyledPaper>
      {showProgress === true ?
      <div></div>
      :
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          minHeight: 56,
          bgcolor: "#1d1d1d",
        }}
      >
        <Button
          variant="text"
          sx={{ fontWeight: "bold" }}
          onClick={() => {
            existActivity();
          }}
        >
          취소
        </Button>
        <Button variant="text" sx={{ fontWeight: "bold" }} onClick={handleSave}>
          저장
        </Button>
      </Stack>
      }
    </>
  );
}

export default AddReminder;
