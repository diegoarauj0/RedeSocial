export type status =  "Continue" | "Switching Protocols" | "Processing" | "Early Hints" | "OK" | "Created" | "Accepted" | "Non-Authoritative Information" | "No Content" | "Reset Content" | "Partial Content" | "Multi-Status" | "Already Reported" | "Transformation Applied" | "IM Used" | "Multiple Choices" | "Moved Permanently" | "Found" | "See Other" | "Not Modified" | "Use Proxy" | "Temporary Redirect" | "Permanent Redirect" | "Bad Request" | "Unauthorized" | "Payment Required" | "Forbidden" | "Not Found" | "Method Not Allowed" | "Not Acceptable" | "Proxy Authentication Required" | "Request Timeout" | "Conflict" | "Gone" | "Length Required" | "Precondition Failed" | "Payload Too Large" | "Request-URI Too Long" | "Unsupported Media Type" | "Request Range Not Satisfiable" | "Expectation Failed" | "I’m a teapot" | "Enhance Your Calm" | "Misdirected Request" | "Unprocessable Entity" | "Locked" | "Failed Dependency" | "Too Early" | "Upgrade Required" | "Precondition Required" | "Too Many Requests" | "Request Header Fields Too Large" | "No Response" | "Blocked by Windows Parental Controls" | "Unavailable For Legal Reasons" | "SSL Certificate Error" | "SSL Certificate Required" | "HTTP Request Sent to HTTPS Port" | "Token expired/invalid" | "Client Closed Request" | "Internal Server Error" | "Not Implemented" | "Bad Gateway" | "Service Unavailable" | "Gateway Timeout" | "Variant Also Negotiates" | "Insufficient Storage" | "Loop Detected" | "Bandwidth Limit Exceeded" | "Not Extended" | "Network Authentication Required" | "Web Server Is Down" | "Connection Timed Out" | "Origin Is Unreachable" | "SSL Handshake Failed" | "Site Frozen" | "Network Connect Timeout Error"
export type code = 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 214 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 420 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 444 | 450 | 451 | 495 | 496 | 497 | 498 | 499 | 500 | 501 | 502 | 503 | 504 | 506 | 507 | 508 | 509 | 510 | 511 | 521 | 522 | 523 | 525 | 530 | 599
export type errorType = "maxdate" | "required" | "not found" | "incorrect" | "can't follow yourself" | "are you already following" | "can't unfollow yourself" | "you are not following" | "extname invalid" | "maxsize" | "minlength" | "maxlength" | "duplicate" | "weakpassword" | "it not email"

export interface error<P = string> {
    path:P
    type:errorType
    value?:any,
    params:{
        mimetype?:string
        maxsize?:number
    }
}

export const statusCode:{[key:number]: status } = { 100: "Continue", 101: "Switching Protocols", 102: "Processing", 103: "Early Hints", 200: "OK", 201: "Created", 202: "Accepted", 203: "Non-Authoritative Information", 204: "No Content", 205: "Reset Content", 206: "Partial Content", 207: "Multi-Status", 208: "Already Reported", 214: "Transformation Applied", 226: "IM Used", 300: "Multiple Choices", 301: "Moved Permanently", 302: "Found", 303: "See Other", 304: "Not Modified", 305: "Use Proxy", 307: "Temporary Redirect", 308: "Permanent Redirect", 400: "Bad Request", 401: "Unauthorized", 402: "Payment Required", 403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed", 406: "Not Acceptable", 407: "Proxy Authentication Required", 408: "Request Timeout", 409: "Conflict", 410: "Gone", 411: "Length Required", 412: "Precondition Failed", 413: "Payload Too Large", 414: "Request-URI Too Long", 415: "Unsupported Media Type", 416: "Request Range Not Satisfiable", 417: "Expectation Failed", 418: "I’m a teapot", 420: "Enhance Your Calm", 421: "Misdirected Request", 422: "Unprocessable Entity", 423: "Locked", 424: "Failed Dependency", 425: "Too Early", 426: "Upgrade Required", 428: "Precondition Required", 429: "Too Many Requests", 431: "Request Header Fields Too Large", 444: "No Response", 450: "Blocked by Windows Parental Controls", 451: "Unavailable For Legal Reasons", 495: "SSL Certificate Error", 496: "SSL Certificate Required", 497: "HTTP Request Sent to HTTPS Port", 498: "Token expired/invalid", 499: "Client Closed Request", 500: "Internal Server Error", 501: "Not Implemented", 502: "Bad Gateway", 503: "Service Unavailable", 504: "Gateway Timeout", 506: "Variant Also Negotiates", 507: "Insufficient Storage", 508: "Loop Detected", 509: "Bandwidth Limit Exceeded", 510: "Not Extended", 511: "Network Authentication Required", 521: "Web Server Is Down", 522: "Connection Timed Out", 523: "Origin Is Unreachable", 525: "SSL Handshake Failed", 530: "Site Frozen", 599: "Network Connect Timeout Error" }

export class httpCodeError extends Error {
    public readonly code:code
    protected error:{ headers?:error[], body?:error[], params?:error[], query?:error[], cookies?:error[] }

    constructor(code:code, error?:{ headers?:error[], body?:error[], params?:error[], query?:error[], cookies?:error[] }) {
        super("httpCodeError")
        this.name = "httpCodeError"
        this.code = code
        this.error = error || {}
    }

    public JSON(): { status:status, code:number, errors:{ headers?:error[], body?:error[], params?:error[], query?:error[], cookies?:error[] } } { return { code:this.code, status:statusCode[this.code], errors:this.error } }
}