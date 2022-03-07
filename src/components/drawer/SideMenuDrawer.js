import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

export const SideMenuDrawer = {
  // title: "미리보기",
  list: function () {
    return (
      <List sx={{ py: 0 }}>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"IP 설정"} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={"설정"} />
        </ListItem>
      </List>
    );
  },
};
