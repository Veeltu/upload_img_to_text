import React, { useState } from "react";
import { useAuthToken } from './useToken';
import axios from "axios";


//urt : http://react-app-notes.s3-website.eu-central-1.amazonaws.com/

// const API = "https://nwsj6k6n86.execute-api.eu-central-1.amazonaws.com/dev/upload-imagee";
const API = "https://nwsj6k6n86.execute-api.eu-central-1.amazonaws.com/dev/upload-image";
const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };

  const idToken = useAuthToken();

  const handleUpload = async () => {
    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        console.error("Selected file is not an image");
        return;
      }
      setStatus("uploading");

      const formData = new FormData();
      // formData.append("input", `"{${file}}"`)
      formData.append("input", file)
      formData.append("stateMachineArn", "arn:aws:states:eu-central-1:211125364203:stateMachine:MyStateMachine-vglq35s73");

      // const formData = {
      //   // "input" : "{}",
      //   "input" : `"{${file}}"`,
      //   "stateMachineArn": "arn:aws:states:eu-central-1:211125364203:stateMachine:MyStateMachine-vglq35s73"
      // }

      // console.log("FormData:", Object.fromEntries(formData.entries()));
      console.log(file)

      // console.log(typeof file)
      // console.log(typeof formData)

      try {
        const resp = await axios.post(API, formData, {
          headers: {
            Authorization: `${idToken}`,
            'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'image/*', 
          },
          // other Axios options
        });

        // try {
        //   const resp = await axios.get(API, {
        //     headers: {
        //       Authorization: `${idToken}`,
        //       // Other headers if needed
        //     },
        //     // Other Axios options for GET request
        //   });

         console.log(resp.data)

        setStatus("success");
        setFile(null);
      } catch (error) {
        console.error("Error uploading file:", error);
        setStatus("fail");
      }
    }
  };

  return (
    <>
      <div className="SingleFileContainer"></div>
      <h1>Single file upload</h1>
      <div className="input-group">
        <label htmlFor="file" className="sr-only">
          Choose an IMG
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>

      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
            <img
              className="preview"
              src={URL.createObjectURL(file)}
              alt="Selected file"
            />
          </ul>
        </section>
      )}

      {file && (
        <button onClick={handleUpload} className="submit">
          Upload that file
        </button>
      )}

      <Result status={status} />
    </>
  );
};

const Result = ({ status }: { status: string }) => {
  if (status === "success") {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};

export default SingleFileUploader;
