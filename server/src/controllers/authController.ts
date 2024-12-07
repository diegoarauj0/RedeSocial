import { Request, Response, Router } from "express"
import { userInterface, userModel } from "../database/model/userModel"
import asyncHandlerMiddleware from "../middleware/asyncHandlerMiddleware"
import { httpCodeError, error } from "../error/httpCodeError"
import authMiddleware from "../middleware/authMiddleware"

class authController {
    private router:Router = Router()

    constructor() {
        this.router.get("/auth/thisToken", authMiddleware ,asyncHandlerMiddleware(this.thisToken))
        this.router.post("/auth/register", asyncHandlerMiddleware((this.register)))
        this.router.post("/auth/login", asyncHandlerMiddleware((this.login)))
    }

    get _router(): Router { return this.router }

    public async thisToken(req:Request, res:Response): Promise<void> {
        const user = await userModel.findOne({ userId:req.user?.userId }) as userInterface
        res.status(200).json({ status:"OK", code:200, data:user.public() })
    }

    public async register(req:Request, res:Response): Promise<void> {
        const body = {
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
        }
        var errorArray:error[] = []

        if (body.username == undefined) { errorArray.push({ type:"required", path:"username", value:undefined, params:{} }) }
        if (body.password == undefined) { errorArray.push({ type:"required", path:"password", value:undefined, params:{} }) }
        if (body.email == undefined) { errorArray.push({ type:"required", path:"email", value:undefined, params:{} }) }

        if (errorArray.length > 0) { throw new httpCodeError(400, { body:errorArray}) }

        const user = await new userModel({ ...body }).save()

        res.status(201)
        res.json({ status:"created", code:201, data:user.public(), token:user.createJWT() })
    }

    public async login(req:Request, res:Response): Promise<void> {
        const body = {
            password:req.body.password,
            email:req.body.email
        }

        var errorArray:error[] = []

        if (body.password == undefined) { errorArray.push({ type:"required", path:"password", value:undefined, params:{} }) }
        if (body.email == undefined) { errorArray.push({ type:"required", path:"email", value:undefined, params:{} }) }

        if (errorArray.length > 0) { throw new httpCodeError(400, { body:errorArray}) }

        const user = await userModel.findOne({ email:body.email, deleted:false }).select("+password")
        if (user == null) { throw new httpCodeError(404, { body:[ { path:"email", value:body.email, type:"not found", params:{}} ] }) }

        const comparePassword = await user.comparePassword(body.password)
        if (comparePassword == false) { throw new httpCodeError(400, { body:[ { path:"password", value:body.password, type:"incorrect", params:{}} ] }) }

        res.status(200)
        res.json({ status:"OK", code:200, data:user.public(), token:user.createJWT() })
    }
}

export default new authController()