import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SimpleSchema from 'simpl-schema';
import User from '../models/users.js';
import Joi from 'joi';
import mongoose from 'mongoose';
import multer from 'multer';
import helper from '../helper/helper.js';



// Handle Image

const storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null,'uploads/'),
    filename: (req,file,cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null,uniqueName);
    }
})

const handleMultipartData = multer({storage}).single('image');

const userProfile = async(req,res) =>
{
    let {_id} = req.params;
    let {fullName,number,password} = req.body;
   
    try
    {   
        let checkUser = await helper.checkUser(_id);
        if(!checkUser) return res.json({message:"User not Found" , user:{} })

        if(req.file)
        {
            console.log("Work on image Update")
        }
        
        password = password? await bcrypt.hash(password,10):checkUser.password

        const userExist = await User.findByIdAndUpdate({_id},{$set : {
            fullName,
            number,
            password
            
        }},{new:true});
        
        if(!userExist) res.json({message:"User Doesnot Exist"})

        // update User Profile
        res.json({message:"Successfully Updated",user:userExist});
    }   

    catch(err)
    {
        console.log(err)
       return res.json({error:err});
    }  
}

const profile = async(req,res) =>
{   
    let {_id} = req.params;
    try
    {   
        

        if(req.file)
        {
            console.log("Work on image Update")
        }

        const userExist = await User.findByIdAndUpdate({_id},{$set : req.body},{new:true});
        
        if(!userExist) res.json({message:"User Doesnot Exist"})

        // update User Profile
        res.json({message:"Successfully Updated",user:userExist});
    }   

    catch(err)
    {
        console.log(err)
       return res.json({error:err});
    }
    
    
}
const all = async(req,res) =>
{
    try
    {
        
        let users = await User.find().lean();
        const results = {};
        const page = req.query.page == undefined || req.query.page == 0 ? 1 :parseInt(req.query.page);
       
        const limit = req.query.limit == 0 || req.query.limit == undefined ? 5 : parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        if (endIndex < users.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        results.totalPages = {
            page: Math.ceil(users.length / limit),
            limit: limit,
            totalRecords: users.length
        };

        results.result = users.slice(startIndex, endIndex);
        return res.status(200).json({
            message: "Users",
            results
        })
    }
    catch(error)
    {
        console.log(error)
        res.json({error:error})
    }
}

const restrictUser = async(req,res) =>
{
    try
    {
        let {_id} = req.params;
        let user = await User.findByIdAndUpdate({_id},{$set:{active:'false'}},{new:true});
        res.json({
            message:"user restricted",
            user
        })
    }
    catch(error)
    {
        res.json({error:error})
    }
}
const enableUser = async(req,res) =>
{
    try
    {
        let {_id} = req.params;
        let user = await User.findByIdAndUpdate({_id},{$set:{active:'true'}},{new:true});
        res.json({
            message:"user restricted",
            user
        })
    }
    catch(error)
    {
        res.json({error:error})
    }
}


export  default{
    profile,
    all,
    restrictUser,
    enableUser,
    userProfile
}