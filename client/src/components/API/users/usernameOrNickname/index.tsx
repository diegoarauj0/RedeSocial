import Styled from "./styled.ts"

export interface UsernameOrNicknameProps {
    invisibleUsername?:boolean
    invisibleNickname?:boolean
    usernamesize?:number
    nicknamesize?:number
    username:string,
    nickname:string
}

export function UsernameOrNickname(props:UsernameOrNicknameProps) {
    return (
        <Styled.UsernameOrNickname>
            {props.invisibleNickname === true?<></>:<Styled.Nickname className="nickname">{props.nickname}</Styled.Nickname>}
            {props.invisibleUsername === true?<></>:<Styled.Username className="username">@{props.username}</Styled.Username>}
        </Styled.UsernameOrNickname>
    )
}