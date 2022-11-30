import React, { useState } from "react";

function App() {
  const [userInfo, SetUserInfo] = useState("None");
  return (
    <div className="App">
      <button>Get User Info</button>
      <p>{userInfo}</p>
    </div>
  );
}

export default App;