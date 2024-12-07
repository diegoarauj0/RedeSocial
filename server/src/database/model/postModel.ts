import mongoose, { Schema, model, Document} from "mongoose"
import { userInterface, userModel, userPublicInterface } from "./userModel";

export interface postPublicInterface {
    postId: number
    text: string | null
    parentId: number | null
    parentPost:postPublicInterface | null
    children:postPublicInterface[]
    userId: number | null
    images: string[]
    deleted:boolean
    postCount: number | null
    user:userPublicInterface | null
    createdAt: number
    childrenCount: number
}

export interface postInterface extends Document {
    public:() => postPublicInterface
    findUser:() => Promise<boolean>
    findParentPost:(limit:number, callback?:(parentPost:postInterface) => Promise<void>) => Promise<boolean>
    findChildren:(skip:number, limit:number, callback?:(children:postInterface[], ) => Promise<void>) => Promise<boolean>
    postId: number
    text: string | null
    images: string[]
    deleted:boolean
    parentId?: number
    parentPost?:postInterface
    children:postPublicInterface[]
    postCount?:number
    userId: number | null
    user?:userInterface
    createdAt: number
    childrenCount: number
}

const postSchema = new Schema({
    createdAt: {
        type: Number,
        immutable: true,
        default: Date.now
    },
    images: {
        type: Array,
        default: [],
        require: true
    },
    text: { 
        type: String,
        minlength: 5,
        maxlength: 500
    },
    postId: {
        type: Number,
        require: true,
        immutable: true,
        unique: true
    },
    userId: {
        type: Number,
        require: true,
        immutable: true
    },
    deleted: {
        type: Boolean,
        default: false,
        require: true
    },
    parentId: {
        type: Number,
        immutable: true,
        default: null
    },
    childrenCount: {
        type: Number,
        default: 0,
        require: true
    }
})

postSchema.methods.findUser = async function(): Promise<boolean> {
    try {
        if (this.deleted === true) { return false }
        const user = await userModel.findOne({ userId:this.userId })
        if (user === null) { return false }

        this.user = user

        return true
    } catch { return false }
}

postSchema.methods.findChildren = async function(skip:number, limit:number, callback?:(children:postInterface[], ) => Promise<void>): Promise<boolean> {
    try {
        const posts = await postModel.find({ parentId:this.postId }).skip(skip).limit(limit).sort({ createdAt:-1 })

        if (posts.length === 0) { return false }

        if (callback !== undefined) { await callback(posts) }
        if (!Array.isArray(this.children)) { this.children = [] }
        for (let post of posts) { 
            if (post.deleted === false) {
                this.children.push(post)
            }
        }

        return true
    } catch { return false }
}

postSchema.methods.findParentPost = async function(limit:number, callback?:(parentPost:postInterface) => Promise<void>): Promise<boolean> {
    try {
        const post = await postModel.findOne({ postId:this.parentId })
        if (post === null) { return false }

        if (post.parentId !== null && limit > 1) {
            await post.findParentPost(limit - 1, callback)
        }

        if (callback !== undefined) { await callback(post) } 
        this.parentPost = post

        return true
    } catch { return false }
}

postSchema.methods.public = function(): postPublicInterface {
    const children = []

    if (this.children !== undefined) {
        for (let post of this.children) {
            children.push(post.public())
        }
    }

    return {
        images: this.images,
        createdAt:this.createdAt,
        text:this.text,
        deleted:this.deleted,
        postId:this.postId,
        postCount:this.postCount === undefined?null:this.postCount,
        userId:this.deleted === true?null:this.userId,
        user:this.user === undefined?null:this.user.public(),
        parentId:this.parentId,
        parentPost:this.parentPost === undefined?null:this.parentPost.public(),
        children:children,
        childrenCount:this.deleted === false?this.childrenCount:0
    }
}

postSchema.path("userId").validate(async function(userId) {
    try {
        const user = await mongoose.model("user").findOne({ userId:userId })

        if (user == null) return false;
    
        return true
    } catch (reason) { console.log(reason); return false }
},"", "not found")

postSchema.path("parentId").validate(async function(parentId) {
    try {
        if (parentId == undefined || parentId == null) return true;

        const user = await mongoose.model("post").findOne({ postId:parentId })
    
        if (user == null) return false;
    
        return true
    } catch (reason) { console.log(reason); return false }
},"", "not found")

postSchema.pre("save", async function(next) {
    const post = mongoose.model("post")
     
    this.postId = await post.countDocuments()
    next()
})

export const postModel = model<postInterface>("post", postSchema)