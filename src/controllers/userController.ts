import { Request, Response, NextFunction } from "express";
import validator from "validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import userModel from "../database/schemas/user";
import config from '../../config/JTW.json';
import { isValidObjectId } from "mongoose";

class UserController {
    public async register(req: Request, res: Response): Promise<void> {
        let error:{ email:string[], password:string[], name:string[] } = { email:[], password:[], name:[] }
        const body = req.body
        
        if (!validator.isEmail(body.email || "")) { error.email.push("esse email não e valido") }
        if (!validator.isStrongPassword(body.password || "", {minLength: 8})) { error.password?.push("senha tem que ter no minimo 8 caracteres")}
        if (!validator.isStrongPassword(body.password || "", {pointsForContainingUpper:1, pointsForContainingLower:1, pointsForContainingNumber:1})) { error.password.push("senha tem que ter no minimo, uma letra maiuscula, uma letra minuscula e um numero")}
        if (!validator.isLength(body.name || "", {min:1, max:15})) { error.name.push("nome tem que ter entre 1 ate 15 caracteres") }
        if (await userModel.findOne({ email:body.email }) !== null) { error.email.push("esse email ja foi usado") }

        if (error.email.length > 0 || error.name.length > 0 || error.password.length > 0) {
            res.status(402).json({status:"error", error:error})
            return
        }

        const User = await userModel.create(body)

        res.cookie("session", jwt.sign({ userId:User._id }, config.secret, {expiresIn:"30 days"}), {
            httpOnly:true,
            maxAge:2592000000
        })
        res.status(201).json({ status:"created" })
    }

    public async login(req: Request, res: Response): Promise<void> {
        let error:{ email:string[], password:string[] } = { email:[], password:[] }
        const body = req.body;

        const User = await userModel.findOne({ email:body.email });

        if (User === null) { error.email.push("esse email não existe")}
        if (User !== null && await User.comparePassword(body.password) == false) { error.password.push("senha incorreta") }
        
        if (error.email.length > 0 || error.password.length > 0) {
            res.status(402).json({status:"error", error:error})
            return
        }

        res.cookie("session", jwt.sign({ userId:User?._id }, config.secret, {expiresIn:"30 days"}), {
            httpOnly:true,
            maxAge:2592000000
        })
        res.status(200).json({ status:"logged in" })
    }

    public async logout(req: Request, res: Response): Promise<void> {
        res.status(200).cookie("session", "").json({ status:"logout" })
    }

    public async middleware(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (req.cookies.session == undefined || req.cookies.session == "") throw ""

            const jwtPayload = jwt.verify(req.cookies.session, config.secret) as JwtPayload
            const user = await userModel.findOne({ _id:jwtPayload.userId })

            if (user == null) throw ""

            req.userId = jwtPayload.userId

            next()
        } catch(reason) {res.status(401).cookie("session","").json({ status: "unauthorized"})}
    }

    public async get(req: Request, res: Response): Promise<void> {
        try {
            let userId = req.params.userId

            if ((userId == undefined || userId == "") ) { userId = req.userId as string }
            if (isValidObjectId(userId) == false) throw ""

            const user = await userModel.findOne({ _id:userId })

            if (user == null) throw ""

            res.status(200).json({ user:user.public() })
        } catch (reason) {res.status(404).json({ status:"not found" })}
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const user = await userModel.findOneAndDelete({ _id:req.userId, userId:req.userId })
            if (user == null) throw ""
            res.status(200).json({ status:"deleted" })
        } catch (reason) {res.status(401).cookie("session", "").json({ status: "unauthorized"})}
    }
}

export default new UserController()