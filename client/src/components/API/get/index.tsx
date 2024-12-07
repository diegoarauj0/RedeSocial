import React from "react"
import useGet from "../../../hooks/useGet"

export interface GetProps<Q = unknown, D = unknown> {
    type:"getFeed" | "getPost" | "getUser" | "getFollowers" | "getFollowing" | "getIsFollowing"
    query:Q
    children:((data:D) => JSX.Element)
    error?:React.ReactNode
    loading?:React.ReactNode
}

export function Get<Q = unknown, D = unknown>(props:GetProps<Q, D>) {
    const { data, error, loading } = useGet(props.type, props.query)

    if (loading) {
        return (
            <>{props?.loading}</>
        )
    }

    if (error || data === null) {
        return (
            <>{props?.error}</>
        )
    }

    return (
        <>{props.children(data as D)}</>
    )
}