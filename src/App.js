import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { HashRouter, useRoutes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ScrollToTop from "./components/ScrollToTop";
import FirebaseListener from "./firebase/FirebaseListener";
import AddReminder from "./pages/AddReminder";
import AlarmSetting from "./pages/AlarmSetting";
import Calendar from "./pages/Calendar";
import Car from "./pages/Car";
import EditGreeting from "./pages/EditGreeting";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Memo from "./pages/Memo";
import MemoGuide from "./pages/MemoGuide";
import NaviSetting from "./pages/NaviSetting";
import RegionSearch from "./pages/RegionSearch";
import Reminder from "./pages/Reminder";
import Slogan from "./pages/Slogan";
import Talk from "./pages/Talk";
import Weather from "./pages/Weather";

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
    { path: "/weather", element: <Weather /> },
    { path: "/navi", element: <NaviSetting /> },
    { path: "/memo", element: <Memo /> },
    { path: "/calendar", element: <Calendar /> },
    { path: "/car", element: <Car /> },
    { path: "/slogan", element: <Slogan /> },
    { path: "/talk", element: <Talk /> },
    { path: "/regionSearch", element: <RegionSearch /> },
    { path: "/gallery", element: <Gallery /> },
    { path: "/memoGuide", element: <MemoGuide /> },
    { path: "/editGreeting", element: <EditGreeting /> },
    { path: "/reminder", element: <Reminder /> },
    { path: "/addReminder", element: <AddReminder /> },
  ]);
  return routes;
};

export default App;
