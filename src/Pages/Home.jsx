import React, { useState, useEffect } from "react";
import { Alert } from 'antd';
import { getUser } from "../api";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userFio, setUserFio] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getUser(() => {console.log("Auth")}, () => {navigate("/login")}, API_URL);
  })
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