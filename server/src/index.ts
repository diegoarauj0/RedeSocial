import app from "./app"
import { PORT } from "../config/expressConfig.json"

app.start(PORT, async () => {
    console.log(`http://localhost:${PORT}`)
})