import styled from "@emotion/styled";
import { CardContent, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import MBAppBar from "../libs/components/MBAppBar";
import MBCard from "../libs/components/MBCard";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function Weather(props) {
  const navigate = useNavigate();
  return (
    <>
      <MBAppBar title={"날씨"} sub />
      <StyledPaper square>
        <div style={{ padding: "20px", backgroundColor: "#272727" }}>
          <Typography variant="h5" color="cyan" fontWeight="bold">
            날씨를 알고싶은 지역을
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            등록해보세요.
          </Typography>
          <br />
          <Typography variant="subtitle2" color="text.secondary">
            해당 지역의 날씨를 TV 화면에서 확인할 수 있어요.
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {" "}
            ※ 최대 2개까지 등록가능해요.
          </Typography>
        </div>
        <MBCard label="대표" action="가양1동" to="/regionSearch">
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              가양1동
            </Typography>
          </CardContent>
        </MBCard>
        <div
          style={{
            position: "fixed",
            bottom: "25px",
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/regionSearch");
            }}
            style={{
              borderRadius: "20px",
            }}
            color="inherit"
          >
            지역 추가하기
          </Button>
        </div>
      </StyledPaper>
    </>
  );
}

export default Weather;
