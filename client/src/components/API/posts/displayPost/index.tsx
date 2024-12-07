import { PostData } from "../../../../types/API"
import { Profile } from "../../../../components/API/users/profile"
import { DisplayData } from "../../../../components/displayDate"
import { Link } from "react-router"
import Styled from "./styled"
import { useLocalStorage } from "../../../../hooks/useLocalStorage"
import API from "../../../../services/API"

export interface DisplayPostProps extends PostData {
    createPostButton?:boolean
    delete?:boolean
}

export function DisplayPost(props:DisplayPostProps) {
    const [ userId ] = useLocalStorage({
        name:"userId",
        constructor:String
    })

    const [ token ] = useLocalStorage<string>({
        name:"token",
        constructor:String
    })

    const api = API()

    async function handlerDelete() {
        try {
            await api.post.delete({ postId:props.postId}, token || "");
            
            const navigation = (window as unknown as { navigation:{ back:() => void } }).navigation
            navigation.back()
        } catch (reason) {
            console.warn(reason)
        }
    }

    return (
        <Styled.Post>
            <Styled.ParentPost>
                {props.parentPost !== null?<DisplayPost {...props.parentPost}/>:<></>}
            </Styled.ParentPost>
            <Styled.Header>
                {props.deleted === true?<p className="deleted">Publicação deletada</p>:
                    <>
                        {props.user === null?<></>:<Link to={`/@${props.user.username}`}><Profile type="header" {...props.user} /></Link>}
                        {userId == props.userId && props.delete === true?<button className="delete" onClick={handlerDelete} style={{ zIndex:100 }}><img src="/images/delete.png" alt="delete" /></button>:<></>}
                    </>
                }
            </Styled.Header>
            <Styled.Main>
                <Link to={`/post/${props.postId}?findUser=true&childrenLimit=4&findChildrenUser=true&parentPostLimit=5&findParentPostUser=true`}>
                    {props.deleted === true?"Desculpe, Esta publicação foi removida pelo autor,":props.text}
                    <Styled.Footer>
                        <DisplayData date={new Date(props.createdAt)} hours={true} />
                        <Styled.ChildrenCount>{props.childrenCount} Comentarios</Styled.ChildrenCount>
                    </Styled.Footer>
                </Link>
            </Styled.Main>
            {props.createPostButton === true && props.deleted === false?<Link to={`/publish?targetId=${props.postId}`} className="publish"><img src="/images/postAdd.png" alt="post add" />Comentar</Link>:<></>}
            <Styled.Children>
                {props.children.map((postData) => (
                    <DisplayPost {...postData} />
                ))}
            </Styled.Children>
        </Styled.Post>
    )
}