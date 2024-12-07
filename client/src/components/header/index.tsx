import { LinkProps } from "react-router"
import { Nav } from "../nav"
import Styled from "./styled"

export interface HeaderProps {
    nav?:boolean
}

export function Header(props:HeaderProps) {
    const links:{ props:LinkProps, text:string, img?:{ src:string, alt:string } }[] = [
        { text:"Home", props:{ to:"/" }, img:{ alt:"home", src:"/images/home.png" } },
        { text:"Profile", props:{ to:"/@diego" }, img:{ alt:"account", src:"/images/account.png" } }
    ]

    return (
        <Styled.Header>
            <h1>Rede Social</h1>
            {props.nav === true?< Nav links={links} />:<></>}
        </Styled.Header>
    )
}