import Styled from "./styled"

export interface UserBannerProps {
    banner?:{ ID:string | null, mimetype:string | null }
}

export function UserBanner(props:UserBannerProps) {
    const extname:{[key:string]:string} = {
        "image/png":"png",
        "image/jpeg":"jpeg",
        "image/gif":"gif"
    } 

    return (
        <Styled.UserBanner className="banner" style={{ backgroundImage:`URL(${props.banner === undefined || props.banner?.ID === null?`/images/banner/default.png`:`${import.meta.env.VITE_publicURL}/images/user/banner/${props.banner.ID}.${extname[props.banner.mimetype || "image/png"]}`})` }}></Styled.UserBanner>
    )
}