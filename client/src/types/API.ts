export type Status =  "Continue" | "Switching Protocols" | "Processing" | "Early Hints" | "OK" | "Created" | "Accepted" | "Non-Authoritative Information" | "No Content" | "Reset Content" | "Partial Content" | "Multi-Status" | "Already Reported" | "Transformation Applied" | "IM Used" | "Multiple Choices" | "Moved Permanently" | "Found" | "See Other" | "Not Modified" | "Use Proxy" | "Temporary Redirect" | "Permanent Redirect" | "Bad Request" | "Unauthorized" | "Payment Required" | "Forbidden" | "Not Found" | "Method Not Allowed" | "Not Acceptable" | "Proxy Authentication Required" | "Request Timeout" | "Conflict" | "Gone" | "Length Required" | "Precondition Failed" | "Payload Too Large" | "Request-URI Too Long" | "Unsupported Media Type" | "Request Range Not Satisfiable" | "Expectation Failed" | "I’m a teapot" | "Enhance Your Calm" | "Misdirected Request" | "Unprocessable Entity" | "Locked" | "Failed Dependency" | "Too Early" | "Upgrade Required" | "Precondition Required" | "Too Many Requests" | "Request Header Fields Too Large" | "No Response" | "Blocked by Windows Parental Controls" | "Unavailable For Legal Reasons" | "SSL Certificate Error" | "SSL Certificate Required" | "HTTP Request Sent to HTTPS Port" | "Token expired/invalid" | "Client Closed Request" | "Internal Server Error" | "Not Implemented" | "Bad Gateway" | "Service Unavailable" | "Gateway Timeout" | "Variant Also Negotiates" | "Insufficient Storage" | "Loop Detected" | "Bandwidth Limit Exceeded" | "Not Extended" | "Network Authentication Required" | "Web Server Is Down" | "Connection Timed Out" | "Origin Is Unreachable" | "SSL Handshake Failed" | "Site Frozen" | "Network Connect Timeout Error"
export type Code = 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 214 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 420 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 444 | 450 | 451 | 495 | 496 | 497 | 498 | 499 | 500 | 501 | 502 | 503 | 504 | 506 | 507 | 508 | 509 | 510 | 511 | 521 | 522 | 523 | 525 | 530 | 599
export type ErrorType = "required" | "not found" | "incorrect" | "minlength" | "maxlength" | "duplicate" | "weakpassword" | "it not email"
export type ParamsName = "maxdate" | "mimetype" | "maxlength" | "maxsize" | "minlength" | "minLowercase" | "minUppercase" | "minSymbols" | "minNumbers" | "numbers" | "letters" | "underline"

export interface FeedQuery {
    limit?:number
    skip?:number
    parentPostLimit?:number
    userId?:number
    findUser?:boolean
}

export interface FeedData {
    status:Status
    code:Code
    all:number
    posts:PostData[]
}

export interface PublishPostData {
    status:Status
    code:Code
    post:PostData
}

export interface GetPostData {
    status:Status
    code:Code
    post:PostData
}

export interface GetPostQuery {
    postId:number,
    findUser?:boolean
    findParentPostUser?:boolean
    findChildrenUser?:boolean
    parentPostLimit?:number
    childrenLimit?:number
    childrenSkip?:number
}

export interface FollowQuery {
    targetId:number
}

export interface UnfollowQuery {
    targetId:number
}

export interface FollowData {
    status:Status,
    code:Code
}

export interface UnfollowData {
    status:Status,
    code:Code
}

export interface UserEditBody {
    nickname?:string
    bio?:string
    birthday?:string
}

export interface GetIsFollowingQuery {
    userId:number
    targetId:number
}

export interface GetUserData {
    code:Code
    status:Status
    user:UserData
}

export interface EditUserBody {
    nickname?:string
    bio?:string
    birthday?:number
}

export interface EditUserData {
    status:Status
    code:Code
    user:UserData
}

export interface AvatarUploadData {
    status:Status
    code:Code
}

export interface GetIsFollowingData {
    code:Code
    status:Status
    isFollowing:boolean
}

export interface DeletePostQuery {
    postId:number
}

export interface DeletePostData {
    code:Code
    status:Status
}

export interface GetFollowingData {
    code:Code
    all:number
    status:Status
    following:number[] | UserData[] 
}

export interface GetFollowersQuery {
    userId?:number
    username?:string
    skip?:number
    findUser?:boolean
    limit?:number
}

export interface DeleteUserData {
    code:Code
    status:Status
}

export interface GetFollowersData {
    code:Code
    all:number,
    status:Status
    followers:number[] | UserData[] 
}

export interface ThisTokenData {
    code:Code
    status:Status
    user:UserData
}

export interface GetFollowingQuery {
    userId?:number
    username?:string
    skip?:number
    findUser?:boolean
    limit?:number
}

export interface GetUserQuery {
    username?:number
    userId?:number
}

export interface Err {
    path:string
    type:ErrorType
    value?:unknown
    params:{ name:ParamsName, value:unknown }[]
}

export interface Errors {
    headers?:Err[]
    body?:Err[]
    params?:Err[]
    query?:Err[]
}

export interface UserData {
    nickname: string;
    username: string;
    createdAt: number;
    bio: string | null;
    birthday: Date | null;
    followingCount: number;
    followersCount: number;
    postCount: number;
    avatar: { ID:string | null, mimetype:string | null };
    banner: { ID:string | null, mimetype:string | null };
    userId: number;
}

export interface PostData {
    postId: number
    text: string | null
    parentId: number | null
    parentPost:PostData | null
    children:PostData[]
    deleted:boolean
    userId: number | null
    postCount: number | null
    user:UserData | null
    createdAt: number
    childrenCount: number
    edited: boolean
}

export interface Response {
    status:Status
    code:Code
    all?:number
    errors?:Errors
    token?:string
    isFollowing?:boolean
    data?:PostData[] | PostData | UserData[] | UserData
}