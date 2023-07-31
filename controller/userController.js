import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Token from "../models/token.js";
import { response } from "express";
dotenv.config();
export const signupUser = async (req, res) => {
  try {


    const { name, username, password } = req.body;

    // Check if required fields are present and not empty
    if (!name || !username || !password) {
      return res.status(400).json({ msg: "Please provide name, username, and password" });
    }

    // const salt= await bcrypt.genSalt();
    const hashedPassword=await bcrypt.hash(req.body.password,10)
    // console.log(req.body);
    const user = {username: req.body.username, name: req.body.name, password: hashedPassword};

    const newUser = new User(user);
    await newUser.save();

    res.status(200).json({ msg: `Signup Successful` });
  } catch (error) {
    console.error("Error while saving user:", error);
    return res.status(500).json({ msg: `Error while signing Up` });
  }
};

export const loginUser=async(req,res)=>{
  let user=await User.findOne({username: req.body.username});
  if(!user){
      return res.status(404).json({msg: "username not found"});
  }
  try{
    let match= await bcrypt.compare(req.body.password,user.password);
    if(match){
      const accessToken= jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn: '45m'})
      const refreshToken= jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);

      const newToken=new Token({token: refreshToken})
      await newToken.save();

      return res.status(200).json({accessToken: accessToken,refreshToken: refreshToken,name: user.name,username: user.username})
    }
    else{
      res.status(400).json({msg: "Password doesn't match"})
    }
  }catch(error){
    return res.status(500).json({msg: 'Error while loggin in user' })
  }
}

