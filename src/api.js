import axios from "axios";
import API_URL from "./config";
import { useNavigate } from 'react-router-dom';

export function getUser(user_id, setUserInfo, api=API_URL){
    axios.get(`${api}/auth/me`, getAuth()).then((response) => {
      if (response.status === 200){
        setUserInfo(JSON.stringify(response.data.user));
      }else{
        localStorage.clear();
      }
      
      
    });
}

export function authUser(login, password, api=API_URL){
  axios.post(`${api}/auth/login`, {"email": login, "password": password}).then((response) => {
    if (response.status == 200){
      localStorage.setItem('user', response.data.accessToken); // Update access token in local storage; so security?! No!
    }
  });
}

export function getAuth(){
  return {headers: {"Authorization": `Bearer ${localStorage.getItem("user")}`}};
}