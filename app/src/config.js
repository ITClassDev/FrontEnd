const conf = (HOST, name="prod", PROTOCOL="http") => (
    {
        API_URL: `${PROTOCOL}://${HOST}/api`,
        STORAGE: `${PROTOCOL}://${HOST}/api/storage`,
        FRONTEND_URL: `${PROTOCOL}://${HOST}`,
        CLIENT_VER: `"0.0.3 alpha (${name})`
    }
)

const local_conf = {
    API_URL: `http://localhost:8080`,
    STORAGE: `http://localhost:8080/storage`,
    FRONTEND_URL: `http://localhost:3000`,
    CLIENT_VER: `EARLY DEVELOP MODE`
}

export const config = local_conf;
//export const config = process.env.NODE_ENV === "development" ? conf("localhost", "dev") : conf("192.168.1.11");
