import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SimpleSchema from 'simpl-schema';
import User from '../models/users.js';
import Joi from 'joi';
import mongoose from 'mongoose';
import multer from 'multer';


// Handle Image

const storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null,'uploads/'),
    filename: (req,file,cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null,uniqueName);
    }
})

const handleMultipartData = multer({storage}).single('image');


const profile = async(req,res) =>
{   
    let {id} = req.params;
    try
    {   
        const userExist = await User.findOne({_id:mongoose.Types.ObjectId(id)});
        if(!userExist) res.json({message:"User Doesnot Exist"})

        // update User Profile

        





        res.json({user:userExist});
    }   

    catch(err)
    {
  
       return res.json({error:err});
    }
    
    
}



export  default{
    profile
}