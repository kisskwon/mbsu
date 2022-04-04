import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { HashRouter, useRoutes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ScrollToTop from "./components/ScrollToTop";
import FirebaseListener from "./firebase/FirebaseListener";
import AddReminder from "./pages/AddReminder";
import AlarmSetting from "./pages/AlarmSetting";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Reminder from "./pages/Reminder";
import Talk from "./pages/Talk";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          ":last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
  },
});

function App() {
  const [inputText, setInputText] = useState();
  const onChange = (e) => {
    setInputText(e.target.value);
  };
  const callToast = () => {
    window.cordova.plugins.TVConnect.toast(inputText, (result) => {
      console.log("kks", result);
    });
  };

  return (
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <HashRouter>
          <ScrollToTop />
          <FirebaseListener />
          <AppRoutes />
        </HashRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/alarm", element: <AlarmSetting /> },
    { path: "/talk", element: <Talk /> },
    { path: "/gallery", element: <Gallery /> },
    { path: "/reminder", element: <Reminder /> },
    { path: "/addReminder", element: <AddReminder /> },
  ]);
  return routes;
};

export default App;
