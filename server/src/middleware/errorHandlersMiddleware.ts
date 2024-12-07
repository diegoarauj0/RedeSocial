import { NextFunction, Request, Response} from "express"
import { httpCodeError } from "../error/httpCodeError"

function notFoundHandler(req:Request, res:Response, next:NextFunction): void {
    res.status(404).json({ status:"not found", code:404, reason:`URL ${req.method} | ${req.url} not found ` })
}

function httpCodeErrorHandler(err:httpCodeError, req:Request, res:Response, next:NextFunction) {
    if (err.name == "httpCodeError") {
        res.status(err.code).json(err.JSON())
        return
    }
    next(err)
}

function mongooseErrorHandler(err:any, req:Request, res:Response, next:NextFunction): void {
    if (err.name == "ValidationError") {
        const json:any = { status:"Bad Request", code:400, errors:{ body:[] } }

        Object.keys(err.errors).forEach((errorName) => {
            const error = err.errors[errorName]
            let errorParams:any[] = []
            const prefix = "object"
            let message = error.properties.message
            let object:any = {}

            if (message.indexOf(`${prefix}--`) != -1 && message.indexOf(`--${prefix}`) != -1) {
                message = message.substring(message.indexOf(`${prefix}--`) + `${prefix}--`.length)
                message = message.substring(0, message.indexOf(`--${prefix}`))
                try {object = new Function(`return ${message}`)()} catch {}
            }

            Object.keys(error.properties).forEach((propertieName) => {
                ["minlength", "maxlength"].forEach((name) => { if (name == propertieName) { errorParams.push({ name:propertieName, value:error.properties[propertieName] }) }})
            })

            if (object.params != undefined && typeof(object.params) == "object" && object.params.length > 0) { errorParams = errorParams.length > 0?[errorParams, ...object.params]:object.params }

            json.errors.body.push({ path:error.properties.path, value:error.properties.value, type:error.properties.type, params:errorParams })
        })
        res.status(400).json(json)
        return
    }
    next(err)
}

function errorHandler(err: Error, req:Request, res:Response, next:NextFunction): void {
    res.status(500).json({ status:"internal server error", code:500 });
    console.log(err)
}

export {
    errorHandler,
    notFoundHandler,
    mongooseErrorHandler,
    httpCodeErrorHandler
}