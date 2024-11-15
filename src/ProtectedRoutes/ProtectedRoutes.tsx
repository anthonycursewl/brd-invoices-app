import { Navigate, useLocation } from "react-router-dom"
import { secureFetch } from "../shared/Services/secureFetch"
// Hooks de react
import { useEffect, useState } from "react"
import { deleteCookie } from "../shared/Cookies/DeleteCookie"
import { APP_URLS } from "../api/urls/url"

interface ProtectedRoutesProps {
    children: React.ReactNode
}

export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
    const [loading, setLoading] = useState(false)
    const [isAuth, setIsAuth] = useState<boolean | null>(null)
    const { pathname } = useLocation()

    const verifyIsAtuthenticated = async () => {
        const { result } = await secureFetch(APP_URLS.VERIFY_TOKEN, 'GET', null, setLoading)

        if (result?.status === 200) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
            deleteCookie('AuthTokenBRD')
        }
    }

    useEffect(() => {
        verifyIsAtuthenticated()
        
        console.log(`TAJ INSIDE | ${pathname}`)
    }, [pathname])

    if (loading) {
        return null
    } else if (isAuth === null) {
        return null 
    } else if (isAuth === true) {
        return <>{children}</>
    } else if (isAuth === false) {
        return <Navigate to="/login" />
    }

    
}