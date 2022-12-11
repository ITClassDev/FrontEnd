import axios from "axios";
import API_URL from "./config";


export function backendError() {
  console.warn("Backend is down; Contact ShTP admins");
}

// FOR AUTHED USER
export function getUser(ok_handler, error_handler, api = API_URL) {
  axios.get(`${api}/auth/me`, getAuth()).then((response) => {
    ok_handler(response);
  }).catch((response) => {
    if (response.code === "ERR_NETWORK") { backendError(); }
    error_handler(response);
  });
}

export function getUserAchievements(ok_handler, error_handler, api = API_URL) {
  axios.get(`${api}/achievements/get_my`, getAuth()).then((response) => {
    ok_handler(response);
  }).catch((response) => {
    error_handler(response);
  })
}

export function updateUserAbout(new_about, ok_handler, error_handler, api = API_URL) {
  axios.post(`${api}/users/update_about_text`, { about_text: new_about }, getAuth()).then((response) => {
    ok_handler(response);
  }).catch((response) => {
    error_handler(response);
  })
}


// AUTH UTILS
export function userHook(authed_handler, non_authed_handler, user) {
  if (user.status !== 0) {
    if (user.status === 1)
      authed_handler(user);
    else
      non_authed_handler(user);
  }

}

export function authUser(login, password, ok_handler, error_handler, api = API_URL) {
  axios.post(`${api}/auth/login`, { email: login, password: password }).then((response) => {
    if (response.status === 200)
      ok_handler(response);
  }).catch((response) => {
    if (response.code === "ERR_NETWORK") {
      backendError();
    } else {
      error_handler(response);
    }
  });
}

export function getAuth() {
  return { headers: { "Authorization": `Bearer ${localStorage.getItem("user")}` } };
}


// FOR OTHER USERS
export function getOtherUser(ok_handler, error_handler, user_id, api = API_URL) {
  axios.get(`${api}/users/${user_id}/info`).then((response) => {
    if (response.data.status)
      ok_handler(response);
    else
      error_handler(response);
  }
  ).catch((response) => error_handler(response));
}

