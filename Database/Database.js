import mongoose from "mongoose"
import dotenv from "dotenv"
// const uri= "mongodb://localhost:27017/Blogs"
dotenv.config();
const Connection= async()=>{
    try{
        await mongoose.connect(process.env.DB_URI,{useNewUrlParser: true,useUnifiedTopology:true});
        console.log('Database Connected Successfully');
    }
    catch (error){
        console.log("Error while connecting database",error);
    }
}

export default Connection;