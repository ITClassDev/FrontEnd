import axios from "axios";
import { config } from "./config";

const API_URL = config.API_URL;


export function API({ endpoint, method = "get", data = {}, files = null, auth = true, ok = null, err = null, message = { show: false, api: null, ok: "ОК", err: "Err" }, api_url = API_URL }) {
  /*
    Global wrapper
    Function to work with ShTP api
    Handle tasks as: GET/POST/PATCH/PUT methods
    Handle NET_ERROR(offline or backend down) - TODO
    Show message
    Handle custom ok & error functions
  */

  let request_params = {
    'headers': {},
  };

  // Auth via JWT token
  if (auth) request_params['headers']['Authorization'] = `Bearer ${localStorage.getItem("user")}`;

  // File upload support
  
  if (files !== null) {
    console.log(files);
    request_params['headers']['Content-Type'] = 'multipart/form-data';
    const form_data = new FormData();
    // Add files from `files`
    for (let file_id in files) form_data.append(file_id, files[file_id].file);
    form_data.append(
      Object.keys(data)[0],
      JSON.stringify(Object.values(data)[0])
    );
    console.log(form_data);

    data = form_data;

  }
  axios({
    method: method,
    url: `${api_url}${endpoint}/`,
    data: data,
    headers: request_params.headers
  }).then((response) => {
    // Show success message
    if (message.show) message.api.open({
      type: "success",
      content: message.ok,
    });
    // If ok handler presented; execute it

    if (ok) ok(response);
  }).catch((response) => {
    // Show error message
    if (response.code === "ERR_NETWORK") { // Can't connect to backend  (API problem or internet problem)
      console.log("Backend down");
      alert("Проверьте подключение к интернету, если проблема не пропадёт, значит ShTP Backend не работает!");
    } else {
      if (message.show) message.api.open({
        type: "error",
        content: `${message.err}: ${response.response.data.detail}`,
      });
      // If error handler presented; execute it
    }
    if (err) err(response.response);

  });

}

export function DownloadPrivateFile({ endpoint, file_name, method = "get", api_url = API_URL }) {
  axios({
    url: `${api_url}${endpoint}`,
    method: method,
    responseType: 'blob',
    headers: `Authorization: Bearer ${localStorage.getItem("user")}`,
  }).then((response) => {
    const href = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', file_name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  });
}

// ALL CODE BELOW THIS COMMENT WILL BE LEGACY AFTER SOME TIME

// FOR AUTHED USER
export function getUser(ok_handler, error_handler, api = API_URL) {
  axios
    .get(`${api}/auth/me`, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {

      if (response.code === "ERR_NETWORK") {

      }
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
  formData.append("file", achievement.file.file);
  formData.append(
    "achievement",
    JSON.stringify({
      type: achievement.type,
      title: achievement.title,
      description: achievement.description,
    })
  ); // TOOD // Too messy

  axios
    .put(`${api}/achievements`, formData, {
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
    .get(`${api}/programming_tasks/day_challenge/current/`)
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
    .get(`${api}/programming_tasks/task/my_submits/${task_id}`, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function getTaskSubmitsContest(
  task_id,
  contest_id,
  ok_handler,
  error_handler,
  api = API_URL
) {
  axios
    .get(
      `${api}/programming_tasks/homework/get_task_submits?task_id=${task_id}&contest_id=${contest_id}`,
      getAuth()
    )
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function submitDayChallenge(
  file,
  ok_handler,
  error_handler,
  api = API_URL
) {
  let formData = new FormData();
  formData.append("file", file);
  axios
    .post(`${api}/programming_tasks/day_challenge/submit`, formData, getAuth())
    .then(
      (response) => {
        ok_handler(response);
      },
      (response) => {
        error_handler(response);
      }
    );
}

export function submitDayChallengeLiveCode(
  code,
  extension,
  ok_handler,
  error_handler
) {
  const file = new File([new Blob([code])], `main.${extension}`);
  submitDayChallenge(
    file,
    (response) => {
      ok_handler(response);
    },
    (response) => {
      error_handler(response);
    }
  );
  //const formData = new FormData();
  //formData.append('file', new File([new Blob([code])], `main.${extension}`));
  //console.log(formData);
}

export function getSubmissionDetails(
  submission_id,
  ok_handler,
  error_handler,
  api = API_URL
) {
  axios
    .get(
      `${api}/programming_tasks/submission/details?submission_id=${submission_id}`
    )
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function getTaskData(task_id, ok_handler, error_handler, api = API_URL) {
  axios
    .get(`${api}/programming_tasks/task/${task_id}`)
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function getContestData(
  contest_id,
  ok_handler,
  error_handler,
  api = API_URL
) {
  axios
    .get(
      `${api}/programming_tasks/homework/get?contest_id=${contest_id}`,
      getAuth()
    )
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function submitContest(
  contest_id,
  language,
  git_url,
  ok_handler,
  error_handler,
  api = API_URL
) {
  axios
    .post(
      `${api}/programming_tasks/homework/submit`,
      { git_url: git_url, contest_id: contest_id, language: language },
      getAuth()
    )
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

// Admin API

export function getAllTasks(ok_handler, error_handler, api = API_URL) {
  axios
    .get(`${api}/programming_tasks/tasks/all`, getAuth())
    .then((response) => {
      ok_handler(response);
    })
    .catch((response) => {
      error_handler(response);
    });
}

export function createContest(
  contest_data,
  ok_handler,
  error_handler,
  api = API_URL
) { }

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
export function convertDateAndTime(date) {
  return new Date(date).toLocaleString("ru-RU");
}
