import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SimpleSchema from 'simpl-schema';
import User from '../models/users.js';

const register = async(req,res) =>
{
    try
    {   
        const userExist = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
        if (userExist) {
            return res.status(409).json({
                status: "error",
                message: "A user with this username or email already exists.",
                data: null,
            });
        }


        let user = await User(req.body);
        user.save();
        res.send({
            message:"Successfully Created",
            user:user
        })
    }
    catch(err)
    {
       console.log(err.message)
    }
    
    
    
    
}

export  default{
    register
}