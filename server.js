const express = require("express")
const connectDB = require("./config/database")
const morgan = require("morgan")
const authRoutes = require("./routes/api/auth")
const profileRoutes = require("./routes/api/profile")
const postsRoutes = require("./routes/api/posts")
const userRoutes = require("./routes/api/users")


const app = express()

app.use(morgan('dev'))
app.use(express.json({extended: false}))

const PORT = process.env.PORT || 5000

app.use("/api/auth", authRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/users", userRoutes)


app.listen(PORT, () => {
  console.log(`api running on port ${PORT}`)
  connectDB()
})