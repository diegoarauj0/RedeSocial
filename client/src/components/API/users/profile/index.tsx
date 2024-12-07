import Styled from "./styled.ts"
import { UserData } from "../../../../types/API"
import { UserAvatar } from "../userAvatar/index.tsx"
import { UserBanner } from "../userBanner/index.tsx"
import { UsernameOrNickname } from "../usernameOrNickname/index.tsx"
import { FolloworOrUnfollow } from "../followOrUnfollow/index.tsx"
import { FollowersCountAndFollowingCount } from "../followersCountAndFollowinCount/index.tsx"
import { DisplayData } from "../../../displayDate/index.tsx"
import { useLocalStorage } from "../../../../hooks/useLocalStorage.ts"
import { UserBio } from "../userBio/index.tsx"
import { Link } from "react-router"

interface ProfileProps extends UserData {
    type:"full" | "header"
}

function Profile(props:ProfileProps) {
    const [ userId ] = useLocalStorage<number>({ name:"userId", constructor:Number })

    if (props.type === "header") {
        return (
            <Styled.Header className="profile">
                <Styled.HeaderImages>
                    <UserAvatar {...props} />
                </Styled.HeaderImages>
                <Styled.HeaderUsernameOrNickname>
                    <UsernameOrNickname {...props} />
                </Styled.HeaderUsernameOrNickname>
            </Styled.Header>
        )
    }

    return (
        <Styled.Full>
            <Styled.FullImages>
                <UserBanner {...props}/>
                <UserAvatar {...props}/>
            </Styled.FullImages>
            <Styled.FullUsernameOrNickname>
                <UsernameOrNickname {...props} />
            </Styled.FullUsernameOrNickname>
            <Styled.FullButtons>
                {userId !== null && props.userId === userId?<Link to={`/settings`}>Editar</Link>:<></>}
                {userId !== null?<FolloworOrUnfollow targetId={props.userId} userId={userId} />:<></>}
            </Styled.FullButtons>
            <Styled.FullBio>
                <UserBio {...props} />
            </Styled.FullBio>
            <Styled.FullDisplayDate>
                <hr />
                <div className="profile-full-displayData-createdAt"><img src="/images/calendar.png" alt="calendar" /><p>Conta Criada em: </p> <DisplayData date={new Date(props.createdAt)} /></div>
                {props.birthday === null?<></>:<div className="profile-full-displayData-birthday"><img src="/images/calendar.png" alt="calendar" /><p>Aniversário em: </p> <DisplayData date={new Date(props.birthday)} /></div>}
                <hr />
            </Styled.FullDisplayDate>
            <Styled.FullFollowersCountAndFollowinCount>
                <FollowersCountAndFollowingCount {...props} />
            </Styled.FullFollowersCountAndFollowinCount>
        </Styled.Full>
    )
}

export { Profile }
export type { ProfileProps }