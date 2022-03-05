import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { HashRouter, useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AlarmSetting from "./pages/AlarmSetting";
import Calendar from "./pages/Calendar";
import Car from "./pages/Car";
import Home from "./pages/Home";
import Memo from "./pages/Memo";
import NaviSetting from "./pages/NaviSetting";
import Slogan from "./pages/Slogan";
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
    <ThemeProvider theme={darkTheme}>
      <HashRouter>
        <ScrollToTop />
        <AppRoutes />
      </HashRouter>
    </ThemeProvider>
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
  ]);
  return routes;
};

export default App;
