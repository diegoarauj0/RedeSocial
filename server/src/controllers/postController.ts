import { Request, Response, Router } from "express"
import { postInterface, postModel } from "../database/model/postModel"
import { userModel } from "../database/model/userModel"
import authMiddleware from "../middleware/authMiddleware"
import asyncHandlerMiddleware from "../middleware/asyncHandlerMiddleware"
import { error, httpCodeError } from "../error/httpCodeError"
import { Feed, Get } from "../../config/postControllerConfig.json"

class postController {
    private router:Router = Router()

    constructor() {
        this.router.delete("/post", authMiddleware ,asyncHandlerMiddleware((this.delete)))
        this.router.get("/post", authMiddleware ,asyncHandlerMiddleware((this.get)))
        this.router.get("/post/feed", authMiddleware ,asyncHandlerMiddleware((this.feed)))
        this.router.post("/post", authMiddleware ,asyncHandlerMiddleware((this.create)))
    }

    get _router(): Router { return this.router }

    public async create(req:Request, res:Response): Promise<void> {
        const body = {
            text: req.body.text === null?undefined:req.body.text,
            parentId: req.body.parentId
        }

        if (body.text === undefined) { throw new httpCodeError(400, { body:[ { path:"text", value:undefined, type:"required", params:{} } ] }) }
        if (body.parentId !== undefined && isNaN(body.parentId)) { throw new httpCodeError(400, { body:[ { path:"parentId", value:undefined, type:"required", params:{} } ] }) }

        const user = await userModel.findOne({ userId:req.user?.userId, deleted:false })
    
        if (user == null) { throw new httpCodeError(401, { headers:[ { path:"Authorization", type:"incorrect", value:req.headers.authorization, params:{} } ] }) }

        const parentPost = await postModel.findOne({ postId:body.parentId, deleted:false })

        if (body.parentId !== undefined && parentPost === null) { throw new httpCodeError(400, { query:[ { path:"parentId", value:undefined, type:"not found", params:{} } ] }) }

        const post = new postModel({
            text:body.text,
            userId:user.userId,
            parentId:body.parentId !== undefined?body.parentId:null
        })

        await post.validate()
        await post.save()

        if (parentPost !== null) {
            parentPost.childrenCount = parentPost.childrenCount + 1
            await parentPost.validate()
            await parentPost.save()
        }

        res.status(200).json({ status:"OK", code:200, data:post.public() })
    }

    public async get(req:Request, res:Response): Promise<void> {
        const query = {
            postId:isNaN(Number(req.query.postId))?undefined:Number(req.query.postId),
            findUser:req.query.findUser === "true",
            findParentPostUser:req.query.findParentPostUser === "true",
            findChildrenUser:req.query.findChildrenUser === "true",
            parentPostLimit:isNaN(Number(req.query.parentPostLimit))?Get.Query.ParentPostLimit.Default:Number(req.query.parentPostLimit),
            childrenLimit:isNaN(Number(req.query.childrenLimit))?Get.Query.ChildrenLimit.Default:Number(req.query.childrenLimit),
            childrenSkip:isNaN(Number(req.query.childrenSkip))?0:Number(req.query.childrenSkip)
        }

        var errorArray:error[] = []

        if (query.childrenLimit > Get.Query.ChildrenLimit.Limit) { errorArray.push({ path:"childrenLimit", type:"maxsize", value:query.childrenLimit, params:{ maxsize:Get.Query.ChildrenLimit.Limit } }) }
        if (query.parentPostLimit > Get.Query.ParentPostLimit.Limit) { errorArray.push({ path:"parentPostLimit", type:"maxsize", value:query.parentPostLimit, params:{ maxsize:Get.Query.ParentPostLimit.Limit } }) }

        if (errorArray.length > 0) { throw new httpCodeError(400, { query:errorArray}) }

        if (query.postId === undefined) { throw new httpCodeError(400, { query:[ { path:"postId", value:undefined, type:"required", params:{} } ] }) }

        const post = await postModel.findOne({ postId:query.postId })

        if (post === null) { throw new httpCodeError(404, { query:[ { path:"postId", value:query.postId, type:"not found", params:{} } ] }) }

        if (query.childrenLimit > 0) { await post.findChildren(query.childrenSkip, query.childrenLimit, async (posts) => {
            if (query.findChildrenUser === true) { for (let post of posts) { await post.findUser() } }
        })}
        
        if (query.findUser === true) { await post.findUser() }
        
        if (query.parentPostLimit !== 0) { await post.findParentPost(query.parentPostLimit, async (parentPost) => {
            if (query.findParentPostUser === true) { await parentPost.findUser() } 
        })}

        res.status(200).json({ status:"OK", code:200, data:post.public(), postId:query.postId, findParentPostUser:query.findParentPostUser, findUser:query.findUser, findChildrenUser:query.findChildrenUser, childrenSkip:query.childrenSkip, childrenLimit:query.childrenLimit, parentPostLimit:query.parentPostLimit })
    }
    
    public async feed(req:Request, res:Response): Promise<void> {
        const query = {
            limit:isNaN(Number(req.query.limit))?Feed.Query.FeedLimit.Default:Number(req.query.limit),
            skip:isNaN(Number(req.query.skip))?0:Number(req.query.skip),
            parentPostLimit:isNaN(Number(req.query.parentPostLimit))?Feed.Query.ParentPostLimit.Default:Number(req.query.parentPostLimit),
            userId:isNaN(Number(req.query.userId))?undefined:Number(req.query.userId),
            findUser:req.query.findUser === "true",
        }

        var errorArray:error[] = []

        if (query.limit > Feed.Query.FeedLimit.Limit) { errorArray.push({ path:"limit", type:"maxsize", value:query.limit, params:{ maxsize:Feed.Query.FeedLimit.Limit } }) }
        if (query.parentPostLimit > Feed.Query.ParentPostLimit.Limit) { errorArray.push({ path:"parentPostLimit", type:"maxsize", value:query.parentPostLimit, params:{ maxsize:Feed.Query.ParentPostLimit.Limit } }) }

        if (errorArray.length > 0) { throw new httpCodeError(400, { query:errorArray}) }

        const posts = await postModel.find(query.userId === undefined?{ deleted:false }:{ userId:query.userId, deleted:false }).limit(query.limit).skip(query.skip).sort({ createdAt:-1 })
        const count = await postModel.countDocuments(query.userId === undefined?{}:{ userId:query.userId })
        const publicPosts = []

        for (let post of posts) {
            if (query.findUser === true) { await post.findUser() }
            if (query.parentPostLimit !== 0) { await post.findParentPost(query.parentPostLimit, async (parentPost) => {
                if (query.findUser === true) {
                    await parentPost.findUser()
                }
            })}

            publicPosts.push(post.public())
        }

        res.status(200).json({ status:"OK", code:200, data:publicPosts, parentPostLimit:query.parentPostLimit, userId:query.userId, findUser:query.findUser, skip:query.skip, limit:query.limit, all:count})
    }

    public async delete(req:Request, res:Response): Promise<void> {
        const query = {
            postId:isNaN(Number(req.query.postId))?undefined:Number(req.query.postId),
        }

        if (query.postId === undefined) { throw new httpCodeError(400, { query:[ { path:"postId", value:undefined, type:"required", params:{} } ] }) }

        const post = await postModel.findOne({ postId:query.postId, deleted:false })

        if (post === null) { throw new httpCodeError(404, { query:[ { path:"postId", value:query.postId, type:"not found", params:{} } ] }) }

        if (post.userId !== req.user?.userId) { throw new httpCodeError(401, { headers:[ { path:"Authorization", type:"incorrect", value:req.headers.authorization, params:{} } ] }) }

        post.deleted = true
        post.text = null
        await post.save()

        res.status(200).json({ status:"OK", code:200 })
    }
}

export default new postController()