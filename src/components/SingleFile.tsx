import React, { useEffect, useState } from "react";
import { useAuthToken } from './useToken';
import axios from "axios";
import test_page from "../test_img/bookpage-test.jpg"
import TagsInput from "./Tags/TagsInput"

import ReduxTest from './ReduxTest';

//page url : http://react-app-notes.s3-website.eu-central-1.amazonaws.com/
// const API = "https://nwsj6k6n86.execute-api.eu-central-1.amazonaws.com/dev/upload-image";

const API = "http://localhost:5000/api/post";

const SingleFileUploader = (userID: any) => {
    // console.log(userID)
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<
        "initial" | "uploading" | "success" | "fail"
    >("initial");
    const [toggle, setToggle] = useState(false);

    const [tags, setTags] = useState<null | String[]>(null)
    // const demoTags: string[] = ["tag1", "tag2", "tag3"]

    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setStatus("initial");
            setFile(e.target.files[0]);
        }
    };

    const demoHandleFileChange = () => {
        setStatus("initial");
        // Set the file state with the image URL
        setFile(new File([test_page], "demo_image.jpg", { type: "image/jpeg" }));
    };

    // const idToken = useAuthToken();

    const handleAddTags = (text: String) => {
        const content = [];
        content.push(text)

        setTags(content)
        console.log(tags)
        //add tags
    }

    const handleUpload = async () => {
        if (file) {
            // Check if the file is an image
            if (!file.type.startsWith("image/")) {
                console.error("Selected file is not an image");
                return;
            }

            setStatus("uploading");

            try {
                // Convert file to base64
                const base64File = await toBase64(file);

                const formData = new FormData();
                formData.append("input", base64File);
                formData.append("tagi", "bolek");
                // formData.append("userid", userID.userID);
                // formData.append("tags", JSON.stringify(demoTags));

                // console.log("formData")
                // console.log(formData)
                // formData.append("stateMachineArn", "arn:aws:states:eu-central-1:211125364203:stateMachine:MyStateMachine-vglq35s73");\

                const resp = await axios.post(API, formData, {
                    headers: {
                        // Authorization: `${idToken}`,
                        'Content-Type': 'application/json',
                        // 'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(resp.data);

                setStatus("success");
                setFile(null);

                setTimeout(() => setStatus('initial'), 1000);

            } catch (error) {
                console.error("Error uploading file:", error);
                setStatus("fail");
            }
        }
    };

    const clearButton = () => {
        console.log("close/reset button")
        setStatus("initial")
        setFile(null)
    }

    const handleToggleChange = () => {
        console.log(toggle)
        setToggle(!toggle);
    };

    return (
        <>
            <div className="SingleFileContainer"></div>
            <h1>send single file in base64</h1>

            <div className="input-group">
                <label htmlFor="file" className="sr-only">
                    Choose an IMG
                </label>
                <input id="file" type="file" onChange={handleFileChange} />

                <button onClick={demoHandleFileChange}>demo img</button>
            </div>

            <ReduxTest />

            {file && (
                <section>
                    File details:
                    <ul>
                        <li>Name: {file.name}</li>
                        <li>Type: {file.type}</li>
                        <li>Size: {file.size} bytes</li>
                        <li>Tags: {}</li>
                        <img
                            className="preview"
                            src={URL.createObjectURL(file)}
                            alt="Selected file"
                        />
                    </ul>
                </section>
            )}

            {file && (
                <>
                    <button onClick={handleToggleChange}>
                        Add tags
                    </button>

                        {toggle ? <TagsInput  /> : null}

                    <button onClick={handleUpload} className="submit">
                        Upload that file
                    </button>

                    {/* https://codesandbox.io/p/sandbox/heuristic-cloud-36p07j?file=%2Fsrc%2FApp.js%3A14%2C1&from-embed= */}

                    <button onClick={clearButton} className="clear">
                        Reset
                    </button>
                </>
            )}

            <Result status={status} />
        </>
    );
};

const Result = ({ status }: { status: string }) => {
    if (status === "success") {
        return <p> File uploaded successfully!</p>;
    } else if (status === "fail") {
        return <p> File upload failed!</p>;
    } else if (status === "uploading") {
        return <p> Uploading selected file...</p>;
    } else if (status == "initial") {
        return <p> Choose file...</p>
    }

    else {
        return null;
    }
};

export default SingleFileUploader;
