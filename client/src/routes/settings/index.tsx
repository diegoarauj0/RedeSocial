import { AxiosError } from "axios"
import { Form } from "../../components/form"
import { SideBar } from "../../components/sideBar"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import Styled from "./styled"
import { Response } from "../../types/API"
import { languages } from "../../language"
import API from "../../services/API"

export function Settings() {
    const [ token, setToken ] = useLocalStorage<string>({ name:"token", constructor:String })

    const api = API()

    async function handlerSubmit(body:{ [key:string]: unknown }, elements:{[key:string]: HTMLElement}): Promise<{ [key:string]: string | null } | null> {
        try {
            let formData = new FormData()
            const avatar = elements.avatar as HTMLInputElement
            const banner = elements.banner as HTMLInputElement

            if (avatar !== undefined && avatar.files !== null && avatar.files.length !== 0) {
                formData.append("avatar", avatar.files[0])
                await api.user.avatarUpload(formData, token || "")
                formData = new FormData()
            }

            if (banner !== undefined && banner.files !== null && banner.files.length !== 0) {
                formData.append("banner", banner.files[0])
                await api.user.bannerUpload(formData, token || "")
            }

            const birthday = isNaN(Number(new Date(String(body.birthday || ""))))?undefined:new Date(String(body.birthday || ""))

            if (birthday !== undefined) { birthday.setDate(birthday.getDate() + 1) }

            const response = await api.user.editUser({
                nickname:body.nickname as string,
                bio:body.bio as string,
                birthday:birthday?.getTime()
            }, token || "")

            open(`/@${response.user.username}`, "_self")

            return null
        } catch (reason:unknown) {
            try {
                const axiosError = reason as AxiosError
                const data = axiosError.response?.data as Response

                if (data === undefined) { throw "" }

                const body = data.errors?.body

                if (body === undefined) { throw "" }

                const errors:{[key:string]:string} = {}

                body.forEach((err) => {
                    errors[err.path] = languages.API.TypeError["pt-br"][err.type]({ params:err.params, path:err.path, value:err.value })
                })

                return errors

            } catch(err) {
                console.warn(err)
            }
        }

        return null
    }

    async function handlerDelete(): Promise<void> {
        try {
            await api.user.delete(token || "")
            setToken(null)

            open("/auth", "_self")
        } catch (reason) {
            console.warn(reason)
        }
    }

    return (
        <SideBar>
            <Styled.Main>
                <Styled.Section>
                    <h2>Configurar perfil</h2>
                    <Form textarea={[
                        { name:"bio", id:"bio", text:"biografia", placeholder:"Digite sua bio"  }
                    ]} handlerSubmit={handlerSubmit} inputs={[
                        { name:"avatar", id:"avatar", type:"file", required:false, text:"Carregar o avatar" },
                        { name:"banner", id:"banner", type:"file", required:false, text:"Carregar o banner" },
                        { name:"nickname", id:"nickname", type:"text", required:false, text:"Nickname", placeholder:"Digite seu novo nickname" },
                        { name:"birthday", id:"birthday", type:"date", required:false, text:"Aniversario" },
                    ]} >
                        <button type="submit">Atualizar</button>
                        <button type="button" className="delete" onClick={handlerDelete}>Deletar Conta</button>
                    </Form>
                </Styled.Section>
            </Styled.Main>
        </SideBar>
    )
}