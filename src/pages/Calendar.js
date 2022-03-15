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

function Calendar(props) {
  return (
    <>
      <MBAppBar title={"일정"} sub />
      <StyledPaper square>
        <div style={{ padding: "20px", backgroundColor: "#272727" }}>
          <Typography variant="h5" color="#90caf9" fontWeight="bold">
            상세 일정을 확인할 수 있어요.
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            계정을 연동해보세요.
          </Typography>
          <br />
          <Typography variant="subtitle2" color="text.secondary">
            연동된 계정의 월간 및 주간 캘린더와 상세 일정을 알 수 있어요.
          </Typography>
          <br />
        </div>

        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              일정 목록
            </ListSubheader>
          }
        >
          <Box sx={{ textAlign: "center", paddingTop: "150px" }}>
            <Typography variant="h6">등록된 계정이 없습니다.</Typography>
            <Typography variant="h6">
              일정이 등록된 계정을 연동해주세요.
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
            일정 추가하기
          </Button>
        </div>
      </StyledPaper>
    </>
  );
}

export default Calendar;
