import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
import { delay } from "../Utils/delay";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
});

api.interceptors.response.use(async (data) => {
    await delay(1500);

    return data
})

export default api