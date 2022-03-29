import { atom } from "recoil";

export const NetflixData = atom({
  key: "NetflixData",
  default: {
    title:"",
    titleid:"",
    summary:"",
    url:""
  }
})