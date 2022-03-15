import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MBAppBar from "../libs/components/MBAppBar";

const StyledPaper = styled(Paper)(() => ({
  minHeight: "100vh",
}));

function EditGreeting(props) {
  const navigate = useNavigate();
  const handleSave = () => {
    localStorage.setItem("greeting", name);
    navigate(-1);
  };

  const [name, setName] = useState("");
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <MBAppBar title={"인사말 편집"} sub />
      <StyledPaper square>
        <FormControl
          variant="standard"
          style={{ padding: "20px", width: "90%" }}
        >
          <Input
            id="component-helper"
            value={name}
            onChange={handleChange}
            aria-describedby="component-helper-text"
            placeholder="안녕하세요. 좋은 아침입니다."
          />
          <FormHelperText id="component-helper-text">
            인사말을 등록할 수 있어요.
          </FormHelperText>
        </FormControl>

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
          <Button
            variant="text"
            sx={{ fontWeight: "bold" }}
            onClick={handleSave}
          >
            저장
          </Button>
        </Stack>
      </StyledPaper>
    </>
  );
}

export default EditGreeting;
