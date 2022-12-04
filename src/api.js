import axios from "axios";
import API_URL from "./config";

export function getUser(ok_handler, error_handler, api = API_URL) {
  axios.get(`${api}/auth/me`, getAuth()).then((response) => {
    ok_handler(response);
  }).catch((response) => {
    error_handler(response);
  });
}

export function userHook(authed_handler, non_authed_handler, user) {
  if (user.status != 0) {
    if (user.status == 1)
      authed_handler(user);
    else
      non_authed_handler(user);
  }

}

export function authUser(login, password, api = API_URL) {
  axios.post(`${api}/auth/login`, { "email": login, "password": password }).then((response) => {
    if (response.status == 200)
      localStorage.setItem('user', response.data.accessToken); // Update access token in local storage; so security?! No!
  });
}

export function getAuth() {
  return { headers: { "Authorization": `Bearer ${localStorage.getItem("user")}` } };
}