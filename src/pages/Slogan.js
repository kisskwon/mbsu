import styled from "@emotion/styled";
import { CardContent, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React from "react";
import { useNavigate } from "react-router-dom";
import MBAppBar from "../libs/components/MBAppBar";
import MBCard from "../libs/components/MBCard";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function Slogan(props) {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate(-1);
  };

  return (
    <>
      <MBAppBar title={"대표 문구"} sub />
      <StyledPaper square>
        <div style={{ padding: "20px", backgroundColor: "#272727" }}>
          <Typography variant="h5" color="#90caf9" fontWeight="bold">
            TV에 보여지는 닉네임과 인사말을
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            설정할 수 있어요.
          </Typography>
          <br />
          <Typography variant="subtitle2" color="text.secondary">
            예. 모닝님! 안녕하세요. 좋은 아침입니다.
          </Typography>
          <br />
        </div>

        <MBCard action="닉네임 노출 설정">
          <CardContent>
            <Typography variant="body1" color={"text.secondary"}>
              비활성화 상태에서는 이름이 보여져요.
            </Typography>
            <Typography variant="body2" color={"text.secondary"}>
              닉네임: 모닝
            </Typography>
          </CardContent>
        </MBCard>

        <MBCard
          title="인사말 설정"
          action="인사말 직접 등록"
          to="/editGreeting"
        >
          <CardContent>
            <Typography variant="body1" color={"text.secondary"}>
              인사말을 직접 입력할 수 있어요.
            </Typography>
            <Typography variant="body2" color={"text.secondary"}>
              {localStorage.getItem("greeting")
                ? localStorage.getItem("greeting")
                : "모닝님! 오늘도 화이팅!"}
            </Typography>
          </CardContent>
        </MBCard>

        <MBCard action="날씨 자동 인사말">
          <CardContent>
            <Typography variant="body1" color={"text.secondary"}>
              금일 날씨와 관련된 문구가 제공되요.
            </Typography>
            <Typography variant="body2" color={"text.secondary"}>
              예) 홍길동님! 오늘 날씨는 추우니 따뜻하게 입고 가세요!
            </Typography>
          </CardContent>
        </MBCard>

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
          <Button
            variant="text"
            sx={{ fontWeight: "bold" }}
            onClick={handleSave}
          >
            저장
          </Button>
        </Stack>
      </StyledPaper>
    </>
  );
}

export default Slogan;
