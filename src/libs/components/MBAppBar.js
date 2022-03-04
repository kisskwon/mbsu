import BackIcon from "@mui/icons-material/ArrowBack";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import TvIcon from "@mui/icons-material/Tv";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NetworkInfoDialog from "../../components/NetworkInfoDialog";
import { tvControlUtil } from "../../util/tvControlUtil";
import MBDrawer from "./MBDrawer";
import MBDrawerItem from "./MBDrawerItem";

function MBAppBar(props) {
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                if (props.sub) {
                  navigate(-1);
                } else {
                  setShowSideMenu(true);
                }
              }}
            >
              {props.sub ? <BackIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.title}
            </Typography>
            {!props.sub && (
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setShowDrawer(true);
                }}
              >
                <TvIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {!props.sub && (
        <>
          <MBDrawer
            anchor="bottom"
            title={"미리보기"}
            open={showDrawer}
            onChange={setShowDrawer}
          >
            <MBDrawerItem
              title={"TV에서 보기"}
              action={() => alert("action 1")}
              icon={<InboxIcon />}
            />
            <MBDrawerItem
              title={"TV와 연결"}
              action={() => tvControlUtil.connect()}
              icon={<MailIcon />}
            />
            <MBDrawerItem
              title={"모닝브리핑 켜기"}
              action={() => tvControlUtil.launchWebApp()}
              icon={<InboxIcon />}
            />
            <MBDrawerItem
              title={"TV 끄기"}
              action={() => tvControlUtil.turnOffTV()}
              icon={<MailIcon />}
            />
            <MBDrawerItem
              title={"모바일에서 보기"}
              action={() => alert("action 5")}
              icon={<InboxIcon />}
            />
          </MBDrawer>
          <MBDrawer
            anchor="left"
            open={showSideMenu}
            onChange={setShowSideMenu}
          >
            <MBDrawerItem
              title={"IP 설정"}
              action={() => setIsOpenDialog(true)}
              icon={<InboxIcon />}
            />
            <MBDrawerItem title={"설정"} icon={<MailIcon />} />
          </MBDrawer>
          <NetworkInfoDialog
            isOpen={isOpenDialog}
            onComplete={() => setIsOpenDialog(false)}
          />
        </>
      )}
    </>
  );
}

export default MBAppBar;
