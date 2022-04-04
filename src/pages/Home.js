import styled from "@emotion/styled";
import { CardContent, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import MBAppBar from "../libs/components/MBAppBar";
import MBCard from "../libs/components/MBCard";
import { format } from "date-fns";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

const getTime = () => {
  let date = new Date();
  let savedTime = localStorage.getItem("alarmTime");
  if (savedTime === null) {
    date.setHours(7);
    date.setMinutes(0);
    date.setSeconds(0);
  } else {
    date = new Date(JSON.parse(savedTime));
  }
  return format(date, "p");
};

const getDays = () => {
  let dayofweeks = "";
  let savedDay = localStorage.getItem("alarmDay");
  if (savedDay === null) {
    dayofweeks = "월, 화, 수, 목, 금";
  } else {
    let arr = [];
    const json = JSON.parse(savedDay);
    Object.keys(json).forEach(function (index) {
      if (json[index].checked === true) {
        arr.push(json[index].title);
      }
    });
    dayofweeks = arr.join(", ");
  }
  return dayofweeks;
};

function Home(props) {
  const navigate = useNavigate();
  const gotoAddReminder = (mode, nativeUrl) => {
    console.log(
      "2MB goto addReminder mode : " + mode + " nativeUrl :" + nativeUrl
    );
    navigate("/addReminder", { state: { mode: mode, url: nativeUrl } });
  };
  window.gotoAddReminder = gotoAddReminder;

  return (
    <>
      <MBAppBar title={"ThinQ stand-alone"} />
      <StyledPaper square>
        {/* <MBCard title="알림 설정" action="알림" to="/alarm">
          <CardContent sx={{ py: 1 }}>
            <Typography sx={{ fontSize: 30 }}>{getTime()}</Typography>
            <Typography
              variant="subtitle2"
              color={"text.secondary"}
              sx={{ mt: 2 }}
            >
              {getDays()}
            </Typography>
          </CardContent>
        </MBCard> */}
        <MBCard action="토크" to="/talk">
          <CardContent>
            <Typography variant="subtitle2" color={"text.secondary"}>
              띵큐토크
            </Typography>
          </CardContent>
        </MBCard>
        <MBCard action="TV액자" to="/gallery">
          <CardContent>
            <Typography variant="subtitle2" color={"text.secondary"}>
              TV액자
            </Typography>
          </CardContent>
        </MBCard>
      </StyledPaper>
    </>
  );
}

export default Home;
