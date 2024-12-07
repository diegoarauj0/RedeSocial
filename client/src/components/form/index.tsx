import { ReactElement, FormEvent, Dispatch, SetStateAction } from "react"
import { InputProps, Input, TextareaProps, Textarea } from "../Input"

export interface FormProps {
    children:ReactElement | ReactElement[]
    inputs:InputProps[]
    textarea:TextareaProps[]
    hideError?:(cb:() => void) => void
    handlerSubmit?:(body:{[key:string]: unknown}, elements:{[key:string]: HTMLElement}) => Promise<{[key:string]: string | null} | null>
}

export function Form(props:FormProps) {
    const propsError:{[key:string]:(setError:Dispatch<SetStateAction<string | null>>) => void } = {}

    const displayInputError:{[key:string]:Dispatch<SetStateAction<string | null>>} = {}

    props.inputs.forEach((inputProps) => {
        propsError[inputProps.name] = (setError) => { displayInputError[inputProps.name] = setError }
    })

    props.textarea.forEach((textareaProps) => {
        propsError[textareaProps.name] = (setError) => { displayInputError[textareaProps.name] = setError }
    })

    if (props.hideError !== undefined) { props.hideError(() => { for (const nome in displayInputError) { displayInputError[nome](null) } }) }

    async function handlerSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        
        for (const nome in displayInputError) { displayInputError[nome](null) }

        const body:{[key:string]: string} = {}
        const elements:{[key:string]: HTMLElement} = {}

        const form = event.target as HTMLFormElement
        const inputs = [ ...form.querySelectorAll("input"), ...form.querySelectorAll("textarea") ]
        
        for (const input of inputs) { if (typeof(input) === "object") { body[input.name] = input.value; elements[input.name] = input } }

        if (props.handlerSubmit !== undefined) {
            const errors:{[ key:string ]: string | null} | null = await props.handlerSubmit(body, elements)

            if (errors === null) { return }
            for (const name in errors) {
                if (errors[name] !== null && displayInputError[name] !== undefined) {
                    displayInputError[name](errors[name])
                }
            }
        }
    }

    return (
        <form action="" autoComplete="on" onSubmit={handlerSubmit}>
            {props.inputs.map((inputProps) => ( <Input {...inputProps} error={propsError[inputProps.name]} /> ))}
            {props.textarea.map((textareaProps) => ( <Textarea {...textareaProps} error={propsError[textareaProps.name]} /> ))}
            {Array.isArray(props.children)?props.children.map((element) => ( element )):props.children}
        </form>
    )
}