import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
