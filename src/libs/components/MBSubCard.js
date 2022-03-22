import styled from "@emotion/styled";
import { Box, Card, CardActions, IconButton, Typography } from "@mui/material";
import React from "react";

const StyledIcon = styled(IconButton)(() => ({
  marginLeft: "auto",
}));

function MBCard(props) {
  return (
    <Box sx={{ mx: 2, py: 1.5 }}>
      {props.title && (
        <Box sx={{ px: 1, my: 1 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
            {props.title}
          </Typography>
          {props.subtitle && (
            <Typography variant="caption" color={"text.secondary"}>
              {props.subtitle}
            </Typography>
          )}
        </Box>
      )}
      <Card elevation={10} sx={{ borderRadius: 3 }}>
        <CardActions sx={{ p: 0 }}>
          <Typography color={"text.primary"} sx={{ fontSize: 20 }}>
            {props.action}
          </Typography>
        </CardActions>
        {props.children}
      </Card>
    </Box>
  );
}

export default MBCard;
