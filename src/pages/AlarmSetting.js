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
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import krLocale from "date-fns/locale/ko";
import { format } from "date-fns";
import cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [time, setTime] = useState();
  const [holidayChecked, setHolidayChecked] = useState(
    localStorage.getItem("alarmHoliday") === "true"
  );

  useEffect(() => {
    let date = new Date();
    let savedTime = localStorage.getItem("alarmTime");
    if (savedTime === null) {
      date.setHours(7);
      date.setMinutes(0);
      date.setSeconds(0);
    } else {
      date = new Date(JSON.parse(savedTime));
      date.setSeconds(0);
    }
    setTime(date);

    let savedDay = localStorage.getItem("alarmDay");
    if (savedDay !== null) {
      setDayList(JSON.parse(savedDay));
    }
  }, []);

  const [dayList, setDayList] = useState([
    {
      index: 0,
      title: "Mon",
      checked: true,
    },
    {
      index: 1,
      title: "Tue",
      checked: true,
    },
    {
      index: 2,
      title: "Wed",
      checked: true,
    },
    {
      index: 3,
      title: "Thu",
      checked: true,
    },
    {
      index: 4,
      title: "Fri",
      checked: true,
    },
    {
      index: 5,
      title: "Sat",
      checked: false,
    },
    {
      index: 6,
      title: "Sun",
      checked: false,
    },
  ]);

  const onDayChanged = async (index) => {
    const beforeDayList = cloneDeep(dayList);
    let tempDayList = dayList.map((item, i) => {
      if (index === i) {
        return { ...item, checked: !item.checked };
      } else {
        return item;
      }
    });
    setDayList(tempDayList);
  };

  const handleHolidayChange = (event) => {
    setHolidayChecked(event.target.checked);
  };

  const handleSave = () => {
    localStorage.setItem("alarmTime", JSON.stringify(time));
    localStorage.setItem("alarmDay", JSON.stringify(dayList));
    localStorage.setItem("alarmHoliday", holidayChecked);

    window.cordova?.plugins?.TVConnect.toast("저장되었습니다.");
    navigate(-1);

    const nativeTime = new Date(time);
    const hour = format(nativeTime, "HH");
    const min = format(nativeTime, "mm");
    console.log("native time hour " + hour + " min " + min);
    window.cordova?.plugins?.TVConnect.setTime(hour, min, dayList[0], holidayChecked, 0, (result) => {
      console.log("setTime result : ", result);
    })
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
              locale={krLocale}
              style={{ paddingTop: "0px" }}
            >
              <MobileTimePicker
                value={time}
                onChange={(newValue) => {
                  console.log("time changed" + JSON.stringify(newValue));
                  setTime(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} sx={{ minWidth: "100%" }} />
                )}
              />
            </LocalizationProvider>
          </CardContent>
        </MBSubCard>
        <MBSubCard title="요일 설정">
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              {dayList.map((item, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox checked={item.checked} />}
                  label={item.title}
                  labelPlacement="bottom"
                  onChange={() => onDayChanged(index)}
                  sx={{ mx: 0 }}
                />
              ))}
            </Stack>
          </CardContent>
          <Divider variant="middle" />
          <CardContent>
            <Checkbox checked={holidayChecked} onChange={handleHolidayChange} />
            공휴일에는 알람끄기
          </CardContent>
        </MBSubCard>
        <MBSubCard title="자동 종료 시간 설정">
          <CardContent sx={{ pt: 2 }}>
            종료 시간을 설정하시면 모닝브리핑이 자동으로 종료돼요.
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
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
            </Stack>
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
          minHeight: 56,
          bgcolor: "#1d1d1d",
        }}
      >
        <Button
          variant="text"
          sx={{ fontWeight: "bold" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </Button>
        <Button variant="text" sx={{ fontWeight: "bold" }} onClick={handleSave}>
          저장
        </Button>
      </Stack>
    </>
  );
}

export default AlarmSetting;
