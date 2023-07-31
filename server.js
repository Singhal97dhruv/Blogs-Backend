import express from "express";
import Database from "./Database/Database.js"
import bodyParser from "body-parser";
import Router from "./routes/route.js"
import cors from "cors"
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use('/',Router);
const PORT=process.env.PORT;


Database();
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))