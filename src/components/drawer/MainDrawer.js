import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { tvControlUtil } from "../../util/tvControlUtil";

const action1 = () => {
  alert("action 1");
};
const connect = () => {
  tvControlUtil.connect();
};
const launchWebApp = () => {
  tvControlUtil.launchWebApp();
};
const turnOffTV = () => {
  tvControlUtil.turnOffTV();
};
const action5 = () => {
  alert("action 5");
};
const items = [
  { text: "TV에서 보기", action: action1 },
  { text: "TV와 연결", action: connect },
  { text: "모닝브리핑 켜기", action: launchWebApp },
  { text: "TV 끄기", action: turnOffTV },
  { text: "모바일에서 보기", action: action5 },
];

export const MainDrawer = {
  title: "미리보기",
  list: function () {
    return (
      <List sx={{ py: 0 }}>
        {items.map((item, index) => (
          <ListItem button key={item.text} onClick={item.action}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              secondary={index === 0 ? "UJ6600" : ""}
            />
          </ListItem>
        ))}
      </List>
    );
  },
};
