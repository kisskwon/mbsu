import styled from "@emotion/styled";
import { Card, CardContent, Paper, Typography } from "@mui/material";
import { default as React } from "react";
import MBAppBar from "../libs/components/MBAppBar";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function MemoGuide(props) {
  return (
    <>
      <MBAppBar title={"등록방법 알아보기"} sub />
      <StyledPaper square>
        <div style={{ padding: "20px" }}>
          <Typography variant="h6" fontWeight="bold">
            기존에 사용하는 메모를 모닝브리핑 앱으로 공유하여 정보를 등록해
            주세요.
          </Typography>
          <br />
          <br />
          <Typography variant="subtitle2" fontWeight="bold">
            1. 기존에 사용하는 메모앱에 진입해 주세요.
          </Typography>
          <Card
            elevation={10}
            sx={{
              borderRadius: 3,
              verticalAlign: "middle",
              height: "100px",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color={"text.secondary"}>
                가이드 이미지
              </Typography>
            </CardContent>
          </Card>
          <br />
          <Typography variant="subtitle2" fontWeight="bold">
            2. 모닝브리핑에서 확인하고 싶은 메모를 공유해주세요.
          </Typography>
          <Card
            elevation={10}
            sx={{
              borderRadius: 3,
              verticalAlign: "middle",
              height: "100px",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color={"text.secondary"}>
                가이드 이미지
              </Typography>
            </CardContent>
          </Card>
          <br />
          <Typography variant="subtitle2" fontWeight="bold">
            3. '모닝브리핑'에서 등록된 메모를 확인하고 노출하고 싶은 메모를 노출
            목록으로 올려주세요.
          </Typography>
          <Card
            elevation={10}
            sx={{
              borderRadius: 3,
              verticalAlign: "middle",
              height: "100px",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color={"text.secondary"}>
                가이드 이미지
              </Typography>
            </CardContent>
          </Card>
        </div>
      </StyledPaper>
    </>
  );
}

export default MemoGuide;
