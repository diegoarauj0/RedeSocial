import { SideBar } from "../../components/sideBar/index.tsx"
import { Form } from "../../components/form/index.tsx"
import Styled from "./styled.ts"
import { DisplayData } from "../../components/displayDate/index.tsx"
import { Get } from "../../components/API/get/index.tsx"
import { useLocalStorage } from "../../hooks/useLocalStorage.ts"
import { GetPostData, GetPostQuery, GetUserData, Response } from "../../types/API.ts"
import { Profile } from "../../components/API/users/profile/index.tsx"
import { DisplayPost } from "../../components/API/posts/displayPost/index.tsx"
import { languages } from "../../language.ts"
import API from "../../services/API.ts"
import { AxiosError } from "axios"

export function Publish() {
    const [ userId ] = useLocalStorage({
        name:"userId",
        constructor:String
    })

    const [ token ] = useLocalStorage<string>({
        name:"token",
        constructor:String
    })

    const searchParams = new URL(window.location.href).searchParams

    const targetId = Number(String(searchParams.get("targetId")))

    const api = API("http://localhost:8080/api")

    async function handlerSubmit(body:{ [key:string]: unknown }): Promise<{ [key:string]: string | null } | null> {
        try {
            const response = await api.post.publishPostData(isNaN(targetId)?{ text:body.text as string }:{ text:body.text as string, parentId:targetId }, token || "")

            window.open(`/post/${response.post.postId}?findUser=true&childrenLimit=4&findChildrenUser=true&parentPostLimit=1&findParentPostUser=true`, "_self")

            return null
        } catch (reason:unknown) {
            try {
                const axiosError = reason as AxiosError
                const data = axiosError.response?.data as Response

                if (data === undefined) { throw "" }

                const body = data.errors?.body

                if (body === undefined) { throw "" }

                const errors:{[key:string]:string} = {}

                body.forEach((err) => {
                    errors[err.path] = languages.API.TypeError["pt-br"][err.type]({ params:err.params, path:err.path, value:err.value })
                })

                return errors

            } catch(err) {
                console.warn(err)
            }
        }

        return null
    }

    return (
        <SideBar>
            <Styled.Main>
                <Styled.Center>
                    {!isNaN(targetId)?
                        <Get type="getPost" query={{ postId:Number(targetId), findUser:true } as GetPostQuery}>
                            {(data:GetPostData) => ( <DisplayPost {...data.post} />)}
                        </Get>
                    :<></>}
                    <Styled.Form>
                        <Get type="getUser" query={{ userId:userId }}>
                            {(data:GetUserData) => ( <Profile type="header" {...data.user} /> )}
                        </Get>
                        <Form handlerSubmit={handlerSubmit} inputs={[]} textarea={[
                            { id:"text", name:"text", required:true, text:"Post", placeholder:"Digite algo..." }
                        ]}>
                            <DisplayData date={new Date()} hours={true} />
                            <button type="submit">Publicar</button>
                        </Form>
                    </Styled.Form>
                </Styled.Center>
            </Styled.Main>
        </SideBar>
    )
}