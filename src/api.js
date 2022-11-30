import axios from "axios";

export function getUser(user_id, setUserInfo, api){
    axios.get(`${api}/users/${user_id}/info`).then((response) => {
      setUserInfo(`${response.data.firstName} ${response.data.lastName} ${response.data.middleName}`);
    });
}
