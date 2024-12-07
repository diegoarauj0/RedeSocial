import mongoose from "mongoose"
import { URL } from "../../config/mongodbConfig.json"

export default async function() {
    await mongoose.connect(URL)
    console.log(`${URL} => connected database`)
}