import bcrypt from "bcryptjs"
import { Schema, model, Document} from "mongoose";

interface userInterface extends Document {
    email: string,
    name: string,
    password: string,
    comparePassword: (password: string) => Promise<boolean>,
    public: () => { name:string, userId:string }
}

const userSchema = new Schema({
    email: { type: String, require: true, unique: false },
    name: { type: String, require: true, unique: true },
    password: { type: String, require: true, unique: false },
});

userSchema.methods.comparePassword = async function(password?: any): Promise<boolean> {
    return typeof(password) === "string"?await bcrypt.compare(password, this.password):false
}

userSchema.methods.public = function(): { name:string, userId:string } {
    return { name:this.name, userId:this._id }
}
userSchema.pre("save", async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt)
})

export default model<userInterface>("User", userSchema);