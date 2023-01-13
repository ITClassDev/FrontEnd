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

export function updateSocialLinks(
  social_links,
  ok_hanler,
  error_handler,
  api = API_URL
) {
  axios
    .patch(`${api}/users/update/social`, social_links, getAuth())
    .then((response) => {
      ok_hanler(response);
    })
    .catch((response) => {
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
    .patch(
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
  let formData = new FormData();
  formData.append("file", achievement.confirmation_file.file);
  formData.append(
    "achievement",
    JSON.stringify({
      type: achievement.type,
      title: achievement.title,
      description: achievement.description,
    })
  ); // TOOD // Too messy

  axios
    .put(`${api}/achievements/add`, formData, {
      headers: {
        Authorization: getAuth().headers.Authorization,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function getMyApps(ok_handler, error_handler, api = API_URL) {
  axios
    .get(`${api}/users/my_apps`, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function getMyNotifications(ok_handler, error_handler, api = API_URL) {
  axios
    .get(`${api}/users/my_notifications`, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function getDayChallenge(ok_handler, error_handler, api = API_URL) {
  axios
    .get(`${api}/programming_tasks/day_challenge/current`)
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function createOauthApp(
  app_data,
  ok_handler,
  error_handler,
  api = API_URL
) {
  axios
    .put(`${api}/oauth/create_app`, app_data, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function getTaskSubmits(
  task_id,
  ok_handler,
  error_handler,
  api = API_URL
) {
  axios
    .get(`${api}/programming_tasks/task/my_submits/${task_id}`)
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

// Admin API

export function getAchivmentsModerationQueue(
  ok_handler,
  error_handler,
  api = API_URL
) {
  axios
    .get(`${api}/admin/moderation_queue`, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

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

export function createUser(
  user_data,
  ok_handler,
  error_handler,
  api = API_URL
) {
  axios
    .put(`${api}/users/create_user`, user_data, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function createTask(
  task_data,
  ok_handler,
  error_handler,
  api = API_URL
) {
  axios
    .put(`${api}/programming_tasks/task/add`, task_data, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function moderateAchivment(
  achivment_id,
  achivment_status,
  points,
  ok_hanler,
  error_handler,
  api = API_URL
) {
  let req_payload = { id: achivment_id, status: achivment_status };
  if (achivment_status) req_payload["points"] = points;
  axios
    .patch(`${api}/achievements/moderate`, req_payload, getAuth())
    .then((response) => {
      ok_hanler(response);
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
