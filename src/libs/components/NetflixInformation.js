import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { NetflixData } from "../../data/CrawlData";

const Image = styled("img")({
  width: "100%"
});

const getHttpsUrl = (url) => {
  if (url.includes("https://")) {
    if (url.indexOf("https://") === 0) {
      return url;
    } else {
      return url.substring(url.indexOf("https"));
    }
  }
  return undefined;
};

const getTitleId = (originaUrl) => {
  if (originaUrl !== undefined) {
    var regex = /[^0-9]/g; // 숫자가 아닌 문자열을 선택하는 정규식
    const url = originaUrl.split("?")[0].replace(regex, "");
    console.log("nexflix titleId : " + url);
    return url;
  }
};

function NetflixInformation(props) {
  // const { loading = false } = props;
  const [loading, setLoading] = useState(true);
  let result = { title: "", imageUrl: "", synopsis: "" };
  const [data, setData] = useState(result);
  const setNeflixData = useSetRecoilState(NetflixData);

  const crawl = async () => {
    const getInformation = () => {
      try {
        const httpsUrl = getHttpsUrl(props.url);
        console.log("props.url :" + props.url);
        console.log("httpsUrl :" + httpsUrl);

        const titleId = getTitleId(httpsUrl);
        if (titleId !== undefined) {
          console.log("titleId : " + titleId);
          //return axios.get("https://my-nodejs-test-app.herokuapp.com/api/crawling/netflix?titleId=" + titleId); //heroku
          return axios.get("https://asia-northeast3-netflix-crawling.cloudfunctions.net/app/api/crawling/netflix?titleId=" + titleId); //firebase
        }
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
        setData({ title: res.title, imageUrl: res.imageUrl, synopsis: res.synopsis });
        setLoading(false);

        const url = getHttpsUrl(props.url);
        const titleId = getTitleId(url);
        setNeflixData({title:res.title, titleid:titleId, summary:res.synopsis, url:res.imageUrl});
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
          ) : (data.title === undefined ? <></> :
            <Avatar src="https://scontent-ssn1-1.xx.fbcdn.net/v/t31.18172-1/13490708_1055815107843429_6253986289710696521_o.png?stp=dst-png_p148x148&amp;_nc_cat=1&amp;ccb=1-5&amp;_nc_sid=1eb0c7&amp;_nc_ohc=ZBg617M8aVEAX_N2Ysc&amp;_nc_ht=scontent-ssn1-1.xx&amp;oh=00_AT8yCYPxV8MTKprgaPQLgx3xwHTmQ6OAFqeLIOxqiZu8RA&amp;oe=6265DCAD" />
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
        <Image src={data.title !== undefined ? data.imageUrl : "https://cdn.pixabay.com/photo/2017/06/20/08/12/maintenance-2422173_960_720.png"} alt="" />
      )}
      <Box sx={{ width: "100%" }}>
        {loading ? (
          <Skeleton width="100%" height={80}>
            <Typography>.</Typography>
          </Skeleton>
        ) : (
          <Typography>{data.title !== undefined ? data.synopsis : "현재 크롤링은 미국서버에서 동작하기 때문에 해당 작품에 대한 정보를 가져올 수 없습니다."}</Typography>
        )}
      </Box>
    </div>
  );
}

export default NetflixInformation;
