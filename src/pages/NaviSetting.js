import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React from "react";
import MBAppBar from "../libs/components/MBAppBar";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

const DescText1st = styled.div`
  font-size: 23px;
  font-weight: bold;
  color: #90caf9;
  padding: 24px 0px 0px 0px;
`;

const DescText2nd = styled.div`
  font-size: 23px;
  font-weight: bold;
  color: white;
`;

const DescText3rd = styled.div`
  font-size: 14px;
  color: #d4d4d4;
`;

const NoRouteText = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 50vh;
`;

function NavigationSetting(props) {
  return (
    <>
      <MBAppBar title={"교통"} sub />
      <StyledPaper square sx={{ pb: 8, px: 3 }}>
        <DescText1st>매일 아침 확인하고 싶은</DescText1st>
        <DescText2nd>경로를 선택하세요.</DescText2nd>
        <DescText3rd style={{ marginTop: "12px", marginBottom: "12px" }}>
          목적지까지 예상시간과 상세 경로를 알 수 있어요.
          <br></br>※ 최대 3개까지 노출 가능해요.
        </DescText3rd>
        <NoRouteText>등록된 경로가 없어요.</NoRouteText>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            position: "fixed",
            bottom: 20,
            left: 0,
            right: 0,
            minHeight: 70,
          }}
        >
          <Button variant="outlined">경로 추가하기</Button>
        </Stack>
      </StyledPaper>
    </>
  );
}

export default NavigationSetting;
