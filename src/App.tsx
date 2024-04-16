// import SingleFileUploader from "./components/SingleFileUploader";
import Translator from "./components/Translator";
import Home from "./components/Home";
import Auth from "./components/Authenticator";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Nav";
import SingleFile from "./components/SingleFile"
import { useState } from "react";

function App() {

  const [userID, setUserID] = useState<string | null>(null);
  // console.log(userID)

  const handleUserId = (data: any) => {
    setUserID(data);
  };

  return (
    <div >
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* Pass handleUserId as the prop username */}
          <Route path="/" element={<Auth handleUserId={handleUserId} />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/single" element={<SingleFileUploader />} /> */}
          <Route path="/SingleFile" element={<SingleFile userID={userID} />} />
          <Route path="/transl" element={<Translator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;