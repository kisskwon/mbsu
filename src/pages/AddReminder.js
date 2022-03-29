import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MBAppBar from "../libs/components/MBAppBar";
import MBSubCard from "../libs/components/MBSubCard";
import NetflixInformation from "../libs/components/NetflixInformation";
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

  console.log("mode : " + state?.mode);
  console.log("url : " + state?.url);
  console.log(location);
  const [url, setUrl] = useState("");
  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSave = () => {
    console.log("handleSave-url : " + url);
    tvControlUtil.launchBrowser(url);
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
          <div
            style={{
              display: "grid",
              width: "90%",
              margin: "auto",
              marginBottom: "15px",
              marginTop: "15px",
            }}
          >
            <Button onClick={() => tvControlUtil.connect()}>
              Connect Service
            </Button>
          </div>
        </MBSubCard>
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
                autoFocus
              />
              <TextField
                id="reminder-url"
                label="URL 입력"
                multiline
                margin="normal"
                onChange={handleChange}
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
            navigate(-1);
          }}
        >
          취소
        </Button>
        <Button variant="text" sx={{ fontWeight: "bold" }} onClick={handleSave}>
          실행
        </Button>
      </Stack>
    </>
  );
}

export default AddReminder;
