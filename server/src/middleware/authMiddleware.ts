import asyncHandlerMiddleware from "./asyncHandlerMiddleware"
import { Request, Response, NextFunction } from "express"
import { userModel } from "../database/model/userModel"
import { SECRET } from "../../config/JTWConfig.json"
import { httpCodeError } from "../error/httpCodeError"
import JWT from "jsonwebtoken"

export default asyncHandlerMiddleware(async function(req:Request, res:Response, next:NextFunction): Promise<void> {
    const headers = { authorization:req.headers.authorization }
    let authorization = headers.authorization

    if (authorization == undefined || authorization.indexOf("Bearer") == -1) { throw new httpCodeError(402, { headers:[ { path:"Authorization", type:"required", params:{} } ] }) }

    try {
        authorization = authorization.substring(authorization.indexOf("Bearer") + "Bearer".length + 1)

        let token = JWT.verify(authorization, SECRET) as JWT.JwtPayload

        if (await userModel.findOne({ userId: token.userId, _id:token.id, deleted:false }) == null) { throw "" }

        req.user = {
            id:token.id,
            userId:token.userId,
            username:token.username
        }

        next()
    } catch { throw new httpCodeError(401, { headers:[ { path:"Authorization", type:"incorrect", value:authorization, params:{} } ] }) }
})