import axios from "axios";
import API_URL from "./config";
import React from "react";

export function backendError() {
  console.warn("Backend is down; Contact ShTP admins");
}


export function getUser(ok_handler, error_handler, api = API_URL) {
  axios.get(`${api}/auth/me`, getAuth()).then((response) => {
    ok_handler(response);
  }).catch((response) => {
    backendError();
    error_handler(response);
  });
}

export function getOtherUser(ok_handler, error_handler, user_id, api = API_URL) {
  axios.get(`${api}/users/${user_id}/info`).then((response) => {
    if (response.data.status)
      ok_handler(response);
    else
      error_handler(response);
  }
  ).catch((response) => error_handler(response));
}

export function userHook(authed_handler, non_authed_handler, user) {
  if (user.status !== 0) {
    if (user.status === 1)
      authed_handler(user);
    else
      non_authed_handler(user);
  }

}

export function authUser(login, password, ok_handler, error_handler, api = API_URL) {
  axios.post(`${api}/auth/login`, { "email": login, "password": password }).then((response) => {
    if (response.status === 200)
      ok_handler(response);
  }).catch((response) => {
    if (response.status === undefined) {
      backendError();
    } else {
      error_handler(response);
    }
  });
}

export function getAuth() {
  return { headers: { "Authorization": `Bearer ${localStorage.getItem("user")}` } };
}