import { useState } from "react";
import Tesseract from "tesseract.js";

function Translator() {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState("eng");
  const [result, setResult] = useState("");

  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const processImage = () => {
    setResult("");
    setProgress(0);

    Tesseract.recognize(file, language, {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setProgress(m.progress);
        }
      },
    }).then(({ data: { text } }) => {
      const jsonObject = { result: text };
      const jsonString = JSON.stringify(jsonObject);
      console.log(jsonString)

      setResult(text);
    });
  };
  return (
    <div className="Translation-container">
      <h1>Transltion</h1>
      <br />
      <input type="file" onChange={onFileChange} />
      <br />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="eng">English</option>
        <option value="pol">Poland</option>
      </select>
      <br />
      <div style={{ marginTop: 25 }}>
        <input type="button" value="Submit" onClick={processImage} />
      </div>
      <br />
      <div>
        <progress value={progress} max={1} />
      </div>
      <br />
      <br />
      {result !== "" && (
        <div className="result-translation">
          Result: {result}
        </div>
      )}
    </div>
  );
}

export default Translator;
