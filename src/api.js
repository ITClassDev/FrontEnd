import axios from "axios";

export function getUser(user_id, setUserInfo){
    axios.get(`http://localhost:8080/users/${user_id}/info`).then((response) => {
      setUserInfo(JSON.stringify(response.data));
    });
}
