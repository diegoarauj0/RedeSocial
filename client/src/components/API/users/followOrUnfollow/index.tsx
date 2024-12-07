import Styled from "./styled"
import API from "../../../../services/API"
import { useEffect, useState } from "react"
import { useLocalStorage } from "../../../../hooks/useLocalStorage"

export interface FolloworOrUnfollowProps {
    targetId:number
    userId:number
}

export function FolloworOrUnfollow(props:FolloworOrUnfollowProps) {
    const [ error, setError ] = useState<boolean>(false)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ isFollowing, setIsFollowing ] = useState<boolean>(false)
    const [ token ] = useLocalStorage<string>({ name:"token", constructor:String })

    const [ ,setAlertText ] = useLocalStorage<string>({
        name:"alertText",
        constructor:String
    })

    //"primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark"
    const [ ,setAlertType ] = useLocalStorage<string>({
        name:"alertType",
        constructor:String
    })

    const api = API()

    async function getIsFollowing() {
        try {
            setLoading(true)
            setError(false)

            const response = await api.user.getIsFollowing({
                targetId:props.targetId,
                userId:props.userId
            }, token || "")

            setIsFollowing(response.isFollowing)
        } catch (reason) {
            console.warn(reason)
            setError(true)
        }

        setLoading(false)
    }

    useEffect(() => {
        getIsFollowing()
    },[])

    if (props.targetId === props.userId) {
        return (
            <></>
        )
    }

    if (loading) {
        return (
            <></>
        )
    }

    if (error) {
        return (
            <></>
        )
    }

    async function handlerFollow() {
        try {
            await api.user.follow({ targetId:props.targetId }, token || "")

            setIsFollowing(true)
        } catch(reason) {
            setAlertType("danger")
            setAlertText("não foi possivel seguir esse usuario")
            console.warn(reason)
        }
    }

    async function handlerUnfollow() {
        try {
            await api.user.unfollow({ targetId:props.targetId }, token || "")

            setIsFollowing(false)
        } catch(reason) {
            setAlertType("danger")
            setAlertText("não foi possivel deixar de seguir esse usuario")
            console.warn(reason)
        }
    }

    if (isFollowing === true) {
        return (
            <Styled.Unfollow onClick={handlerUnfollow}>Deixar de Seguir</Styled.Unfollow>
        )
    }

    return (
        <Styled.Follow onClick={handlerFollow}>Seguir</Styled.Follow>
    )
}