import { SideBar } from "../../components/sideBar"
import { Link } from "react-router"
import { Feed } from "../../components/API/posts/feed"
import Styled from "./styled"

export function Home() {
    return (
        <SideBar>
            <Styled.Main>
                <Styled.Center>
                    <Link className="publish" to={"/publish"}>
                        <img src="/images/postAdd.png" alt="post add" />
                        Publicar
                    </Link>
                    <Feed />
                </Styled.Center>
            </Styled.Main>
        </SideBar>
    )
}