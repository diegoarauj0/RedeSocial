import { Request } from "express"
import multer from "multer"
import path from "path"
import { httpCodeError } from "../error/httpCodeError"

export default () => {
    const extname = [
        ".png",
        ".jpeg",
        ".gif"
    ]

    const mimetype = [
        "image/gif",
        "image/png",
        "image/jpeg"
    ]

    const maxSizeInBytes = 5242880

    function destination(req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void): void {
        callback(null, `public/images/posts`)
    }

    async function filename(req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void): Promise<void> {
        let fileName = `${req.post?.postId}-${Date.now()}${path.extname(file.originalname)}`

        callback(null, fileName)
    }

    async function fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback): Promise<void> {
        if (extname.indexOf(path.extname(file.originalname)) == -1 || mimetype.indexOf(file.mimetype) == -1) { callback(new httpCodeError(400, { body:[ { type:"extname invalid", path:file.fieldname, value:file.mimetype, params:{ mimetype:file.mimetype } } ] })); return }
        if (file.size > maxSizeInBytes) { callback(new httpCodeError(400, { body:[ { type:"maxsize", path:file.fieldname, value:file.size, params:{ maxsize:maxSizeInBytes } } ] })) }
        
        callback(null, true)
    }

    const storage = multer.diskStorage({
        destination:destination,
        filename:filename
    })

    return multer({ storage: storage, fileFilter:fileFilter })
}