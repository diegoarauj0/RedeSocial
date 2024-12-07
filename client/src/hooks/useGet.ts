import { useEffect, useState } from "react"
import { GetUserQuery, GetFollowersQuery, GetFollowingQuery, GetIsFollowingQuery, GetPostQuery, FeedQuery } from "../types/API"
import API from "../services/API"
import { useLocalStorage } from "./useLocalStorage"

export default <Q = unknown, D = unknown, R = unknown>(route:"getFeed" | "getPost" | "getUser" | "getFollowers" | "getFollowing" | "getIsFollowing", query:Q ) => {
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<boolean>(false)
    const [ data, setData ] = useState<D | null>(null)
    const [ reason, setReason ] = useState<R | null>(null)
    const [ token ] = useLocalStorage<string>({ name:"token", constructor:String })

    async function get() {  
        setError(false)
        setLoading(true)

        const api = API()

        try {
            let response:unknown = undefined

            if (token !== null) {
                if (route === "getFeed") { response = await api.post.feed(query as FeedQuery, token) }
                if (route === "getPost") { response = await api.post.getPost(query as GetPostQuery, token) }
                if (route === "getUser") { response = await api.user.getUser(query as GetUserQuery, token) }
                if (route === "getFollowers") { response = await api.user.getFollowers(query as GetFollowersQuery, token) }
                if (route === "getFollowing") { response = await api.user.getFollowing(query as GetFollowingQuery, token) }
                if (route === "getIsFollowing") { response = await api.user.getIsFollowing(query as GetIsFollowingQuery, token) }
            }

            if (response !== undefined) { setData(response as D) }

        } catch (reason) {
            setReason(reason as R)
            setError(true)
        }
        setLoading(false)
    }


    useEffect(() => { get() },[ route, query ])

    return { data:data, loading:loading, error:error, reason:reason }
}