import mongoose from "mongoose";
import config from "../../config/mongodb.json";

export default async function() {
    await mongoose.connect(config.URL)
    console.log("connected database")
}