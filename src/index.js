import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const renderReactDom = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

if (window.cordova) {
  document.addEventListener(
    "deviceready",
    () => {
      console.log("2MB cordova deviceready");
      renderReactDom();
      window.cordova?.plugins?.TVConnect.toast("cordova deviceready success!");
    },
    false
  );
} else {
  renderReactDom();
}
