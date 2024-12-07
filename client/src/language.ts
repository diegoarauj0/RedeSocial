import { ParamsName } from "./types/API"

export interface InterfaceLanguages {
    API:{
        TypeError:{[key:string]:{[key:string]:(v:{path:string, params:{ name:ParamsName, value:unknown }[], value:unknown}) => string}}
    }
}

export const languages:InterfaceLanguages = {
    API:{
        TypeError:{
            "pt-br":{
                "maxdate":(v) => { const date = new Date(Number(v.params.filter((p) => { return p.name == "maxdate" })[0]?.value)); return `Data maxima vai ter o dia ${date.getDate() < 10?"0"+date.getDate():date.getDate()}/${date.getMonth() + 1 < 10?"0"+(date.getMonth() + 1 ):date.getMonth() + 1 }/${date.getFullYear()}` },
                "invalidcharacters":(v) => { return `O(a) ${v.path} so pode ter ${v.params.filter((p) => { return p.name == "numbers" })[0]?.value == true?"numeros,":""} ${v.params.filter((p) => { return p.name == "letters" })[0]?.value == true?"letras,":""} ${v.params.filter((p) => { return p.name == "underline" })[0]?.value == true?"underline":""}` },
                "not found":(v) => { return `O(a) ${v.path} não foi encontrado(a)` },
                "required":(v) => {return `O(a) ${v.path} e obrigatorio`},
                "minlength":(v) => {return `O(a) ${v.path} precisa ter no minimo ${v.params.filter((p) => { return p.name == "minlength" })[0]?.value} caracteres`},
                "maxlength":(v) => {return `O(a) ${v.path} so pode ter no maximo ${v.params.filter((p) => { return p.name == "maxlength" })[0]?.value} caracteres`},
                "duplicate":(v) => {return `Esse(a) ${v.path} ja foi usado(a)`},
                "it not email":() => {return `Esse email não e valido`},
                "weakpassword":(v) => {return `Senha precisa ter no minimo ${v.params.filter((p) => { return p.name == "minLowercase" })[0]?.value} letra minúscula, ${v.params.filter((p) => { return p.name == "minUppercase" })[0]?.value} letra maiúscula, ${v.params.filter((p) => { return p.name == "minSymbols" })[0]?.value} símbolos, ${v.params.filter((p) => { return p.name == "minNumbers" })[0]?.value} numeros`}
            }
        }
    }
}