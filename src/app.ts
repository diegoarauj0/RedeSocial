import express from "express";
import cors from "cors";
import path from "path";
import cookie from "cookie-parser";
import router from "./router/router";
import connect from "./database/connect";

class App {
    public express: express.Application = express();

    public async start(port:number, cb?:() => void): Promise<void> {
        await this.database()
        await this.middlewares()
        this.express.listen(port, cb)
    }

    private async middlewares (): Promise<void> {
        this.express.use(express.static(path.join(`${__dirname}/../public`)))
        this.express.use(express.json({ strict:true }))
        this.express.use(cookie())
        this.express.use(cors())
        this.express.use(router)
    }

    private async database(): Promise<void> {
        await connect()
    }
};

export default new App();