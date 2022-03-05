import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import React from "react";
import MBAppBar from "../libs/components/MBAppBar";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function Car(props) {
  return (
    <>
      <MBAppBar title={"차량"} sub />
      <StyledPaper square></StyledPaper>
    </>
  );
}

export default Car;
