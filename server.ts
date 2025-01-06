import express, {Express} from "express"
import path from "path"
import router from "./src/routes/index.js"
import morgan from "morgan"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const port: number = parseInt(process.env.PORT as string) || 8001

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, "../public")))
app.use("/", router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
