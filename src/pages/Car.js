import styled from "@emotion/styled";
import { Box, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import React from "react";
import MBAppBar from "../libs/components/MBAppBar";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function Car(props) {
  return (
    <>
      <MBAppBar title={"차량"} sub />
      <StyledPaper square>
        <div style={{ padding: "20px", backgroundColor: "#272727" }}>
          <Typography variant="h5" color="#90caf9" fontWeight="bold">
            차량의 정보를 확인할 수 있어요.
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            차량을 등록해보세요.
          </Typography>
          <br />
          <Typography variant="subtitle2" color="text.secondary">
            등록한 차량의 최종 주차 위치, 주행 가능 거리, 누적 운행 거리 등을 알
            수 있어요.
          </Typography>
          <br />
        </div>

        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              등록 차량 목록
            </ListSubheader>
          }
        >
          <Box sx={{ textAlign: "center", paddingTop: "150px" }}>
            <Typography variant="h6">등록된 차량이 없습니다.</Typography>
            <Typography variant="h6">
              '현대 커넥티드 서비스' 차량을 등록해 주세요.
            </Typography>
          </Box>
        </List>
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
            style={{
              borderRadius: "20px",
            }}
            color="inherit"
          >
            차량 추가하기
          </Button>
        </div>
      </StyledPaper>
    </>
  );
}

export default Car;
