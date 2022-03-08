import styled from "@emotion/styled";
import { CardContent, Paper, Typography } from "@mui/material";
import React from "react";
import MBAppBar from "../libs/components/MBAppBar";
import MBCard from "../libs/components/MBCard";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function Home(props) {
  return (
    <>
      <MBAppBar title={"모닝브리핑 블랙"} />
      <StyledPaper square>
        <MBCard title="알림 설정" action="알림" to="/alarm">
          <CardContent sx={{ py: 1 }}>
            <Typography sx={{ fontSize: 30 }}>6:50 pm</Typography>
            <Typography variant="subtitle2" color={"text.secondary"}>
              5분 후 자동 종료
            </Typography>
            <Typography
              variant="subtitle2"
              color={"text.secondary"}
              sx={{ mt: 2 }}
            >
              월, 화, 수, 목, 금
            </Typography>
          </CardContent>
        </MBCard>
        <MBCard action="토크" to="/talk">
          <CardContent>
            <Typography variant="subtitle2" color={"text.secondary"}>
              띵큐토크
            </Typography>
          </CardContent>
        </MBCard>
        <MBCard title="기본 위젯 설정" action="날씨" to="/weather">
          <CardContent>
            <Typography variant="subtitle2" color={"text.secondary"}>
              '논현동'의 날씨를 확인할 수 있어요.
            </Typography>
          </CardContent>
        </MBCard>
        <MBCard
          title="선택 위젯 설정"
          subtitle="2개 이상의 위젯을 선택해주세요."
          action="교통"
          to="/navi"
        >
          <CardContent>
            <Typography variant="subtitle2" color={"text.secondary"}>
              마곡동에서 압구정동까지 가장 빠른길을 확인할 수 있어요.
            </Typography>
          </CardContent>
        </MBCard>
        <MBCard action="메모" to="/memo">
          <CardContent>
            <Typography variant="subtitle2" color={"text.secondary"}>
              등록한 4개의 메모를 확인할 수 있어요.
            </Typography>
          </CardContent>
        </MBCard>
        <MBCard action="일정" to="/calendar">
          <CardContent>
            <Typography variant="subtitle2" color={"text.secondary"}>
              등록한 5개의 일정을 확인할 수 있어요.
            </Typography>
          </CardContent>
        </MBCard>
        <MBCard action="차량" to="/car">
          <CardContent>
            <Typography variant="subtitle2" color={"text.secondary"}>
              "홍길동의 차" 주차위치와 차량정보를 확인할 수 있어요.
            </Typography>
          </CardContent>
        </MBCard>
        <MBCard title="공통설정" action="대표 문구" to="/slogan">
          <CardContent>
            <Typography variant="subtitle2" color={"text.secondary"}>
              Good morning, Gildong! Have a nice day!
            </Typography>
          </CardContent>
        </MBCard>
      </StyledPaper>
    </>
  );
}

export default Home;
