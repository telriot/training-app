require("dotenv").config()
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const passport = require("./passport")
const authRouter = require("./routes/auth")
const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const programsRouter = require("./routes/programs")
const app = express()
const cors = require("cors")

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
)

//Connect to the DB
mongoose.connect(
  process.env.MONGO_URI || `mongodb://localhost:27017/reaining-redux-app`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function () {
  console.log("DB Connected")
})
mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)

//Local environment
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
  })
)
//Passport
app.use(passport.initialize())
app.use(passport.session())

//Create Routes

app.use("/api", indexRouter)
app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)
app.use("/api/programs", programsRouter)

// Prepare Production Settings

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

module.exports = app
