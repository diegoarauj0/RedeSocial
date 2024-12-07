import { useLocalStorage } from "../../../../hooks/useLocalStorage"
import Styled from "./styled"

export function LogoutButton() {
    const [, setToken ] = useLocalStorage({ name:"token", constructor:String })
    const [, setUserId ] = useLocalStorage({ name:"userId", constructor:String })
    const [, setUsername ] = useLocalStorage({ name:"username", constructor:String })

    function handlerClick() {
        setUserId(null)
        setUsername(null)
        setToken(null)

        window.open("/auth", "_self")
    }

    return (
        <Styled.LogoutButton onClick={handlerClick}  className="logoutButton"><img src="/images/logout.png" alt="logout" /> <p>Sair</p> </Styled.LogoutButton>
    )
}