const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes")
const app = express()
app.use(cors({
  origin: [
    'https://transactionapp-wheat.vercel.app', // Your Vercel domain
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000'  // Local development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("HelloWorld")
    
    
})

app.use("/api/router", authRoutes )




module.exports = app;