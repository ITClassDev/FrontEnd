import axios from "axios";
import API_URL from "./config";

export function backendError() {
  console.warn("Backend is down; Contact ShTP admins");
}

// FOR AUTHED USER
export function getUser(ok_handler, error_handler, api = API_URL) {
  axios
    .get(`${api}/auth/me`, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      if (response.code === "ERR_NETWORK") {
        backendError();
      }
      error_handler(response);
    });
}

export function getUserAchievements(ok_handler, error_handler, api = API_URL) {
  axios
    .get(`${api}/achievements/get_my`, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function updateUserAbout(
  new_about,
  ok_handler,
  error_handler,
  api = API_URL
) {
  axios
    .post(
      `${api}/users/update_about_text`,
      { about_text: new_about },
      getAuth()
    )
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function provideAccessToApp(
  app_id,
  ok_handler,
  error_handler,
  api = API_URL
) {
  axios
    .post(`${api}/oauth/provide_access`, { app_id: app_id }, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => error_handler(response));
}

export function getAchivmentsQueue(ok_handler, error_handler, api = API_URL) {
  axios
    .get(`${api}/achievements/my_queue`, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function addAchivment(
  achievement,
  ok_handler,
  error_handler,
  api = API_URL
) {
  axios
    .post(`${api}/achievements/add`, achievement, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

// Admin API

export function getAchivmentsModerationQueue(api = API_URL) {}

export function getAllUsers(ok_handler, error_handler, api = API_URL) {
  axios
    .get(`${api}/admin/all_users`, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

// AUTH UTILS

export function authUser(
  login,
  password,
  ok_handler,
  error_handler,
  api = API_URL
) {
  axios
    .post(`${api}/auth/login`, { email: login, password: password })
    .then((response) => {
      if (response.status === 200) ok_handler(response);
    })
    .catch((response) => {
      if (response.code === "ERR_NETWORK") {
        backendError();
      } else {
        error_handler(response);
      }
    });
}

export function getAuth() {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  };
}

// FOR OTHER USERS
export function getOtherUser(
  ok_handler,
  error_handler,
  user_id,
  api = API_URL
) {
  axios
    .get(`${api}/users/${user_id}/info`)
    .then((response) => {
      if (response.data.status) ok_handler(response);
      else error_handler(response);
    })
    .catch((response) => error_handler(response));
}

export function getLeaderBoard(ok_handler, error_handler, api = API_URL) {
  axios
    .get(`${api}/users/get_leaderboard`)
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => error_handler(response));
}

export function getAppInfo(app_id, ok_handler, error_handler, api = API_URL) {
  axios
    .get(`${api}/oauth/get_app/${app_id}`)
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

// Utility
export function convertDate(date) {
  return new Date(date).toLocaleDateString("ru-RU");
}
