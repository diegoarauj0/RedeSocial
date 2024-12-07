import { useState } from "react"
import { Header } from "../../components/header"
import { Form } from "../../components/form"
import Styled from "./styled"
import { InputProps } from "../../components/Input"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import API from "../../services/API"
import { Code, Errors, Status, UserData, Response } from "../../types/API"
import { AxiosError } from "axios"
import { languages } from "../../language"

export function Auth() {
    const [ registerOrLogin, setRegisterOrLogin ] = useState<"login" | "register">("login")
    const [ token, setToken ] = useLocalStorage({ name:"token", constructor:String })
    const [, setUserId ] = useLocalStorage({ name:"userId", constructor:String })
    const [, setUsername ] = useLocalStorage({ name:"username", constructor:String })

    if (token !== null) { window.open("/", "_self") }

    const api = API("http://localhost:8080/api")

    let hideError = () => {}

    function handlerRegisterOrLogin() {
        setRegisterOrLogin(registerOrLogin === "login"?"register":"login")
        hideError()
    }

    async function handlerSubmit(body:{ [key:string]: unknown }): Promise<{ [key:string]: string | null } | null> {
        try {
            let response:{
                errors?: Errors
                token?: string
                status: Status
                code: Code
                user:UserData
            }

            if (registerOrLogin === "register") {
                response = await api.auth.register({ username:body.username as string, email:body.email as string, password:body.password as string })
            } else { response = await api.auth.login({ email:body.email as string, password:body.password as string }) }

            setToken(response.token)
            setUserId(response.user.userId)
            setUsername(response.user.username)

            window.open("/", "_self")

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

    let inputs:InputProps[] = []

    if (registerOrLogin === "register") {
        inputs.push({ required:true, id:"username", name:"username", type:"text", text:"Nome de usuario", placeholder:"Digite seu nome de usuario" })
    }

    inputs = [
        ...inputs,
        { required:true, id:"email", name:"email", type:"email", text:"Email", placeholder:"Digite seu email" },
        { required:true, id:"password", name:"password", type:"password", text:"Senha", placeholder:"Digite sua senha" }
    ]

    return (
        <Styled.Main>
            <Styled.Section>
                < Header />
                <h2>{registerOrLogin === "register"?"Criar uma nova conta":"Entar na sua conta"}</h2>
                <Form textarea={[]} handlerSubmit={handlerSubmit} inputs={inputs} hideError={(cb) => { hideError = cb }}>
                    <button type="submit">{registerOrLogin === "register"?"Registrar":"Logar"}</button>
                    <button type="button" onClick={handlerRegisterOrLogin}>{registerOrLogin === "register"?"Ja tem uma conta?":"Não tem uma conta ?"}</button>
                </Form>
            </Styled.Section>
        </Styled.Main>
    )
}