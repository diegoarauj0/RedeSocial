import { DisplayPost } from "../../components/API/posts/displayPost"
import { Get } from "../../components/API/get"
import { GetPostData, GetPostQuery } from "../../types/API"
import { useParams } from "react-router"
import { SideBar } from "../../components/sideBar"
import Styled from "./styled"

export function Post() {
    const { postId } = useParams()
    
    const searchParams = new URL(window.location.href).searchParams

    const findUser = searchParams.get("findUser") === "true"?true:false
    const findParentPostUser = searchParams.get("findParentPostUser") === "true"?true:false
    const findChildrenUser = searchParams.get("findChildrenUser") === "true"?true:false
    const childrenLimit = isNaN(Number(searchParams.get("childrenLimit")))?0:Number(searchParams.get("childrenLimit"))
    const childrenSkip  = isNaN(Number(searchParams.get("childrenSkip")))?0:Number(searchParams.get("childrenSkip"))
    const parentPostLimit = isNaN(Number(searchParams.get("parentPostLimit")))?0:Number(searchParams.get("parentPostLimit"))

    return (
        <SideBar>
            <Styled.Main>
                <Styled.Center>
                    <Get type="getPost" query={{ postId:Number(postId), findUser:findUser, findParentPostUser:findParentPostUser, findChildrenUser:findChildrenUser, childrenLimit:childrenLimit, childrenSkip:childrenSkip, parentPostLimit:parentPostLimit } as GetPostQuery}>
                        {(data:GetPostData) => { return (
                            <DisplayPost {...data.post} createPostButton={true} delete={true} />
                        ) }}
                    </Get>
                </Styled.Center>
            </Styled.Main>
        </SideBar>
    )
}