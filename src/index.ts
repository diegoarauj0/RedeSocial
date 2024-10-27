import app from "./app";
import config from "../config/express.json"

app.start(config.PORT, () => { console.log(`http://localhost:${config.PORT}`) });