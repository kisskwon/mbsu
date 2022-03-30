import styled from "@emotion/styled";
import { CardContent, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MBAppBar from "../libs/components/MBAppBar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import MBCard from "../libs/components/MBCard";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

function Reminder(props) {
  const navigate = useNavigate();

  return (
    <>
      <MBAppBar title={"알림이 리스트"} sub />
      <StyledPaper square>
        <div style={{ padding: "20px", backgroundColor: "#272727" }}>
          <Typography variant="h5" color="#90caf9" fontWeight="bold">
            알림 받을 내용을 확인합니다.
          </Typography>
        </div>
        <MBCard action="알리미 타이틀">
          <CardContent>
            <Typography variant="subtitle2" color={"text.secondary"}>
              알림 시간 표시
            </Typography>
          </CardContent>
        </MBCard>
      </StyledPaper>

      <Fab color="primary" aria-label="add" sx={fabStyle}>
        <AddIcon onClick={() => navigate("/addReminder")} />
      </Fab>
    </>
  );
}

export default Reminder;
