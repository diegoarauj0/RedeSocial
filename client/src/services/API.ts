import axios from "axios"
import { FeedQuery, FeedData, ThisTokenData, GetIsFollowingData, GetFollowingData, GetFollowersData, Response, Status, Code, UserData, GetUserQuery, GetFollowingQuery, GetFollowersQuery, GetIsFollowingQuery, GetUserData, FollowQuery, FollowData, UnfollowData, UnfollowQuery, GetPostQuery, GetPostData, PostData, PublishPostData, DeletePostQuery, DeletePostData, EditUserData, EditUserBody, AvatarUploadData, DeleteUserData } from "../types/API"

export default (baseURL?:string) => {
    const APIInstance = axios.create({
        baseURL:baseURL === undefined?import.meta.env.VITE_baseURL:baseURL
    })

    async function login(body:{ email:string, password:string }): Promise<{ user:UserData, token?:string, status:Status, code:Code }> {
        try {
            const response = await APIInstance.post<Response>("/auth/login", body)

            return {
                code:response.data.code,
                user:response.data.data as UserData,
                status:response.data.status,
                token:response.data.token
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }
    
    async function register(body:{ username:string, email:string, password:string }): Promise<{ user:UserData, token?:string, status:Status, code:Code }> {
        try {
            const response = await APIInstance.post<Response>("/auth/register", body)

            return {
                code:response.data.code,
                user:response.data.data as UserData,
                status:response.data.status,
                token:response.data.token
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }
   
    async function publishPostData(body:{ text:string, parentId?:number }, token:string): Promise<PublishPostData> {
        try {
            const response = await APIInstance.post<Response>("/post", body, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            return {
                code:response.data.code,
                post:response.data.data as PostData,
                status:response.data.status
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function thisToken(token:string): Promise<ThisTokenData> {
        try {
            const response = await APIInstance.get<Response>("/auth/thisToken",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            return {
                code:response.data.code,
                user:response.data.data as UserData,
                status:response.data.status
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function getPost(query:GetPostQuery, token:string): Promise<GetPostData> {
        try {
            const response = await APIInstance.get<Response>("/post", {
                params:query,
                headers:{ Authorization:`Bearer ${token}` }
            })

            return {
                code:response.data.code,
                post:response.data.data as PostData,
                status:response.data.status
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function getUser(query:GetUserQuery, token:string): Promise<GetUserData> {
        try {
            const response = await APIInstance.get<Response>("/user", {
                params:query,
                headers:{ Authorization:`Bearer ${token}` }
            })

            return {
                code:response.data.code,
                user:response.data.data as UserData,
                status:response.data.status
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function getFollowing(query:GetFollowingQuery, token:string): Promise<GetFollowingData> {
        try {
            const response = await APIInstance.get<Response>("/user/following", {
                params:query,
                headers:{ Authorization:`Bearer ${token}` }
            })

            return {
                code:response.data.code,
                all:response.data.all as number,
                following:response.data.data as number[] | UserData[],
                status:response.data.status
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function getFollowers(query:GetFollowersQuery, token:string): Promise<GetFollowersData> {
        try {
            const response = await APIInstance.get<Response>("/user/followers", {
                params:query,
                headers:{ Authorization:`Bearer ${token}` }
            })

            return {
                code:response.data.code,
                all:response.data.all as number,
                followers:response.data.data as number[] | UserData[],
                status:response.data.status
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function deletePost(query:DeletePostQuery, token:string): Promise<DeletePostData> {
        try {
            const response = await APIInstance.delete<Response>("/post", {
                params:query,
                headers:{ Authorization:`Bearer ${token}` }
            })

            return {
                code:response.data.code,
                status:response.data.status
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function getIsFollowing(query:GetIsFollowingQuery, token:string): Promise<GetIsFollowingData> {
        try {
            const response = await APIInstance.get<Response>("/user/isFollowing", {
                params:query,
                headers:{ Authorization:`Bearer ${token}` }
            })

            return {
                code:response.data.code,
                isFollowing:response.data.isFollowing as boolean,
                status:response.data.status
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function follow(query:FollowQuery, token:string): Promise<FollowData> {
        try {
            const response = await APIInstance.patch<Response>("/user/follow", undefined ,{
                params:query,
                headers:{ Authorization:`Bearer ${token}` }
            })

            return {
                code:response.data.code,
                status:response.data.status
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function feed(query:FeedQuery, token:string): Promise<FeedData> {
        try {
            const response = await APIInstance.get<Response>("/post/feed",{
                params:query,
                headers:{ Authorization:`Bearer ${token}` }
            })

            return {
                code:response.data.code,
                status:response.data.status,
                posts:response.data.data as PostData[],
                all:response.data.all as number
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function unfollow(query:UnfollowQuery, token:string): Promise<UnfollowData> {
        try {
            const response = await APIInstance.patch<Response>("/user/unfollow", undefined, {
                params:query,
                headers:{ Authorization:`Bearer ${token}` }
            })

            return {
                code:response.data.code,
                status:response.data.status
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function editUser(body:EditUserBody, token:string): Promise<EditUserData> {
        try {
            const response = await APIInstance.patch<Response>("/user", body, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            return {
                code:response.data.code,
                user:response.data.data as UserData,
                status:response.data.status,
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function bannerUpload(body:FormData, token:string): Promise<AvatarUploadData> {
        try {
            const response = await APIInstance.post<Response>("/user/banner/upload", body, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            return {
                code:response.data.code,
                status:response.data.status,
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function deleteUser(token:string): Promise<DeleteUserData> {
        try {
            const response = await APIInstance.delete<Response>("/user", {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            return {
                code:response.data.code,
                status:response.data.status,
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    async function avatarUpload(body:FormData, token:string): Promise<AvatarUploadData> {
        try {
            const response = await APIInstance.post<Response>("/user/avatar/upload", body, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            return {
                code:response.data.code,
                status:response.data.status,
            }

        } catch (reason) {
            console.warn(reason)
            throw reason
        }
    }

    return {
        instance:APIInstance,
        auth:{
            login:login,
            register:register,
            thisToken:thisToken
        },
        user:{
            getUser:getUser,
            getFollowers:getFollowers,
            getFollowing:getFollowing,
            getIsFollowing:getIsFollowing,
            follow:follow,
            unfollow:unfollow,
            editUser:editUser,
            avatarUpload:avatarUpload,
            bannerUpload:bannerUpload,
            delete:deleteUser
        },
        post:{
            getPost:getPost,
            publishPostData:publishPostData,
            feed:feed,
            delete:deletePost,
            avatarUpload:avatarUpload,
            bannerUpload:bannerUpload
        }
    }    
}