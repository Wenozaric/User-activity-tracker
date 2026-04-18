import { defaultConfig } from "./config";

export interface AuthResponse{
    message: string
    data: UserFromBackend
}

export interface UserFromBackend{
    id: number
    email: string
    username: string
}

export interface User{
    username: string,
    password: string
}

export interface UserRegiser{
    username: string,
    email: string,
    password: string
}

const authService = {
    login: async (logData: User) => {
        console.log(logData)
        const { data } = await defaultConfig.post<AuthResponse>('/login', logData)
        return data
    },
    register: async (logData: UserRegiser) => {
        const { data } = await defaultConfig.post<AuthResponse>('/register', logData)
        return data
    },
    checkAuth: async() => {
        const { data } = await defaultConfig.get<AuthResponse>('/checkCookie')
        return data
    }   
}

export default authService