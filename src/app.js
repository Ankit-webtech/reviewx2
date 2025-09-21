const express = require("express");
const aiRoutes = require("./routes/ai.routes");
//cors for sharing data
const cors = require('cors');
const helmet = require("helmet");

const app = express();
//cors for middle sharing access
app.use(cors({
  origin:[
    "http://localhost:5173",  // dev frontend
    "https://ReviewX.vercel.app" // deployed frontend
  ],
  methods:["GET","POST"],
  credentials:true
}));

//security headers 
app.use(helmet());
// Middleware
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("//App - hello world !");
});

// AI routes
app.use("/ai", aiRoutes);

//global error ko handle karne ke liye 
app.use((err, req ,res ,next) => {
  console.log("server error : " , err.stack);
  res.status(500).json({error: "Something went wrong!"});
});

module.exports = app;










