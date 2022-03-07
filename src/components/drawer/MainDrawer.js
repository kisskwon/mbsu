import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const action1 = () => {
  alert("action 1");
};
const action2 = () => {
  alert("action 2");
};
const action3 = () => {
  alert("action 3");
};
const action4 = () => {
  alert("action 4");
};
const action5 = () => {
  alert("action 5");
};
const items = [
  { text: "TV에서 보기", action: action1 },
  { text: "TV와 연결", action: action2 },
  { text: "모닝브리핑 켜기", action: action3 },
  { text: "TV 끄기", action: action4 },
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
