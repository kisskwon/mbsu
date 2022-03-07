import { Box, Drawer, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  paper: {
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
  },
}));

function MBSideMenu({ open, onChange, data }) {
  const classes = useStyles();
  const toggleDrawer = (toggle) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    onChange(toggle);
  };

  return (
    <React.Fragment>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.paper }}
        sx={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography sx={{ fontSize: 18 }}>{data.title}</Typography>
        </Box>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {data.list()}
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default MBSideMenu;
