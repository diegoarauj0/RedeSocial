import { Get } from "../../components/API/get"
import { Profile } from "../../components/API/users/profile"
import { SideBar } from "../../components/sideBar"
import { GetUserData, GetUserQuery } from "../../types/API"
import { useParams, Link } from "react-router"
import Styled from "./styled"
import { Feed } from "../../components/API/posts/feed"
import { NotFound } from "../../components/notFound"
import { Loading } from "../../components/loading"
import { useLocalStorage } from "../../hooks/useLocalStorage"

export function User() {
    const { target } = useParams()
    const [ userId ] = useLocalStorage<number>({ name:"userId", constructor:Number })

    const userIdOrUsername = isNaN(Number(target))?"username":"userId"
    const targetName = userIdOrUsername === "username"? target?.indexOf("@") === 0?target.substring(1):target:undefined
    const targetId = Number(target)

    return (
        <SideBar>
            <Styled.Main>
                <Get type="getUser" query={userIdOrUsername === "username"?{ username:targetName }:{ userId:targetId } as GetUserQuery} loading={
                        <Loading />
                    } error={
                        <NotFound title={userIdOrUsername === "username"?`não existe um usuario com o nome @${targetName} :(`:`não existe um usuario com o id ${targetId}`
                    } />}>
                    {(data:GetUserData) =>  { return (
                        <>
                            <Profile {...data.user} type="full"/>
                            <Styled.Center>
                                {userId === data.user.userId?<Link className="publish" to={"/publish"}><img src="/images/postAdd.png" alt="post add" />Publicar</Link>:<></>}
                                <Feed userId={data.user.userId} />
                            </Styled.Center>
                        </>
                    ) }}
                </Get>
            </Styled.Main>
        </SideBar>
    )
}