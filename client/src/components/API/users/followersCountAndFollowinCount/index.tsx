import { Link } from "react-router"
import Styled from "./styled"

export interface FollowersCountAndFollowingCountProps {
    followersCount: number
    followingCount: number
    username:string
}

export function FollowersCountAndFollowingCount(props:FollowersCountAndFollowingCountProps) {
    return (
        <Styled.FollowersCountAndFollowingCount>
            <Styled.Following>
                <Link to={`/@${props.username}/following`}>
                    <Styled.Count>{props.followingCount}</Styled.Count>
                    <Styled.Text>Seguindo</Styled.Text>
                </Link>
            </Styled.Following>
            <Styled.Followers>
                <Link to={`/@${props.username}/followers`}>
                    <Styled.Count>{props.followersCount}</Styled.Count>
                    <Styled.Text>Seguidores</Styled.Text>
                </Link>
            </Styled.Followers>
        </Styled.FollowersCountAndFollowingCount>
    )
}