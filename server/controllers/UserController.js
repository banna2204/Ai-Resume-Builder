import User from "../models/User.js"
import bcrypt from 'bcrypt'
import Resume from "../models/Resume.js";
import jwt from "jsonwebtoken";
import Otp from "../models/otp.js";

const generateToken = (userId) => {
  const token = jwt.sign({userId},process.env.JWT_SACRET,{expiresIn:'7d'});
  return token;
}

export const registerUser = async (req,res)=>{
  try {
    const { name, email, password, otp } = req.body;

    if (!name || !email || !password || !otp) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

  const user = await User.findOne({email});
  if(user) return res.status(400).json({message:"User already exists!!!!!!"});

  const hashedPass = await bcrypt.hash(password,10);

  const newUser = await User.create({
    name,
    email,
    password:hashedPass
  });

  const token = generateToken(newUser._id);
  newUser.password = undefined;

  return res.status(201).json({message:"User created successfully",token,user:newUser});
  

  } catch (error) {
    return res.status(400).json({message:error.message});
  }
}

export const loginUser = async (req,res)=> {
  try {
    const {email, password} = req.body;

  const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:"Credentials wrong!!"});

  const compare = await bcrypt.compare(password,user.password);
    if(!compare) return res.status(400).json({message:"Credentials wrong!!"});

  const token = generateToken(user._id);
  user.password = undefined;

  return res.status(201).json({message:"Login successfully",token,user});
  } catch (error) {
    return res.status(400).json({message:error.message});
  }
}


export const getUserById = async (req,res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if(!user){
    return res.status(404).json({message:"User not found"});
    }

    user.password = undefined;
    return res.status(200).json({user});

  } catch (error) {
    return res.status(400).json({message:error.message});
  }
}

export const getUserResume = async (req,res) => {
  try {
    const userId = req.userId;
    const resumes = await Resume.find({ userId });
    return res.status(200).json({resumes});
  } catch (error) {
    return res.status(400).json({message:error.message});
  }
}