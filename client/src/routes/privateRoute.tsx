import { ReactNode, useEffect, useState } from "react"
import { Navigate } from "react-router"
import { useLocalStorage } from "../hooks/useLocalStorage"
import API from "../services/API"

export interface PrivateRouteProps {
    children:ReactNode
}

export function PrivateRoute(props:PrivateRouteProps) {
    const [ token, setToken ] = useLocalStorage<string>({ name:"token", constructor:String })
    const [ auth, setAuth ] = useState<boolean>(token !== null)
    const [ loading, setLoading ] = useState<boolean>(true)

    const api = API()

    async function thisToken() {
        setAuth(false)
        setLoading(true)

        if (auth === null) {
            setLoading(true)
            setAuth(false)
            return
        }

        try {
            await api.auth.thisToken(token || "")
            setAuth(true)
        } catch {

            setAuth(false)
        }

        setLoading(false)
    }

    useEffect(() => {
        thisToken()
    },[])

    if (loading) {
        return <></>
    }

    if (!auth) {
        setToken(null)
        return <Navigate to="/auth" />
    }

    return ( <>{props.children}</>)
}