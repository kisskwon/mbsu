import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import { default as React } from "react";
import { Link } from "react-router-dom";
import MBAppBar from "../libs/components/MBAppBar";
import MBNestedList from "../libs/components/MBNestedList";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function Memo(props) {
  return (
    <>
      <MBAppBar title={"메모"} sub />
      <StyledPaper square>
        <div style={{ padding: "20px", backgroundColor: "#272727" }}>
          <Typography variant="h5" color="#90caf9" fontWeight="bold">
            메모 내용을 확인할 수 있어요.
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            메모를 공유해보세요.
          </Typography>
          <br />
          <Typography variant="subtitle2" color="text.secondary">
            메모의 상세 내용과 편집 일자를 알 수 있어요.
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {" "}
            ※ 최대 3개까지 노출 가능해요.
          </Typography>
          <br />
          <Link to="/memoGuide" style={{ color: "DodgerBlue" }}>
            등록 방법 알아보기
          </Link>
        </div>
        <MBNestedList />
      </StyledPaper>
    </>
  );
}

export default Memo;
