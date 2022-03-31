import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { customDescriptionSelector, WebCrawlData } from "../../data/CrawlData";

const Image = styled("img")({
  width: "100%"
});

function WebInformation(props) {
  // const { loading = false } = props;
  const [loading, setLoading] = useState(true);
  let result = { title: "", imageUrl: "", description: "" };
  const [data, setData] = useState(result);
  const setWebCrawlData = useSetRecoilState(WebCrawlData);
  const [customDescription, setCustomDescription] = useRecoilState(customDescriptionSelector);
  const handleChange = (e) => {
    setCustomDescription(e.target.value);
  };

  const crawl = async () => {
    const getInformation = () => {
      try {
        const httpsUrl = props.url;
        console.log("httpsUrl :" + httpsUrl);
        const endcodeUrl = encodeURIComponent(httpsUrl);
        return axios.get("https://asia-northeast3-netflix-crawling.cloudfunctions.net/app/api/crawling/web?url=" + endcodeUrl); //firebase
      } catch (e) {
        console.error(e);
      }
    };

    await getInformation()
      .then((result) => {
        return result.data;
      })
      .then((res) => {
        console.log("result.title is " + res.title);
        console.log("result.imageUrl is " + res.imageUrl);
        setData({ title: res.title, imageUrl: res.imageUrl, description: res.description });
        setLoading(false);

        setWebCrawlData({title:res.title, description:res.description, url:res.imageUrl});
      });
  };

  useEffect(() => {
    console.log("useEffect ");
    crawl();
  }, []);
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ margin: 1 }}>
          {loading ? (
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          ) :
          (
            data.title === "" ? (<></>) :
            (<Avatar src="https://cdn-icons-png.flaticon.com/512/3081/3081648.png" />)
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          {loading ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) :
          (
            data.title === "" ? (<></>) :
            <Typography variant="h5">{data.title}</Typography>
          )}
        </Box>
      </Box>
      {loading ? (
        <Skeleton variant="rectangular" width="100%">
          <div style={{ paddingTop: "57%" }} />
        </Skeleton>
      ) : (
        <Image src={data.imageUrl} alt="" />
      )}
      <Box sx={{ width: "100%" }}>
        {loading ? (
          <Skeleton width="100%" height={80}>
            <Typography>.</Typography>
          </Skeleton>
        ) : (
          <Typography>{data.description}</Typography>
        )}
      </Box>
      <Box sx={{ width: "100%" }}>
        {loading ? (
          <Skeleton width="100%" height={100}>
            <Typography>.</Typography>
          </Skeleton>
        ) : (
          <div
              style={{
                display: "grid",
                width: "90%",
                margin: "auto",
                marginBottom: "15px",
                marginTop: "15px",
              }}
            >
              <TextField
                id="reminder-url"
                label="보낼 메시지를 직접 작성해보세요."
                multiline
                margin="normal"
                onChange={handleChange}
              />
            </div>
        )}
      </Box>
    </div>
  );
}

export default WebInformation;
