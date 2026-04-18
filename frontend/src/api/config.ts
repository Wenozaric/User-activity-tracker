import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";


export const defaultConfig = axios.create({
    baseURL: 'http://localhost:5005',
    timeout: 30000,
    withCredentials: true
})


defaultConfig.interceptors.response.use(
    (res) => res,
    (error) => {
        if( error.response && error.response.status == 401){
            console.error('нужнa авторизация')
            useAuthStore.getState().setUnauth(true)
        }
        return Promise.reject(error)
    }
)