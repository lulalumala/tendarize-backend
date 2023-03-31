const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors=require("cors")
const app = express()
const port = process.env.PORT||3001

const userRoutes=require("./routes/user")

dotenv.config()
const options = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  }
app.use(cors(options))
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Our server is running on port ${port} and database connected on port 3001`)
        })
    }
)
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Allo World!")
})

app.use("/api/user", userRoutes)