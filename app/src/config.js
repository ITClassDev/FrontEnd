const conf = (HOST, name="prod", PROTOCOL="http") => (
    {
        API_URL: `${PROTOCOL}://${HOST}/api`,
        STORAGE: `${PROTOCOL}://${HOST}/api/storage`,
        FRONTEND_URL: `${PROTOCOL}://${HOST}`,
        CLIENT_VER: `"0.0.3 alpha (${name})`
    }
)

export const config = process.env.NODE_ENV === "development" ? conf("localhost", "dev") : conf("192.168.1.11");
