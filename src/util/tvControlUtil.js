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

let ws;
let currentClientKey = null;

function handleResponse(message) {
  var noOutput = false;
  var id = "" + message.id;

  if (message.type === "registered") {
    showToast("registered!!");
    noOutput = handleRegisteredResponse(message);
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
    showToast("websocket error", event);
  };

  ws.onclose = function (event) {
    showToast("connection closed", event);
  };

  return ws;
};

const launchWebApp = () => {
  showToast("launchWebApp");
  ws.send(
    JSON.stringify({
      type: "subscribe",
      id: 1,
      uri: "ssap://webapp/launchWebApp",
      payload: {
        webAppId: "test",
        webAppUrl: "http://10.158.2.146:3001/webapp/index.html",
      },
    })
  );
};

const launchWebAppOverlay = () => {
  showToast("launchWebAppOverlay");
  ws.send(
    JSON.stringify({
      type: "request",
      id: 1,
      uri: "ssap://webapp/launchWebApp",
      payload: {
        webAppId: "test-web-app",
        webAppUrl:
          "https://c2c-tvtest.s3.ap-northeast-2.amazonaws.com/webapp/index.html",
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
        },
        params: {
          noLoadingSplash: true,
        },
      },
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

export const tvControlUtil = {
  connect,
  launchWebApp,
  launchWebAppOverlay,
  turnOffTV,
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
