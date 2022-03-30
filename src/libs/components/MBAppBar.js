import BackIcon from "@mui/icons-material/ArrowBack";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import MbIcon from "@mui/icons-material/Dvr";
import MenuIcon from "@mui/icons-material/Menu";
import ShowPhonelIcon from "@mui/icons-material/Phonelink";
import ShowTvIcon from "@mui/icons-material/ResetTv";
import SettingsIcon from "@mui/icons-material/Settings";
import IpSettingIcon from "@mui/icons-material/SettingsInputAntenna";
import TvIcon from "@mui/icons-material/Tv";
import TvOffIcon from "@mui/icons-material/TvOff";
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

  const turnOnTv = () => {
    const mac = localStorage.getItem("macAddr");
    const ip = localStorage.getItem("ipAddr");
    console.log("mac is ", mac, " ip is ", ip);

    let ips = ip.split(".");
    ips[ips.length - 1] = "255";
    let changeIp = ips.join(".");
    console.log("change ip is ", changeIp);
    window.cordova.plugins.TVConnect.turnOn(mac, changeIp, (result) => {
      console.log("turn on ok...", result);
      window.cordova.plugins.TVConnect.toast("TV를 켰어요.");
    });
  };

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
                if (props.reminder) {
                  navigator.app.exitApp();
                } else if (props.sub) {
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
              action={() => turnOnTv()}
              icon={<ShowTvIcon />}
            />
            <MBDrawerItem
              title={"TV와 연결"}
              action={() => tvControlUtil.connect()}
              icon={<ConnectedTvIcon />}
            />
            <MBDrawerItem
              title={"모닝브리핑 켜기"}
              action={() => tvControlUtil.launchWebApp()}
              icon={<MbIcon />}
            />
            <MBDrawerItem
              title={"TV 끄기"}
              action={() => tvControlUtil.turnOffTV()}
              icon={<TvOffIcon />}
            />
            <MBDrawerItem
              title={"모바일에서 보기"}
              action={() => alert("action 5")}
              icon={<ShowPhonelIcon />}
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
              icon={<IpSettingIcon />}
            />
            <MBDrawerItem title={"설정"} icon={<SettingsIcon />} />
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
