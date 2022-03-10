import styled from "@emotion/styled";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import { CardContent, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { cyan } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import MBAppBar from "../libs/components/MBAppBar";
import MBSubCard from "../libs/components/MBSubCard";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

const DescText1st = styled.div`
  font-size: 23px;
  font-weight: bold;
  color: #90caf9;
  padding: 24px 24px 0px 24px;
`;

const DescText2nd = styled.div`
  font-size: 23px;
  font-weight: bold;
  color: white;
  padding: 0px 24px 0px 24px;
`;

function AlarmSetting(props) {
  const [value, setValue] = React.useState(
    new Date("2018-01-01T00:00:00.000Z")
  );
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <MBAppBar title={"알림 설정"} sub />
      <StyledPaper square sx={{ pb: 8 }}>
        <DescText1st>알림 시간을 설정해주세요.</DescText1st>
        <DescText2nd>모닝브리핑이 자동으로 실행돼요.</DescText2nd>
        <MBSubCard title="시간 설정">
          <CardContent sx={{ pt: 2 }}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              style={{ paddingTop: "0px" }}
            >
              <MobileTimePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} sx={{ minWidth: "100%" }} />
                )}
              />
            </LocalizationProvider>
          </CardContent>
        </MBSubCard>
        <MBSubCard title="요일 설정">
          <CardContent sx={{ pt: 2 }}>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="월"
                labelPlacement="bottom"
                sx={{ m: 0 }}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="화"
                labelPlacement="bottom"
                sx={{ m: 0 }}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="수"
                labelPlacement="bottom"
                sx={{ m: 0 }}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="목"
                labelPlacement="bottom"
                sx={{ m: 0 }}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="금"
                labelPlacement="bottom"
                sx={{ m: 0 }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="토"
                labelPlacement="bottom"
                sx={{ m: 0 }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="일"
                labelPlacement="bottom"
                sx={{ m: 0 }}
              />
            </FormGroup>
          </CardContent>
          <Divider variant="middle" />
          <CardContent>
            <Radio
              checked={selectedValue === "a"}
              onChange={handleChange}
              value="a"
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
            />
            공휴일에는 알람끄기
          </CardContent>
        </MBSubCard>
        <MBSubCard title="자동 종료 시간 설정">
          <CardContent sx={{ pt: 2 }}>
            종료 시간을 설정하시면 모닝브리핑이 자동으로 종료돼요.
            <RadioGroup
              // aria-labelledby="terminate_time_set"
              defaultValue="female"
              name="terminate_time_group"
              row
            >
              <FormControlLabel
                value="5m"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: cyan[600],
                      },
                    }}
                  />
                }
                label="5분"
              />
              <FormControlLabel
                value="10m"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: cyan[600],
                      },
                    }}
                  />
                }
                label="10분"
              />
              <FormControlLabel
                value="15m"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: cyan[600],
                      },
                    }}
                  />
                }
                label="15분"
              />
              <FormControlLabel
                value="20m"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: cyan[600],
                      },
                    }}
                  />
                }
                label="20분"
              />
            </RadioGroup>
          </CardContent>
        </MBSubCard>
      </StyledPaper>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          minHeight: 50,
          bgcolor: "#1d1d1d",
        }}
      >
        <Button variant="text" sx={{ fontWeight: "bold" }}>
          취소
        </Button>
        <Button variant="text" sx={{ fontWeight: "bold" }}>
          저장
        </Button>
      </Stack>
    </>
  );
}

export default AlarmSetting;
