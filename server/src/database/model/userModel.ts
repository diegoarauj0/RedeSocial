import mongoose, { Schema, model, Document } from "mongoose"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import validator from "validator"
import JWTConfig from "../../../config/JTWConfig.json"

export interface userPublicInterface {
    nickname: string;
    username: string;
    createdAt: number;
    bio: string | null;
    birthday: Date | null;
    deleted:boolean
    followingCount: number;
    followersCount: number;
    postCount: number;
    avatar?: { ID?:string, mimetype?:string };
    banner?: { ID?:string, mimetype?:string };
    userId: number;
}

export interface userInterface extends Document {
    public:() => userPublicInterface;
    createJWT:(options?: JWT.SignOptions) => string | JWT.JwtPayload;
    comparePassword:(password: string) => Promise<boolean>;
    followersLimitAndSkip:(skip:number, limit:number) => number[];
    followingLimitAndSkip:(skip:number, limit:number) => number[];
    findAllFollowersUsers:() => Promise<userPublicInterface[]>;
    findAllFollowingUsers:() => Promise<userPublicInterface[]>;
    nickname: string;
    username: string;
    createdAt: number;
    bio?: string | null;
    birthday?: number | null;
    following: Array<number>;
    followers: Array<number>;
    deleted:boolean
    postCount: number;
    avatar?: { ID?:string, mimetype?:string };
    banner?: { ID?:string, mimetype?:string };
    email: string;
    password: string;
    userId: number;
    followersCount: number;
    followingCount: number;
}

const userSchema = new Schema({
    nickname: { 
        type: String,
        require: true,
        minlength: 4,
        maxlength: 32,
        validate: { validator:(nickname: string) => {return validator.matches(nickname, '^[a-zA-Z0-9_]*$')}, message: "object--{params:[ {name:'numbers', value:true}, { name:'letters', value:true }, { name:'underline', value:true } ]}--object", type:"invalidcharacters" },
    },
    username: { 
        type: String,
        require: true,
        minlength: 4,
        maxlength: 16,
        validate: { validator:(username: string) => {return validator.matches(username, '^[a-zA-Z0-9_.-]*$')}, message: "object--{params:[ {name:'numbers', value:true}, { name:'letters', value:true }, { name:'underline', value:true } ]}--object", type:"invalidcharacters" },
        unique: true,
        immutable: true
    },
    deleted: {
        type: Boolean,
        default: false,
        require: true
    },
    createdAt: {
        type: Number,
        immutable: true,
        default: Date.now
    },
    bio: { 
        type: String || null,
        default:null,
        minlength: 5,
        maxlength: 500,
    },
    birthday: { 
        type: Number,
        default:null ,
        validate:{ validator:(birthday: number) => { return new Date(birthday) < new Date() || validator.isDate(new Date(birthday).toString()) }, message:`object--{ params:[{ name:'maxdate', value:"${new Date().getTime()}"}] }--object`, type:'maxdate' }
    },
    following: {
        type: Array<number>,
        default: [],
        require: true,
        select: false
    },
    followers: {
        type: Array<number>,
        default: [],
        require: true,
        select: false
    },
    followersCount: {
        type: Number,
        default: 0,
        require: true
    },
    followingCount: {
        type: Number,
        default: 0,
        require: true
    },
    postCount: {
        type: Number,
        default: 0,
        require: true
    },
    avatar: {
        type: { ID:String || null, mimetype:String || null },
        _id: false,
        default: { ID:null, mimetype:null }
    },
    banner: {
        type: { ID:String || null, mimetype:String || null },
        _id: false,
        default: { ID:null, mimetype:null }
    },
    email: {
        type: String,
        require: true,
        validate: { validator:(email: string) => {return validator.isEmail(email)}, type:"it not email" },
        unique: true,
        select: false,
        immutable: true
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        maxlength: 64,
        validate: { validator:(password: string) => {return validator.isStrongPassword(password, { minLowercase:1, minUppercase:1, minSymbols:1, minNumbers:1 })}, message:"object--{ params:[ {name:'minLowercase', value:1}, { name:'minNumbers', value:1 }, { name:'minUppercase',value:1 }, {name:'minSymbols', value:1} ] }--object", type:"weakpassword" },
        unique: true,
        select: false,
        immutable: true
    },
    userId: {
        type: Number,
        unique: true,
        require: true,
        immutable: true
    },
})

userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    const compare = await bcrypt.compare(password, this.password)
    return compare
}

userSchema.methods.public = function(): userPublicInterface {
    return {
        createdAt:this.createdAt,
        avatar:this.avatar,
        banner:this.banner,
        bio:this.bio || null,
        deleted:this.deleted,
        birthday:this.birthday || null,
        followersCount:this.followersCount,
        followingCount:this.followingCount,
        nickname:this.nickname,
        postCount:this.postCount,
        userId:this.userId,
        username:this.username
    }
}

userSchema.methods.followingLimitAndSkip = function(skip:number, limit:number): number[] {
    const following = []

    for (let index in this.following) {
        if (Number(index) >= skip) {
            if (following.length >= limit) { break }

            following.push(this.following[index])
        }
    }

    return following
}

userSchema.methods.followersLimitAndSkip = function(skip:number, limit:number): number[] {
    const followers = []

    for (let index in this.followers) {
        if (Number(index) >= skip) {
            if (followers.length >= limit) { break }

            followers.push(this.followers[index])
        }
    }

    return followers
}

userSchema.methods.findAllFollowingUsers = async function(): Promise<(userInterface | null)[]> {
    const users:(userInterface | null)[] = []

    for (let userId of this.following) {
        const user = await userModel.findOne({ userId:userId })
        users.push(user)
    }
    
    return users
}

userSchema.methods.findAllFollowersUsers = async function(): Promise<(userInterface | null)[]> {
    const users:(userInterface | null)[] = []

    for (let userId of this.followers) {
        const user = await userModel.findOne({ userId:userId })
        users.push(user)
    }
    
    return users
}

userSchema.methods.createJWT = function(options?: JWT.SignOptions): string | JWT.JwtPayload {
    return JWT.sign({
        userId:this.userId,
        username:this.username,
        id:this.id,
        update:new Date(new Date().setMinutes(new Date().getMinutes() + 30))
    }, JWTConfig.SECRET, options || { expiresIn:"30 days" })
}

userSchema.path('birthday').validate(async function (birthday) {
    if (!this.isNew && !this.isModified('birthday')) return true;

    try {
        if (isNaN(new Date(birthday).getDate())) { return false }

        return true;
    }
    catch (error) {
        return false;
    }
}, "", "incorrect")

userSchema.path('email').validate(async function (email) {
    if (!this.isNew && !this.isModified('email')) return true;

    try {
        const user = mongoose.model("user");

        const count = await user.countDocuments({ email: email });
        if (count > 0) return false;

        return true;
    }
    catch (error) {
        return false;
    }
}, "", "duplicate")

userSchema.path('username').validate(async function (username) {
    if (!this.isNew && !this.isModified('username')) return true;

    try {
        const user = mongoose.model("user")

        const count = await user.countDocuments({ username: username })
        if (count > 0) return false

        return true;
    }
    catch (error) {
        return false;
    }
}, "", "duplicate")

userSchema.pre("save", async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password as string, salt)

    this.password = hash
    next()
})

userSchema.pre("save", async function(next) {
    if (this.nickname !== undefined) return next();
    this.nickname = this.username
    next()
})

userSchema.pre("save", async function(next) {
    if (this.userId !== undefined) return next();
    const user = mongoose.model("user")
    this.userId = await user.countDocuments()
    next()
})

export const userModel = model<userInterface>("user", userSchema)