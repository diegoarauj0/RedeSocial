import { ReactNode } from "react"
import { Header } from "../header"
import { Nav } from "../nav"
import { Profile } from "../API/users/profile"
import { Get } from "../API/get"
import { GetUserData, GetUserQuery } from "../../types/API"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import Styled from "./styled"
import { LinkProps, Link } from "react-router"
import { LogoutButton } from "../API/users/logoutButton"

export interface SideBarProps {
    children:ReactNode
}

export function SideBar(props:SideBarProps) {
    const [ userId ] = useLocalStorage({
        name:"userId",
        constructor:String
    })
    const [ username ] = useLocalStorage({
        name:"username",
        constructor:String
    })

    const links:{ props:LinkProps, text:string, img?:{ src:string, alt:string } }[] = [
        { text:"Inicio", props:{ to:"/" }, img:{ alt:"home", src:"/images/home.png" } },
        { text:"Perfil", props:{ to:`/@${username}` }, img:{ alt:"account", src:"/images/account.png" } }
    ]

    return (
        <Styled.Main>
            <Styled.SideBar>
                <Styled.Start>
                    <Header nav={false} />
                    <hr />
                    <Nav links={links}>
                        <LogoutButton />
                    </Nav>
                </Styled.Start>
                <Styled.End>
                    <hr />
                    <Link to={"/publish"}>
                        <img src="/images/postAdd.png" alt="post add" />
                        Publicar
                    </Link>
                    <Get query={ { userId:userId } as GetUserQuery} type="getUser" >
                        {(user:GetUserData) => {
                            return <Profile {...user.user} type="header" />
                        }}
                    </Get>
                </Styled.End>
            </Styled.SideBar>
            <Styled.Children>
                {props.children}
            </Styled.Children>
        </Styled.Main>
    )

}
