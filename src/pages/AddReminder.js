import styled from "@emotion/styled";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { CardContent, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MBAppBar from "../libs/components/MBAppBar";
import MBSubCard from "../libs/components/MBSubCard";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { tvControlUtil } from "../util/tvControlUtil";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function AddReminder(props) {
  const navigate = useNavigate();

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
              label="내용 입력"
              variant="outlined"
              margin="normal"
            />
            <TextField
              id="reminder-url"
              label="URL 입력"
              multiline
              margin="normal"
              onChange={handleChange}
            />
            {/* <FormControl margin="normal">
              <FormLabel>알림 시간 설정</FormLabel>
              <RadioGroup
                row
                name="row-radio-buttons-group"
                onChange={handleTimeSetChange}
              >
                <FormControlLabel
                  value="atHome"
                  control={<Radio />}
                  label="집에 도착하면 바로 실행"
                />
                <FormControlLabel
                  value="onTime"
                  control={<Radio />}
                  label="시간 선택"
                />
              </RadioGroup>
            </FormControl>

            {timeType === "onTime" && (
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                id="date-time-picker"
              >
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
            )} */}
          </div>
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
