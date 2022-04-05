var PROTECTED_MANIFEST = {
  manifestVersion: 1,
  appVersion: "1.0",
  appId: "com.lge.test",
  vendorId: "com.lge",
  localizedAppNames: {
    "": "Test Remote App",
    "ko-KR": "Test 리모컨 앱",
    "zxx-XX": "ЛГ Test Rэмotэ AПП",
  },
  permissions: [
    "LAUNCH",
    "LAUNCH_WEBAPP",
    "TEST_OPEN",
    "TEST_PROTECTED",
    "CONTROL_AUDIO",
    "CONTROL_DISPLAY",
    "CONTROL_INPUT_JOYSTICK",
    "CONTROL_INPUT_MEDIA_RECORDING",
    "CONTROL_INPUT_MEDIA_PLAYBACK",
    "CONTROL_INPUT_TV",
    "CONTROL_POWER",
    "CONTROL_INPUT_TEXT",
    "CONTROL_MOUSE_AND_KEYBOARD",
    "READ_APP_STATUS",
    "READ_CURRENT_CHANNEL",
    "READ_INPUT_DEVICE_LIST",
    "READ_NETWORK_STATE",
    "READ_INSTALLED_APPS",
    "READ_TV_CHANNEL_LIST",
    "WRITE_NOTIFICATION_TOAST",
  ],
};

const REQUEST_LAUNCH_WEB_APP_OVERLAY = 10001;

let ws;
let connected = false;
let currentClientKey = null;
let successCallback = () => {};
let errorCallback = () => {};

function handleResponse(message) {
  var noOutput = false;
  var id = "" + message.id;

  if (message.type === "registered") {
    showToast("registered!!");
    noOutput = handleRegisteredResponse(message);
    launchWebAppOverlay();
  }

  if (message.id === REQUEST_LAUNCH_WEB_APP_OVERLAY && successCallback) {
    setTimeout(() => {
      console.log("fire successCallback");
      successCallback();
    }, 3000);
  }

  // !noOutput && updateResponseField(message);
}

async function handleRegisteredResponse(message) {
  var clientKey = message.payload["client-key"];

  if (clientKey) {
    currentClientKey = clientKey;
    localStorage.setItem("TV_CONNECT_CLIENT_KEY", currentClientKey || "");
  }
}

const connect = async () => {
  const tvIpAddrr = localStorage.getItem("ipAddr");
  currentClientKey = localStorage.getItem("TV_CONNECT_CLIENT_KEY");
  showToast("connecting...", tvIpAddrr);

  try {
    ws = new WebSocket(`ws://${tvIpAddrr}:3000/`);
  } catch (e) {
    console.error(e);
    return;
  }

  ws.onopen = function () {
    console.log("connection established ws:", ws);
    connected = true;
    if (true) {
      var request;
      if (currentClientKey) {
        console.log("auto-registering with existing client-key: ");
        request = {
          type: "register",
          payload: { "client-key": currentClientKey },
        };
      } else {
        console.log("auto-registering with protected manifest!");
        request = {
          type: "register",
          payload: { manifest: PROTECTED_MANIFEST },
        };
      }

      ws.send(JSON.stringify(request));
    }
  };

  ws.onmessage = function (event) {
    try {
      var message = JSON.parse(event.data);
      showToast("onmessage:", message);
      handleResponse(message);
    } catch (e) {
      showToast("Receive response: JSON parse error");
    }
  };

  ws.onerror = function (event) {
    connected = false;
    if (errorCallback) {
      errorCallback();
    }

    showToast("websocket error", event);
  };

  ws.onclose = function (event) {
    connected = false;
    showToast("connection closed", event);
  };

  return ws;
};

const launchWebApp = (
  webAppUrl = "http://10.158.2.146:3001/webapp/index.html"
) => {
  showToast("launchWebApp");
  ws.send(
    JSON.stringify({
      type: "subscribe",
      id: 1,
      uri: "ssap://webapp/launchWebApp",
      payload: {
        webAppId: "test",
        webAppUrl,
      },
    })
  );
};

const launchOneshotOverlay = (opt, onSuccess, onError) => {
  successCallback = onSuccess;
  errorCallback = onError;
  if (connected) {
    launchWebAppOverlay();
  } else {
    connect();
  }
};

const launchWebAppOverlay = () => {
  showToast("launchWebAppOverlay");
  const url = "https://kisskwon.github.io/thinq_talk/";
  ws.send(
    JSON.stringify({
      type: "request",
      id: REQUEST_LAUNCH_WEB_APP_OVERLAY,
      uri: "ssap://webapp/launchWebApp",
      payload: {
        webAppId: "test-web-app",
        webAppUrl: url,
        appInfo: {
          title: "tv poc",
          transparent: true,
          defaultWindowType: "overlay",
          vendorExtension: {
            backgroundColor: "00FFFFFF",
            resolution: "1920x1080",
            enableKeyboard: true,
            loadingMessage: true,
            allowCrossDomain: false,
          },
          spinnerOnLaunch: false,
          noSplashOnLaunch: true,
        },
        params: {
          noLoadingSplash: true,
        },
      },
    })
  );
};

const launchYoutube = () => {
  showToast("launchYoutube");
  ws.send(
    JSON.stringify({
      type: "request",
      id: 1,
      uri: "ssap://system.launcher/launch",
      payload: {
        id: "youtube.leanback.v4",
        contentId: "https://www.youtube.com/watch?v=ioNng23DkIM",
      },
    })
  );
};

const closeWebAppOverlay = () => {
  showToast("closeWebAppOverlay");
  ws.send(
    JSON.stringify({
      type: "request",
      id: 1,
      uri: "ssap://webapp/closeWebApp",
      payload: { webAppId: "test-web-app" },
    })
  );
};

const turnOffTV = () => {
  showToast("turnOffTV");
  ws.send(
    JSON.stringify({
      type: "subscribe",
      id: 1,
      uri: "ssap://system/turnOff",
    })
  );
};

const launchBrowser = (url) => {
  showToast("launchBrowser-url: " + url);
  ws.send(
    JSON.stringify({
      type: "request",
      id: 1,
      uri: "ssap://system.launcher/open",
      payload: {
        target: url,
      },
    })
  );
};

const launchNetflix = (titleId) => {
  showToast("launchNetflix titleId : " + titleId);
  ws.send(
    JSON.stringify({
      type: "request",
      id: 1,
      uri: "ssap://system.launcher/launch",
      payload: {
        id: "netflix",
        contentId: "m=https://www.netflix.com/kr/title/" + titleId,
      },
    })
  );
};

window.tvconnect = connect;
window.launchWebApp = launchWebApp;

export const tvControlUtil = {
  connect,
  launchWebApp,
  launchWebAppOverlay,
  launchOneshotOverlay,
  closeWebAppOverlay,
  launchYoutube,
  turnOffTV,
  launchBrowser,
  launchNetflix,
};

function showToast(msg, param) {
  if (param) {
    console.log(msg, param);
  } else {
    console.log(msg);
  }
  try {
    window.cordova.plugins.TVConnect.toast(
      msg + (param ? JSON.stringify(param) : "")
    );
  } catch (error) {}
}
