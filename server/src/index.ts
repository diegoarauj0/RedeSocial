import { config } from "dotenv"
import app from "./app"

config()

app.start(Number(process.env.PORT || "8080"), async () => {
    console.log(`http://localhost:${Number(process.env.PORT || "8080")}`)
})