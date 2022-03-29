import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { doc, writeBatch } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { NetflixData } from "../data/NetflixData";
import { db } from "../firebase/firebase";
import MBAppBar from "../libs/components/MBAppBar";
import MBSubCard from "../libs/components/MBSubCard";
import NetflixInformation from "../libs/components/NetflixInformation";
import { REMINDER_MODE } from "../libs/constant/Constant";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function AddReminder(props) {
  const navigate = useNavigate();
  const state = useLocation().state;
  const mode = state?.mode || REMINDER_MODE.NORMAL;
  const defaultUrl = "https://www.netflix.com/kr/title/81517168?s=a&trkid=13747225&t=cp&vlang=ko&clip=81564946"; //25 21
  const netflixData = useRecoilValue(NetflixData);

  console.log("mode : " + state?.mode);
  console.log(location);
  const [webTitle, setWebTitle] = useState("");
  const handleChange = (e) => {
    setWebTitle(e.target.value);
  };

  const existActivity = () => {
    try {
      navigator.app.exitApp();
    } catch(e) {
      navigate(-1);
    }
  }

  const handleSave = () => {
    let type = "shopping";
    let data = {
      title: webTitle,
      url: state?.url
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
    } else {
      if (webTitle === "") {
        alert("title 을 입력하셔야죠...");
        existActivity();
        return;
      }
    }

    const batch = writeBatch(db);
    const messageTypeRef = doc(db, "thinq_talk", "message_type");
    batch.set(messageTypeRef, { type: type });

    const contentsRef = doc(db, "thinq_talk", "contents");
    batch.set(contentsRef, data);
    batch.commit();

    existActivity();
  };

  const [value, setValue] = useState(new Date());

  const [timeType, setTimeType] = useState("atHome");

  const handleTimeSetChange = (event) => {
    console.log(event.target.value);
    setTimeType(event.target.value);
  };

  return (
    <>
      <MBAppBar title={"알림이 추가"} sub />
      <StyledPaper square>
        <div style={{ padding: "20px", backgroundColor: "#272727" }}>
          <Typography variant="h5" color="#90caf9" fontWeight="bold">
            알림 받을 내용을 추가하세요.
          </Typography>
        </div>

        <MBSubCard>
          {mode === REMINDER_MODE.NETFLIX ? (
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
              <TextField
                id="reminder-title"
                label="웹내용 입력"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                autoFocus
              />
              <TextField
                disabled
                id="reminder-url"
                label="URL 입력"
                multiline
                margin="normal"
                value={state?.url}
              />
            </div>
          )}
        </MBSubCard>
      </StyledPaper>
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
    </>
  );
}

export default AddReminder;
