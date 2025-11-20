const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes")
const app = express()
app.use(cors({
    origin : "http://localhost:5173",
    credentials:true
}))
app.use(cookieParser());
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("HelloWorld")
    
    
})

app.use("/api/router", authRoutes )




module.exports = app;