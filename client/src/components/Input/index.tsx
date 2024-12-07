import { HTMLInputTypeAttribute, useState, Dispatch, SetStateAction } from "react"
import Styled from "./styled"

export interface TextareaProps {
    name:string
    id:string
    placeholder?:string
    text?:string
    required?:boolean
    error?:(setError:Dispatch<SetStateAction<string | null>>) => void 
}

export interface InputProps {
    name:string
    id:string
    type:HTMLInputTypeAttribute
    placeholder?:string
    text?:string
    required?:boolean
    error?:(setError:Dispatch<SetStateAction<string | null>>) => void 
}

export function Textarea(props:TextareaProps) {
    const [ error, setError ] = useState<string | null>(null)

    if (props.error !== undefined) { props.error(setError) }

    return (
        <Styled.Div key={`textarea-parent-${props.name}`}>
            <Styled.Label htmlFor={props.id} key={`label-${props.name}`}>{props.text === undefined?props.name:props.text}</Styled.Label>
            <Styled.Error className="error" invisible={error === null?"true":"false"} key={`textarea-error-${props.name}`}><p key={`textarea-error-text-${props.name}`}>{error}</p></Styled.Error>
            <Styled.Textarea onChange={(e) => {e.currentTarget.style.height = (e.currentTarget.scrollHeight + (e.currentTarget.offsetHeight - e.currentTarget.clientHeight)) + "px"}} required={props.required} name={props.name} id={props.id} key={`textarea-${props.name}`} placeholder={props.placeholder} />
        </Styled.Div>
    )
}

export function Input(props:InputProps) {
    const [ error, setError ] = useState<string | null>(null)

    if (props.error !== undefined) { props.error(setError) }

    return (
        <Styled.Div key={`input-parent-${props.name}`}>
            <Styled.Label htmlFor={props.id} key={`label-${props.name}`}>{props.text === undefined?props.name:props.text}</Styled.Label>
            <Styled.Error className="error" invisible={error === null?"true":"false"} key={`input-error-${props.name}`}><p key={`input-error-text-${props.name}`}>{error}</p></Styled.Error>
            <Styled.Input required={props.required} type={props.type} name={props.name} id={props.id} key={`input-${props.name}`} placeholder={props.placeholder} />
        </Styled.Div>
    )
}