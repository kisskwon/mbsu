import { atom } from "recoil";

export const NetflixData = atom({
  key: "NetflixData",
  default: {
    title:"",
    titleid:"",
    summary:"",
    url:""
  }
});

export const WebCrawlData = atom({
  key: "WebCrawlData",
  default: {
    title:"",
    description:"",
    url:"",
  }
})