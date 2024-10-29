import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import postModel from "../database/schemas/post"
import validator from "validator";

class PostController {

    public async get(req: Request, res: Response): Promise<void> {
        try {
            let postId = req.params.postId

            if (isValidObjectId(postId) == false) throw ""

            const post = await postModel.findById({ _id: postId })

            if (post == null) throw ""

            res.status(200).json({ post:post })
        } catch (reason) {res.status(404).json({ status:"not found" })}
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        const query = req.query
        let error:{skip:string[], limit:string[], userId:string[]} = {skip:[], limit:[], userId:[]}

        if (query.limit != undefined && typeof(Number(query.limit)) == "number" && Number(query.limit) > 50) { error.limit.push("valor maximo de 'limit' e 50")}
        if (query.skip != undefined && typeof(Number(query.skip)) == "number" && Number(query.skip )> 50) { error.skip.push("valor maximo de 'skip' e 50")}
        if (query.userId != undefined && !isValidObjectId(query.userId)) { error.userId.push("userId invalido")}

        if (error.skip.length > 0 || error.limit.length > 0 || error.userId.length > 0) {
            res.status(402).json({status:"error", error:error})
            return
        }

        const posts = await postModel.find(req.query.userId?{ userId:req.query.userId }:{}).skip(query.skip as number | undefined || 0).limit(query.limit as number | undefined || 50).exec()

        res.status(200).json({ status:"ok", posts:posts})
    }

    public async create(req: Request, res: Response): Promise<void> {
        let error:{ text:string[] } = { text:[] }
        const body = req.body
        
        if (!validator.isLength(body.text || "", { min:1, max:500 })) { error.text.push("texto tem que ter entre 1 ate 500 caracteres") }

        if (error.text.length > 0) {
            res.status(402).json({status:"error", error:error})
            return
        }

        const post = await postModel.create({
            text:body.text,
            date:new Date(),
            userId:req.userId
        })

        res.status(201).json({ status:"created", post:post })
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const post = await postModel.findOneAndDelete({ _id:req.params.postId })
            if (post == null) throw ""
            res.status(200).json({ status:"deleted" })
        } catch (reason) {res.status(404).json({ status: "not found"})}
    }
}

export default new PostController()