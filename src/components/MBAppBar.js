import MenuIcon from "@mui/icons-material/Menu";
import TvIcon from "@mui/icons-material/Tv";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import MBDrawer from "./MBDrawer";

function MBAppBar() {
  const [showDrawer, setShowDrawer] = useState(false);
  const handleDrawer = (show) => {
    setShowDrawer(show);
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
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              모닝브리핑 블랙
            </Typography>
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
          </Toolbar>
        </AppBar>
      </Box>
      <MBDrawer open={showDrawer} onChange={setShowDrawer} />
    </>
  );
}

export default MBAppBar;
