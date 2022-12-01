import React, { useState, useEffect } from "react";
import { Alert } from 'antd';
import { getUser } from "../api";

const Home = () => {
  const [userFio, setUserFio] = useState(null);
  useEffect(() => { getUser(1, setUserFio, "http://localhost:8080") }, []);
  return (
    <>
      <h1>Ваш профиль</h1>
      <p>
        Test Data from API: {userFio}
      </p>
      <Alert message="Вас забанил Путинцев" type="error" />
    </>

  )
}

export default Home;