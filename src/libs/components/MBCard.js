import styled from "@emotion/styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

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
        <CardActionArea
          component={Link}
          to={props?.to ? props.to : ""}
          sx={{ p: 2 }}
        >
          <CardActions sx={{ p: 0 }}>
            {props.label && (
              <Typography
                color={"black"}
                sx={{ fontSize: 15 }}
                style={{
                  borderRadius: "15px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "#90caf9",
                }}
              >
                {props.label}
              </Typography>
            )}
            <Typography color={"text.primary"} sx={{ fontSize: 20 }}>
              {props.action}
            </Typography>

            {props.to && (
              <StyledIcon aria-label={props.action} size="small">
                <ArrowForwardIosIcon fontSize="small" />
              </StyledIcon>
            )}
          </CardActions>
        </CardActionArea>
        {props.children}
      </Card>
    </Box>
  );
}

export default MBCard;
