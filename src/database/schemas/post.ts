import { Schema, model, Document} from "mongoose";

interface postInterface extends Document {
    text: string,
    userId: Schema.Types.ObjectId,
    date: Date
}

const postSchema = new Schema({
    text: { type: String, require: true },
    userId: { type: Schema.Types.ObjectId, require: true },
    date: { type: Date, require: true }
});

export default model<postInterface>("Post", postSchema);