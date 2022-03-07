import { Box, Drawer, List, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  paperLeft: {
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
  },
  paperBottom: {
    borderTopLeftRadius: "18px",
    borderTopRightRadius: "18px",
  },
}));

function MBDrawer(props) {
  const classes = useStyles();
  let paper = {};
  switch (props.anchor) {
    case "bottom":
      paper = classes.paperBottom;
      break;
    case "left":
      paper = classes.paperLeft;
      break;
  }
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
        anchor={props.anchor}
        open={props.open}
        onClose={toggleDrawer(false)}
        classes={{ paper: paper }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography sx={{ fontSize: 18 }}>{props.title}</Typography>
        </Box>
        <Box
          sx={{
            width:
              props.anchor === "top" || props.anchor === "bottom"
                ? "auto"
                : 250,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List sx={{ py: 0 }}>{props.children}</List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default MBDrawer;
