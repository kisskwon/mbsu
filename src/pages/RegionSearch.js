import styled from "@emotion/styled";
import Home from "@mui/icons-material/Home";
import Search from "@mui/icons-material/Search";
import { Box, Paper, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";
import MBAppBar from "../libs/components/MBAppBar";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function RegionSearch(props) {
  return (
    <>
      <MBAppBar title={"지역검색"} sub />
      <StyledPaper square>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="standard"
          placeholder="읍/면/동 단위로 입력해주세요."
          sx={{
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "10px",
            width: "90vh",
          }}
        />

        <Box sx={{ padding: "20px" }}>
          <Typography variant="h6">
            <Home
              sx={{
                color: "cyan",
                marginRight: "5px",
                verticalAlign: "text-bottom",
              }}
            />
            우리집(가양1동)
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              backgroundColor: "#272727",
            }}
            variant="subtitle2"
          >
            최근 검색 위치
          </Typography>
          <Box sx={{ textAlign: "center", paddingTop: "150px" }}>
            <Typography variant="h6">최근 검색 위치가 없습니다.</Typography>
          </Box>
        </Box>
      </StyledPaper>
    </>
  );
}

export default RegionSearch;