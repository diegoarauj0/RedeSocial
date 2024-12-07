import Styled from "./styled"

export interface UserBioProps {
    bio:string | null
}

export function UserBio(props:UserBioProps) {
    return (
        <Styled.Bio className="userBio">{props.bio || "Este usuário não tem uma bio."}</Styled.Bio>
    )
}
