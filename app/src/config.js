//const dotenv = require('dotenv');


const conf = (HOST, name="prod", PROTOCOL="http") => (
    {
        API_URL: `${PROTOCOL}://${HOST}/api/v1`,
        STORAGE: `${PROTOCOL}://${HOST}/storage`,
        FRONTEND_URL: `${PROTOCOL}://${HOST}`,
        SCHOOL_NUMBER: '1561',
        CLIENT_VER: name
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


//export const config = local_conf;
// export const config = process.env.NODE_ENV === "development" ? conf("localhost", "dev") : conf("shtp.1561.ru");
export const config = process.env.REACT_APP_TYPE === "development" ? conf("192.168.1.8:8080", "2.0.0 Enigma dev") : conf("shtp.1561.ru", "2.0.0 Enigma", "https");