import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import TvIcon from "@mui/icons-material/Tv";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MBDrawer from "./MBDrawer";

function MBAppBar(props) {
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate();
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
              onClick={() => navigate(-1)}
            >
              {props.sub ? <ArrowBackIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.title}
            </Typography>
            {props.drawer && (
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
      {props.drawer && (
        <MBDrawer
          open={showDrawer}
          onChange={setShowDrawer}
          data={props.drawer}
        />
      )}
    </>
  );
}

export default MBAppBar;
