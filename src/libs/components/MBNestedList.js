import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useState } from "react";

export default function MBNestedList() {
  const [open, setOpen] = useState(true);
  const handleClick = (props) => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          등록 목록
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="장볼꺼 아이템 정리" secondary="2021.04.21" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemText style={{ marginLeft: "100px" }}>
            배추, 사과, 마늘, 고기, 우유, 요구르트 등등등
          </ListItemText>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText
          primary="강아지 밥주기, 사료챙기기"
          secondary="2021.05.21"
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemText style={{ marginLeft: "100px" }}>
            꼭 음식은 유기농, 장난감은 친환경 소재
          </ListItemText>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="lgu+.co.kr" secondary="2021.03.25" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemText style={{ marginLeft: "100px" }}>
            통신사 가입해야함
          </ListItemText>
        </List>
      </Collapse>
    </List>
  );
}
