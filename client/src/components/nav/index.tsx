import { Link, LinkProps } from "react-router"
import Styled from "./styled"
import { ReactNode } from "react"

export interface NavProps {
    children?:ReactNode
    links:{ props:LinkProps, text:string, img?:{ src:string, alt:string } }[]
}

export function Nav(props:NavProps) {
    return (
        <Styled.Nav>
            {props.links.map((link) => ( <Link key={link.text} {...link.props} >{ link.img !== undefined?<div><img src={link.img.src} alt={link.img.alt} /></div>:<></>}<p>{ link.text }</p></Link> ))}
            {props.children}
        </Styled.Nav>
    )
}