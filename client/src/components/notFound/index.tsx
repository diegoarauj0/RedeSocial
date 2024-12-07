import Styled from "./styled"

export interface NotFoundProps {
    title?:string
}

export function NotFound(props:NotFoundProps) {
    return (
        <Styled.Div className="notFound">
            <Styled.Img src="/images/notFound.png" alt="not found" />
            {props.title === undefined?<></>:<p>{props.title}</p>}
            <a href="https://storyset.com/online" target="_blank">Online illustrations by Storyset</a>
        </Styled.Div>
    )
}