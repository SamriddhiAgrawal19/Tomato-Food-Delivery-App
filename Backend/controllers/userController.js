import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import validator from 'validator';

const loginUser = async(req,res)=>{
    const{email , password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            res.json({success : false , message : "User not found"});
        }
        const isMatch  = bcrypt.compare(password, user.password);
        if(!isMatch){
            res.json({success :false , message : "Incorrect Credentials"});
        }
        const token = createToken(user._id);
        res.json({success : true , token});
    }catch(error){
        console.log(error);
        res.json({success : false , message : "Error"});
    }

}
const createToken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET);
}
const registerUser = async(req,res)=>{
    try{
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({ success: false, message: "User already exists" });
        }
        else{
            if(!validator.isEmail(email)){
                return res.json({ success: false, message: "Please enter valid email" });

            }
            if(password.length < 8){
                return res.json({ success: false, message: "Please enter strong password" });

            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new userModel({
                name: name,
                email: email,
                password: hashedPassword
            });
            const user = await newUser.save();
            const token = createToken(user._id);
            res.json({success:true , token});

        }
    }catch(error){
         console.error("Registration error:", error);
        res.json({success:false , message:"Error"});

    }
}

export {loginUser, registerUser};