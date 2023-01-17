import React, { useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

import Stack from "@mui/material/Stack";

function InputArea(props) {
  const [file, setFile] = useState();
  // const [text, setText] = useState("");

  const [fileName, setFileName] = useState("");

  function handleChange(event) {
    console.log(event.target.files);
    if (event.target.files.length >= 1) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
      props.changeHasFile(true);
    }
  }

  function handleSubmission(event) {
    // works for txt file, not for pdf or rtf
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = () => {
        props.generate(reader.result);
      };
      reader.readAsText(file);
    }
  }
  return (
    <div className="input-area">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2.5}
        justifyContent="center"
        alignItems="center"
      >
        <div>
          <Button className="upload" variant="outlined" size="large" component="label">
            Upload
            <input type="file" hidden accept="text/plain" onChange={handleChange} />
          </Button>

          <span className="file-name">{fileName}</span>
        </div>

        <Button
          className="submit"
          variant="contained"
          size="large"
          onClick={handleSubmission}
          disabled={!props.hasFile}
        >
          Generate WordCloud
        </Button>
      </Stack>
    </div>
  );
}

export default InputArea;
