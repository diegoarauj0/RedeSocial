import mongoose from "mongoose"

export default async function() {
    await mongoose.connect("mongodb://mongo_db:27017/RedeSocial")
}