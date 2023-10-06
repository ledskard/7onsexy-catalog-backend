require("dotenv");
const TOKEN = {
    EXPIRE_TOKEN_TIME: process.env.EXPIRE_TOKEN_MINUTES || "1d",
    SECRET_TOKEN: process.env.SECRET_TOKEN || "secret",
};

export default TOKEN;
