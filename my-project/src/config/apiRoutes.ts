const BASE_URL = "http://localhost:8000/api";

export const API_ROUTES = {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    GET_USER: `${BASE_URL}/user/me`,
    CHAT : `${BASE_URL}/chat`,
    SAVE_CHAT: `${BASE_URL}/save-chat`,
    GET_CHATS: `${BASE_URL}/chats`,
};
