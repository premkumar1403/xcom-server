
const { MongoClient } = require("mongodb");

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose=require('mongoose')
const port = 5000;
const router=require('./routes/router')

const app = express();

app.use(cors({origin:"*"}));

app.use(cors());

app.use(express.json());
const uri = process.env.DB_URL;
mongoose.connect(uri)
  .then(() => {
  console.log("database connected successfully");
  
  })
  .catch((e) => {
  console.log("error connecting databse:",e);
  
})

  
  
app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.send("xcom is working");
});

app.listen(port, () => {
  console.log(`xcom clone is workingon ${port}`);
});
