import { useEffect, useState } from "react"

export interface useLocalStorageProps {
    name:string
    constructor:(value?:unknown) => unknown
}

export function useLocalStorage<Value = unknown>(props:useLocalStorageProps): [ Value | null, (value:Value | null) => void ] {
    function getItem(): string | null { return localStorage.getItem(props.name) }
    function setItem(value:unknown) {
        console.log(value)
        if (value === null) {
            localStorage.removeItem(props.name)
            return
        }
        localStorage.setItem(props.name, String(value))
    }

    let item = getItem()

    const [ data, setData ] = useState<Value | null>(item === null?null:props.constructor(item) as unknown as Value)

    useEffect(() => {
        setInterval(() => {
            setData((data) => {
                item = getItem()
                if ((item === null?null:props.constructor(item)) !== data) { return item === null?null:props.constructor(item) as Value }
                return data
            })
        },1)
    },[])

    return [ data, (value:Value | null) => { setItem(value) } ]
}