import { atom, selector } from "recoil";

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
    customDescription:""
  }
});

export const customDescriptionSelector = selector({
  key: "customDescription",
  get: ({get}) => {
    const data = get(WebCrawlData);
    return data.customDescriptionSelector;
  },
  set: ({set}, description) => {
    set(WebCrawlData, (prevData) => ({...prevData, customDescription:description}));
  }
})