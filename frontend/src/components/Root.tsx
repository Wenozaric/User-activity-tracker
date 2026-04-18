import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"

export const Root = () => {
    const checkAuth = useAuthStore((state) => state.checkAuth)

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    return(
        <>
            <Outlet/>
        </>
    )
}