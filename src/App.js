import React, { useState } from "react";
import axios from "axios";

function App() {
  function GetUserData() {
    axios.get("http://localhost:8080/users/1/info").then((response) => {
      SetUserInfo(JSON.stringify(response.data));
    });
  }
  const [userInfo, SetUserInfo] = useState("None");
  return (
    <div className="App">
      <button onClick={GetUserData}>Test API</button>
      <p>{userInfo}</p>
    </div>
  );
}

export default App;