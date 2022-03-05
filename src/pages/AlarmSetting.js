import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import React from "react";
import MBAppBar from "../libs/components/MBAppBar";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function AlarmSetting(props) {
  return (
    <>
      <MBAppBar title={"알림 설정"} sub />
      <StyledPaper square></StyledPaper>
    </>
  );
}

export default AlarmSetting;
