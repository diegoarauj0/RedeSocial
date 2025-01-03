import Styled from "./styled"

export interface UserAvatarProps {
    avatar:{ ID:string | null, mimetype:string | null }
    edit?:boolean
}

export function UserAvatar(props:UserAvatarProps) {
    const extname:{[key:string]:string} = {
        "image/png":"png",
        "image/jpeg":"jpeg",
        "image/gif":"gif"
    } 

    return (
        <Styled.UserAvatar className="avatar">
            <Styled.Img src={props.avatar === undefined || props.avatar.ID === null?"/images/avatar/default.png":`${import.meta.env.VITE_publicURL}/images/user/avatar/${props.avatar?.ID}.${extname[props.avatar?.mimetype || "image/png"]}`} alt="" />
        </Styled.UserAvatar>
    )
}