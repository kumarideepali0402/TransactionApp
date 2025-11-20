const mongoose = require("mongoose");
function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("DB connected.."))
    .catch(()=> console.log("DB connection error"))
}

module.exports = connectDB;