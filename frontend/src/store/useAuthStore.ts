import { create } from 'zustand'
import authService from '../api/login.service'
import { type UserFromBackend } from '../api/login.service'

interface AuthStore{
    user: UserFromBackend | null
    isAuth: boolean
    isLoading: boolean
    isUnauth: boolean

    checkAuth: () => Promise<void>
    setUser: (data: UserFromBackend) => void
    setUnauth: (a: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuth: false,
    isUnauth: false,
    isLoading: true,

    checkAuth: async() => {
        try{
            const res = await authService.checkAuth()
            set({ user: res.data, isAuth: true})
        } catch (e) {
            set({user: null, isAuth: false})
        } finally {
            set({isLoading: false})
        }
    },

    setUser: (userData: UserFromBackend) => {
        console.log("Стор получил данные:", userData);
        set({user: userData, isAuth: true, isLoading: false})
    },

    setUnauth: (boolean) => {
        set({ isUnauth: boolean })
    }

}))