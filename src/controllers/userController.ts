import { Request, Response } from "express";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../database/schemas/user";
import config from '../../config/JTW.json';

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
}

export default new UserController()