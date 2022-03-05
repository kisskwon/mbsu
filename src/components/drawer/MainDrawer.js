import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

export const MainDrawer = {
  title: "미리보기",
  list: (
    <List sx={{ py: 0 }}>
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
  ),
};
