import { Box, Drawer, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";

const useStyles = makeStyles(() => ({
  paper: {
    borderTopLeftRadius: "18px",
    borderTopRightRadius: "18px",
  },
}));

export default function MBDrawer(props) {
  const classes = useStyles();
  const toggleDrawer = (toggle) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    props.onChange(toggle);
  };

  return (
    <React.Fragment>
      <Drawer
        anchor={"bottom"}
        open={props.open}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.paper }}
        sx={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography sx={{ fontSize: 18 }}>{props.data.title}</Typography>
        </Box>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {props.data.list()}
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
