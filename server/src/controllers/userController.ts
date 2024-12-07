import { query, Request, Response, Router } from "express"
import { userModel, userPublicInterface } from "../database/model/userModel"
import authMiddleware from "../middleware/authMiddleware"
import asyncHandlerMiddleware from "../middleware/asyncHandlerMiddleware"
import userMulter from "../middleware/userMulter"
import { error, httpCodeError } from "../error/httpCodeError"
import validator from "validator"
import { Following, Followers } from "../../config/userControllerConfig.json"
import path from "path"
import { postModel } from "../database/model/postModel"

class userController {
    private router:Router = Router()

    constructor() {
        this.router.patch("/user/unfollow", authMiddleware ,asyncHandlerMiddleware(this.unfollow))
        this.router.patch("/user/follow", authMiddleware ,asyncHandlerMiddleware(this.follow))
        this.router.patch("/user", authMiddleware ,asyncHandlerMiddleware(this.edit))
        this.router.delete("/user", authMiddleware ,asyncHandlerMiddleware(this.delete))
        this.router.get("/user", authMiddleware ,asyncHandlerMiddleware(this.get))
        this.router.get("/user/isFollowing", authMiddleware, asyncHandlerMiddleware(this.isFollowing))
        this.router.get("/user/followers", authMiddleware, asyncHandlerMiddleware(this.followers))
        this.router.get("/user/following", authMiddleware, asyncHandlerMiddleware(this.following))
        this.router.post("/user/avatar/upload", authMiddleware, userMulter("avatar").single("avatar"), this.uploadAvatarOrBanner)
        this.router.post("/user/banner/upload", authMiddleware, userMulter("banner").single("banner"), this.uploadAvatarOrBanner)
    }

    get _router(): Router { return this.router }

    public async unfollow(req:Request, res:Response): Promise<void> {
        const query = {
            targetId:validator.isNumeric(String(req.query.targetId))?Number(req.query.targetId):undefined
        }

        if (query.targetId === undefined) { throw new httpCodeError(400, { query:[ { path:"userId", type:"required", params:{} } ] }) }
       
        if (query.targetId === req.user?.userId) { throw new httpCodeError(400, { query:[ { path:"userId", value:query.targetId, type:"can't unfollow yourself", params:{} } ] }) }

        const targetUser = await userModel.findOne({ userId:query.targetId, deleted:false }).select("+followers")

        if (targetUser === null) { throw new httpCodeError(404, { query:[ { path:"userId", value:query.targetId, type:"not found", params:{} } ] }) }
        if (targetUser.followers.indexOf(req.user?.userId as number) === -1) { res.status(400).json({ status:"bad request", code:400, params:{ query:[ { path:"userId", value:query.targetId, type:"you are not following" } ] } }); return }

        const user = await userModel.findOne({ userId:req.user?.userId, deleted:false }).select("+following")

        if (user === null) { throw new httpCodeError(401, { headers:[ { path:"Authorization", type:"incorrect", value:req.headers.authorization, params:{} } ] }) }

        let followers:number[] = []
        let following:number[] = []

        targetUser.followers.forEach((userId) => { if (userId === user.userId) { return } followers.push(userId)  })
        user.following.forEach((userId) => { if (userId === targetUser.userId) { return } following.push(userId) })

        targetUser.followersCount = followers.length
        targetUser.followers = followers
        
        user.followingCount = following.length
        user.following = following

        await user.save()
        await targetUser.save()

        res.status(200).json({ status:"OK", code:200 })
    }

    public async follow(req:Request, res:Response): Promise<void> {
        const query = {
            targetId:validator.isNumeric(String(req.query.targetId))?Number(req.query.targetId):undefined
        }
       
        if (query.targetId === undefined) { throw new httpCodeError(400, { query:[ { path:"userId", type:"required", params:{} } ] }) }
        
        if (query.targetId === req.user?.userId) { throw new httpCodeError(400, { query:[ { path:"userId", type:"can't follow yourself", params:{} } ] }) }

        const targetUser = await userModel.findOne({ userId:query.targetId, deleted:false }).select("+followers")

        if (targetUser === null) { throw new httpCodeError(404, { query:[ { path:"userId", type:"not found", value:query.targetId, params:{} } ] }) }
        if (targetUser.followers.indexOf(req.user?.userId as number) !== -1) { throw new httpCodeError(400, { query:[ { path:"userId", value:query.targetId, type:"are you already following", params:{} } ] }) }

        const user = await userModel.findOne({ userId:req.user?.userId, deleted:false }).select("+following")

        if (user === null) { throw new httpCodeError(401, { headers:[ { path:"Authorization", type:"incorrect", value:req.headers.authorization, params:{} } ] }) }

        targetUser.followers.push(user.userId)
        targetUser.followersCount = targetUser.followers.length

        user.following.push(targetUser.userId)
        user.followingCount = user.following.length

        await user.save()
        await targetUser.save()

        res.status(200).json({ status:"OK", code:200 })
    }

    public async edit(req:Request, res:Response): Promise<void> {
        const body = {
            nickname: req.body.nickname === ""?undefined:req.body.nickname ,
            bio: req.body.bio === ""?undefined:req.body.bio,
            birthday: validator.isNumeric(String(req.body.birthday))?Number(req.body.birthday):undefined
        }

        let user = await userModel.findOne({ userId:req.user?.userId, deleted:false })

        if (user == null) { throw new httpCodeError(401, { headers:[ { path:"Authorization", type:"incorrect", value:req.headers.authorization, params:{} } ] }) }
 
        body.nickname !== undefined?user.nickname = body.nickname:
        body.bio !== undefined?user.bio = body.bio:
        body.birthday !== undefined?user.birthday = body.birthday:

        await user.validate()
        await user.save()

        res.status(200).json({ status:"OK", code:201, data:user.public() })
    }

    public async uploadAvatarOrBanner(req:Request, res:Response): Promise<void> {
        if (req.file != undefined) {
            const user = await userModel.findOne({ userId:req.user?.userId, deleted:false })

            if (user === null) { throw new httpCodeError(401, { headers:[ { path:"Authorization", type:"incorrect", value:req.headers.authorization, params:{} } ] }) }

            req.file.fieldname == "banner"?user.banner = { ID:path.parse(req.file.filename).name, mimetype:req.file.mimetype }:null
            req.file.fieldname == "avatar"?user.avatar = { ID:path.parse(req.file.filename).name, mimetype:req.file.mimetype }:null

            await user.save()
        }

        res.status(200).json({ status:"OK", code:200 })
    }

    public async isFollowing(req:Request, res:Response): Promise<void> {
        const query = {
            userId:validator.isNumeric(String(req.query.userId))?Number(req.query.userId):undefined,
            targetId:validator.isNumeric(String(req.query.targetId))?Number(req.query.targetId):undefined
        }

        var errorArray:error[] = []

        if (query.userId === undefined) { errorArray.push({ path:"userId", type:"required", value:undefined, params:{} }) }
        if (query.targetId === undefined) { errorArray.push({ path:"targetId", type:"required", value:undefined, params:{} }) }

        if (errorArray.length > 0) { throw new httpCodeError(400, { query:errorArray}) }

        const user = await userModel.findOne({ userId:query.targetId, deleted:false }).select("+followers")

        if (user === null) { throw new httpCodeError(404, { query:[ { path:"targetId", value:query.targetId, type:"not found", params:{} } ] }) }

        const isFollowing = user.followers.indexOf(query.userId === undefined?-1:query.userId) !== -1

        res.status(200).json({ status:"OK", code:200, isFollowing:isFollowing })
    }

    public async followers(req:Request, res:Response): Promise<void> {
        const query = {
            username:String(req.query.username).length === 0?undefined:String(req.query.username),
            userId:validator.isNumeric(String(req.query.userId))?Number(req.query.userId):undefined,
            skip:validator.isNumeric(String(req.query.skip))?Number(req.query.skip):0,
            findUser:req.query.findUser === "true",
            limit:validator.isNumeric(String(req.query.limit))?Number(req.query.limit):Followers.Query.FollowersLimit.Default
        }

        if (query.limit > Followers.Query.FollowersLimit.Limit) { throw new httpCodeError(400, { query:[ { path:"limit", value:query.limit, params:{ maxsize:Followers.Query.FollowersLimit.Limit }, type:"maxsize" } ] })  }
        if (query.userId === undefined && query.username === undefined) { throw new httpCodeError(400, { query:[ { path:"userId", value:undefined, type:"required", params:{} }, { path:"username", value:undefined, type:"required", params:{} } ] })}

        const user = await userModel.findOne(query.userId === undefined?{ username:query.username, deleted:false }:{ userId:query.userId, deleted:false }).select("+followers")
        
        if (user === null) { 
            if (query.userId === undefined) {
                throw new httpCodeError(404, { query:[ { path:"username", value:query.username, type:"not found", params:{} } ] })
            }

            throw new httpCodeError(404, { query:[ { path:"userId", value:query.userId, type:"not found", params:{} } ] })
        }

        let followers:userPublicInterface[] | number[] = user.followersLimitAndSkip(query.skip, query.limit)
        const all = user.followers.length
        user.followers = followers

        if (query.findUser === true) {
            followers = await user.findAllFollowersUsers() 
        }

        res.status(200).json({ status:"OK", code:200, data:followers, all:all, skip:query.skip, limit:query.limit })
    }

    public async following(req:Request, res:Response): Promise<void> {
        const query = {
            username:String(req.query.username).length === 0?undefined:String(req.query.username),
            userId:validator.isNumeric(String(req.query.userId))?Number(req.query.userId):undefined,
            skip:validator.isNumeric(String(req.query.skip))?Number(req.query.skip):0,
            findUser:req.query.findUser === "true",
            limit:validator.isNumeric(String(req.query.limit))?Number(req.query.limit):Following.Query.FollowingLimit.Default
        }

        if (query.limit > Following.Query.FollowingLimit.Limit) { throw new httpCodeError(400, { query:[ { path:"limit", value:query.limit, params:{ maxsize:Following.Query.FollowingLimit.Limit }, type:"maxsize" } ] })  }
        if (query.userId === undefined && query.username === undefined) { throw new httpCodeError(400, { query:[ { path:"userId", value:undefined, type:"required", params:{} }, { path:"username", value:undefined, type:"required", params:{} } ] })}

        const user = await userModel.findOne(query.userId === undefined?{ username:query.username, deleted:false }:{ userId:query.userId, deleted:false }).select("+following")
        
        if (user === null) { 
            if (query.userId === undefined) {
                throw new httpCodeError(404, { query:[ { path:"username", value:query.username, type:"not found", params:{} } ] })
            }

            throw new httpCodeError(404, { query:[ { path:"userId", value:query.userId, type:"not found", params:{} } ] })
        }
        let following:userPublicInterface[] | number[] = user.followingLimitAndSkip(query.skip, query.limit)
        const all = user.following.length
        user.following = following

        if (query.findUser === true) {
            following = await user.findAllFollowingUsers() 
        }

        res.status(200).json({ status:"OK", code:200, data:following, all:all, skip:query.skip, limit:query.limit })
    }

    public async get(req:Request, res:Response): Promise<void> {
        const query = {
            username:String(req.query.username).length === 0?undefined:String(req.query.username),
            userId:validator.isNumeric(String(req.query.userId))?Number(req.query.userId):undefined
        }

        if (query.userId === undefined && query.username === undefined) { throw new httpCodeError(400, { query:[ { path:"userId", value:undefined, type:"required", params:{} }, { path:"username", value:undefined, type:"required", params:{} } ] })}

        const user = await userModel.findOne(query.userId === undefined?{ username:query.username, deleted:false }:{ userId:query.userId, deleted:false })
        
        if (user === null) { 
            if (query.userId === undefined) {
                throw new httpCodeError(404, { query:[ { path:"username", value:query.username, type:"not found", params:{} } ] })
            }

            throw new httpCodeError(404, { query:[ { path:"userId", value:query.userId, type:"not found", params:{} } ] })
        }

        res.status(200).json({ status:"OK", code:200, data:user.public() })
    }

    public async delete(req:Request, res:Response): Promise<void> {
        const user = await userModel.findOne({ userId:req.user?.userId, deleted:false }).select("+following").select("+followers")
    
        if (user == null) { throw new httpCodeError(401, { headers:[ { path:"Authorization", type:"incorrect", value:req.headers.authorization, params:{} } ] }) }

        const posts = await postModel.find({ userId:user.userId })

        for (let post of posts) {
            post.text = null
            post.deleted = true
            post.save()
        }

        for (let userId of user.followers) {
            const target = await userModel.findOne({ userId:userId, deleted:false }).select("+following").select("+followers")
            if (target === null) { continue }
            
            target.following = target.following.filter((v) => { return v !== userId })
            await target.save()
        }

        for (let userId of user.following) {
            const target = await userModel.findOne({ userId:userId, deleted:false }).select("+following").select("+followers")
            if (target === null) { continue }

            target.followers = target.followers.filter((v) => { return v !== userId })
            await target.save()
        }

        user.deleted = true
        await user.save()

        res.status(200).json({ status:"OK", code:200 })
    }
}

export default new userController