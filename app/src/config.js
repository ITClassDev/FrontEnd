//const dotenv = require('dotenv');


const conf = (HOST, name="prod", PROTOCOL="https") => (
    {
        API_URL: `${PROTOCOL}://${HOST}/api`,
        STORAGE: `${PROTOCOL}://${HOST}/api/storage`,
        FRONTEND_URL: `${PROTOCOL}://${HOST}`,
        CLIENT_VER: `"0.0.3 alpha (${name})`
    }
)

// For dev in single computer line
const local_conf = {
    API_URL: `http://localhost:8080/api/v1`,
    STORAGE: `http://localhost:8080/storage`,
    FRONTEND_URL: `http://localhost:3000`,
    CLIENT_VER: `ShTP 2.0 Platform`
}

// For dev in local net
const local_conf_2 = {
    API_URL: `http://192.168.1.11/api`,
    STORAGE: `http://192.168.1.11/api/storage`,
    FRONTEND_URL: `http://192.168.1.11`,
    CLIENT_VER: `NGINX`
}


export const config = local_conf;
//export const config = process.env.NODE_ENV === "development" ? conf("localhost", "dev") : conf("shtp.1561.ru");
