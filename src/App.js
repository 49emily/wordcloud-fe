import "./styles.css";
import InputArea from "./components/InputArea";
import Header from "./components/Header";
import WordCloud from "./components/WordCloud";
import WordSlider from "./components/WordSlider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2C3639",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#85586F"
      }
    }
  });

  const [cloudText, setCloudText] = useState("");
  const [max, setMax] = useState(100);
  const [numWords, setNumWords] = useState(max); // change
  const [hasFile, setHasFile] = useState(false);
  function createCloud(text) {
    setCloudText(text);
  }

  function updateLimits(numWords) {
    if (numWords <= 100) {
      setMax(numWords);
    } else {
      setMax(100);
    }
    // console.log(max);
  }

  function changeHasFile(bool) {
    setHasFile(bool);
  }

  function changeNumWords(num) {
    setNumWords(num);
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <InputArea
          generate={createCloud}
          hasFile={hasFile}
          changeHasFile={changeHasFile}
        />

        <WordSlider
          max={max}
          hasFile={hasFile}
          changeNumWords={changeNumWords}
        />

        {!(cloudText === "") && (
          <WordCloud
            text={cloudText}
            updateLimits={updateLimits}
            numWords={numWords}
            max={max}
          />
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
