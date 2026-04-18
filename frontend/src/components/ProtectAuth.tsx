import { useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect, type ReactNode } from "react"

interface Props{
    children: ReactNode
}

const ProtectAuth = ({ children} : Props) => {
    const url = useLocation()
    const navigate = useNavigate()

    const isUnauth = useAuthStore(state => state.isUnauth)

    useEffect(() => {
        if (url.pathname != '/login' && url.pathname != '/register') {
            if (isUnauth) {
                navigate('/login')
            }
        }
    }, [isUnauth])

    return <>{children}</>
}

export default ProtectAuth