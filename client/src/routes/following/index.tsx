import { Link, useParams } from "react-router"
import { Get } from "../../components/API/get"
import { Profile } from "../../components/API/users/profile"
import { SideBar } from "../../components/sideBar"
import { GetFollowingData } from "../../types/API"
import Styled from "./styled"
import { NotFound } from "../../components/notFound"
import { useState } from "react"

export function Following() {
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
                <h2>Seguindo</h2>
                <Get type="getFollowing" query={userIdOrUsername === "username"?{ username:targetName, findUser:true, skip:skip * limit, limit:limit }:{ userId:targetId, findUser:true, skip:skip * limit, limit:limit }}>
                    {(data:GetFollowingData) => (
                        <>
                            {data.following.length === 0?<NotFound title="você esta seguindo ninguem" />:
                            <>
                                {data.following.map((user) => (
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