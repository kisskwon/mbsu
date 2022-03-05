import styled from "@emotion/styled";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import * as React from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

export default function MBDrawer({ open, onChange }) {
  const toggleDrawer = (toggle) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    onChange(toggle);
  };

  const list = () => (
    <>
      <StyledBox>
        <Typography sx={{ ml: 1, p: 2 }}>미리보기</Typography>
      </StyledBox>
      <Box
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {[
            "TV에서 보기",
            "TV와 연결",
            "모닝브리핑 켜기",
            "TV 끄기",
            "모바일에서 보기",
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                secondary={index === 0 ? "UJ6600" : ""}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <React.Fragment>
      <Drawer anchor={"bottom"} open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
