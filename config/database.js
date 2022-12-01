                                                                                                                                                                                                                                                                                                                                        const mongoose = require("mongoose")
const config = require("config")
const dbURI = config.get("mongooseURI")

const connectDB = async () => {
  try{
    await mongoose.connect(dbURI)
    console.log("connected to database...")
  } catch(err) {
    console.log(err.message)
    console.log("server error....")
    process.exit(1)
  }
}

module.exports = connectDB