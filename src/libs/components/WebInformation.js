import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { WebCrawlData } from "../../data/CrawlData";

const Image = styled("img")({
  width: "100%"
});

function WebInformation(props) {
  // const { loading = false } = props;
  const [loading, setLoading] = useState(true);
  let result = { title: "", imageUrl: "", description: "" };
  const [data, setData] = useState(result);
  const setWebCrawlData = useSetRecoilState(WebCrawlData);

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
          ) : (
            <Avatar src="https://cdn-icons.flaticon.com/png/512/3165/premium/3165112.png?token=exp=1648618835~hmac=0fbb4b4b1fb60938e532a303b2ee8913" />
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          {loading ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
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
    </div>
  );
}

export default WebInformation;
