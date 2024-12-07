import { Link, useParams } from "react-router"
import { Get } from "../../components/API/get"
import { Profile } from "../../components/API/users/profile"
import { SideBar } from "../../components/sideBar"
import { GetFollowersData } from "../../types/API"
import { NotFound } from "../../components/notFound"
import Styled from "./styled"
import { useState } from "react"

export function Followers() {
    const { target } = useParams()
    const [ skip, setSkip ] = useState<number>(0)
    const limit = 20

    const userIdOrUsername = isNaN(Number(target))?"username":"userId"
    const targetName = userIdOrUsername === "username"? target?.indexOf("@") === 0?target.substring(1):target:undefined
    const targetId = Number(target)

    function handlerNext() {
        setSkip((skip) => { return skip + 1 })
    }

    function handlerPreviw() {
        setSkip((skip) => { if (skip <= 0) { return skip } return skip - 1 })
    }

    return (
        <SideBar>
            <Styled.Main>
                <h2>Seguidores</h2>
                <Get type="getFollowers" query={userIdOrUsername === "username"?{ username:targetName, findUser:true, skip:skip * limit, limit:limit }:{ userId:targetId, findUser:true, skip:skip * limit, limit:limit }}>
                    {(data:GetFollowersData) => (
                        <>
                            {data.followers.length === 0?<NotFound title="ninguem esta seguindo você" />:
                            <>
                                {data.followers.map((user) => (
                                    typeof(user) === "number"?<></>:
                                    <Link to={`/@${user.username}`}>
                                        <Profile {...user} type="header" />
                                    </Link>
                                ))}
                                <Styled.Controls>
        
                                    {skip !== 0?<button onClick={handlerPreviw}>Anterior</button>:<></>}
                                    {data.all > ((skip * limit) + limit)?<button onClick={handlerNext}>Proximo</button>:<></>}
                                </Styled.Controls>
                            </>
                            }
                        </>
                    )}

                </Get>
            </Styled.Main>
        </SideBar>
    )
}